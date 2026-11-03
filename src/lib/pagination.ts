// This file is maintained by hand and is not generated from the OpenAPI spec. See CONTRIBUTING.md.

import { ContextDevError } from '../core/error';
import type { RequestOptions } from '../internal/request-options';

/** Options shared by the auto-pagination helpers. */
export interface AutoPagingOptions {
  /**
   * Maximum number of pages to request, including the first one. Defaults to no limit.
   * When the limit is reached iteration stops normally; it does not throw.
   */
  maxPages?: number | undefined;
}

/** Per-request options for the `...AutoPaging` resource methods. */
export type AutoPagingRequestOptions = RequestOptions & AutoPagingOptions;

/** Reads the items and the next-page cursor out of one page of a cursor-paginated response. */
export interface CursorPageAccessors<TItem, Page> {
  /** Extract the items of the page. */
  items: (page: Page) => readonly TItem[];

  /** Extract the cursor for the next page. `null` or `undefined` ends iteration. */
  nextCursor: (page: Page) => string | null | undefined;
}

/** Reads the items and the "more pages" flag out of one page of a page-numbered response. */
export interface NumberedPageAccessors<TItem, Page> {
  /** Extract the items of the page. */
  items: (page: Page) => readonly TItem[];

  /** Whether another page exists. */
  hasMore: (page: Page) => boolean;
}

/** Options for {@link paginateNumbered}. */
export interface NumberedPaginationOptions extends AutoPagingOptions {
  /** First page number to request. Defaults to 1. */
  startPage?: number | undefined;
}

function validateMaxPages(maxPages: number | undefined): void {
  if (maxPages === undefined) return;
  if (typeof maxPages !== 'number' || !Number.isInteger(maxPages) || maxPages < 1) {
    throw new ContextDevError(`\`maxPages\` must be a positive integer, received ${String(maxPages)}.`);
  }
}

/**
 * Iterate every item of a cursor-paginated list endpoint.
 *
 * Calls `fetchPage` with `undefined` for the first page and with the previous page's cursor
 * afterwards, stopping when the API reports no next cursor.
 *
 * @throws {ContextDevError} when the API returns a cursor that was already used, which would
 * otherwise loop forever.
 */
export async function* paginateCursor<TItem, Page>(
  fetchPage: (cursor: string | undefined) => Promise<Page>,
  { items, nextCursor }: CursorPageAccessors<TItem, Page>,
  options: AutoPagingOptions = {},
): AsyncGenerator<TItem, void, undefined> {
  const { maxPages } = options;
  validateMaxPages(maxPages);

  const seenCursors = new Set<string>();
  let cursor: string | undefined;

  for (let pages = 0; ; pages++) {
    if (maxPages !== undefined && pages >= maxPages) return;

    const page = await fetchPage(cursor);
    yield* items(page);

    const next = nextCursor(page);
    if (next === undefined || next === null || next === '') return;

    if (seenCursors.has(next)) {
      throw new ContextDevError(
        `Pagination cursor ${JSON.stringify(
          next,
        )} was returned twice; refusing to loop forever. Pass \`maxPages\` or page through the results manually if this is expected.`,
      );
    }

    seenCursors.add(next);
    cursor = next;
  }
}

/**
 * Iterate every item of a page-numbered list endpoint.
 *
 * Starts at `startPage` (default 1), asks for the next page while the API reports that more
 * results exist, and stops when a page is empty so a misbehaving server cannot loop forever.
 */
export async function* paginateNumbered<TItem, Page>(
  fetchPage: (page: number) => Promise<Page>,
  { items, hasMore }: NumberedPageAccessors<TItem, Page>,
  options: NumberedPaginationOptions = {},
): AsyncGenerator<TItem, void, undefined> {
  const { maxPages, startPage = 1 } = options;
  validateMaxPages(maxPages);

  if (!Number.isInteger(startPage) || startPage < 1) {
    throw new ContextDevError(`\`startPage\` must be a positive integer, received ${String(startPage)}.`);
  }

  for (let pages = 0; ; pages++) {
    if (maxPages !== undefined && pages >= maxPages) return;

    const pageNumber = startPage + pages;
    const page = await fetchPage(pageNumber);

    const pageItems = items(page);
    yield* pageItems;

    if (!hasMore(page)) return;
    // A page that claims to have more results but carries none would loop forever.
    if (pageItems.length === 0) return;
  }
}
