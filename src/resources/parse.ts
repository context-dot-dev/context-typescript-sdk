// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

/**
 * Convert uploaded files, such as PDFs and Office documents, into Markdown.
 */
export class Parse extends APIResource {
  /**
   * Convert a file to Markdown. Handles PDF, Word, Excel, PowerPoint, HTML, XML,
   * CSV, JSON, YAML, source code, subtitles, images, and WARC archives. Send the raw
   * bytes as the request body; set `ocr=true` to read scanned pages and images.
   */
  handle(
    body: Uploadable,
    params: ParseHandleParams,
    options?: RequestOptions,
  ): APIPromise<ParseHandleResponse> {
    const {
      client,
      extension,
      includeImages,
      includeLinks,
      includeNumberedPages,
      ocr,
      pdf,
      shortenBase64Images,
      tags,
      useMainContentOnly,
      zdr,
    } = params;
    return this._client.post('/parse', {
      body: body,
      query: {
        client,
        extension,
        includeImages,
        includeLinks,
        includeNumberedPages,
        ocr,
        pdf,
        shortenBase64Images,
        tags,
        useMainContentOnly,
        zdr,
      },
      ...options,
      headers: buildHeaders([{ 'Content-Type': 'application/octet-stream' }, options?.headers]),
    });
  }
}

export interface ParseHandleResponse {
  /**
   * The file content as GitHub Flavored Markdown.
   */
  markdown: string;

  /**
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

  /**
   * Always `true` for a successful parse.
   */
  success: true;

  /**
   * File type the input was parsed as.
   */
  type:
    | 'warc'
    | 'html'
    | 'xml'
    | 'json'
    | 'jsonl'
    | 'text'
    | 'csv'
    | 'tsv'
    | 'markdown'
    | 'yaml'
    | 'python'
    | 'java'
    | 'javascript'
    | 'php'
    | 'shell'
    | 'ruby'
    | 'typescript'
    | 'rtf'
    | 'srt'
    | 'css'
    | 'scss'
    | 'less'
    | 'stylus'
    | 'sass'
    | 'svg'
    | 'pdf'
    | 'docx'
    | 'doc'
    | 'xlsx'
    | 'xls'
    | 'pptx'
    | 'ppt'
    | 'jpg'
    | 'png'
    | 'gif'
    | 'bmp'
    | 'tiff'
    | 'webp'
    | 'ppm'
    | 'pbm'
    | 'pgm'
    | 'pnm';

  /**
   * Credits this request used and your remaining balance.
   */
  key_metadata?: ParseHandleResponse.KeyMetadata;
}

export namespace ParseHandleResponse {
  /**
   * Credits this request used and your remaining balance.
   */
  export interface KeyMetadata {
    /**
     * Credits charged for this request.
     */
    credits_consumed: number;

    /**
     * Credits your organization has left after this request.
     */
    credits_remaining: number;
  }
}

export interface ParseHandleParams {
  /**
   * Query param: Client identifier for usage attribution.
   */
  client?: string;

  /**
   * Query param: File type hint, such as `pdf`, `docx`, `xlsx`, `pptx`, `html`,
   * `json`, `csv`, `md`, `py`, `rtf`, `jpg`, `png`, `txt`, `warc`, or `warc.gz`. Use
   * it when the `Content-Type` header is missing or generic.
   */
  extension?:
    | 'warc'
    | 'warc.gz'
    | 'txt'
    | 'text'
    | 'md'
    | 'markdown'
    | 'html'
    | 'htm'
    | 'xhtml'
    | 'xml'
    | 'rss'
    | 'atom'
    | 'csv'
    | 'tsv'
    | 'yaml'
    | 'yml'
    | 'py'
    | 'java'
    | 'js'
    | 'jsx'
    | 'mjs'
    | 'cjs'
    | 'json'
    | 'jsonl'
    | 'ndjson'
    | 'php'
    | 'sh'
    | 'bash'
    | 'zsh'
    | 'fish'
    | 'rb'
    | 'ts'
    | 'tsx'
    | 'rtf'
    | 'srt'
    | 'css'
    | 'scss'
    | 'less'
    | 'styl'
    | 'sass'
    | 'svg'
    | 'pdf'
    | 'docx'
    | 'doc'
    | 'xlsx'
    | 'xlsm'
    | 'xlsb'
    | 'xltx'
    | 'xltm'
    | 'xls'
    | 'pptx'
    | 'pptm'
    | 'ppsx'
    | 'ppsm'
    | 'potx'
    | 'potm'
    | 'ppt'
    | 'pps'
    | 'pot'
    | 'jpg'
    | 'jpeg'
    | 'jpe'
    | 'png'
    | 'gif'
    | 'bmp'
    | 'tiff'
    | 'tif'
    | 'webp'
    | 'ppm'
    | 'pbm'
    | 'pgm'
    | 'pnm';

  /**
   * Query param: Include image references in the Markdown.
   */
  includeImages?: boolean;

  /**
   * Query param: Keep link URLs in the Markdown.
   */
  includeLinks?: boolean;

  /**
   * Query param: Start each PDF page in the Markdown with a `<!-- page N -->` line,
   * where `N` is the original 1-based page number.
   */
  includeNumberedPages?: boolean;

  /**
   * Query param: Read text from images and scanned PDF pages with OCR, within the
   * `pdf` page range. Adds 1 credit per page read.
   */
  ocr?: boolean;

  /**
   * Query param: PDF page range as a JSON object, such as `{"start": 2, "end": 5}`.
   */
  pdf?: ParseHandleParams.Pdf;

  /**
   * Query param: Shorten inline base64 image data.
   */
  shortenBase64Images?: boolean;

  /**
   * Query param: Comma-separated labels for this request, such as
   * `production,team-alpha`. Filter usage and request logs by them.
   */
  tags?: Array<string>;

  /**
   * Query param: Keep only the main content, without navigation, headers, footers,
   * or sidebars. Applies to HTML-like inputs.
   */
  useMainContentOnly?: boolean;

  /**
   * Query param: `enabled` turns on zero data retention. Returns 403
   * `ZDR_NOT_ENABLED` unless your organization has ZDR.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace ParseHandleParams {
  /**
   * PDF page range as a JSON object, such as `{"start": 2, "end": 5}`.
   */
  export interface Pdf {
    /**
     * Last page to parse. Defaults to the last page. Must be at least `start`.
     */
    end?: number;

    /**
     * First page to parse, starting at 1.
     */
    start?: number;
  }
}

export declare namespace Parse {
  export { type ParseHandleResponse as ParseHandleResponse, type ParseHandleParams as ParseHandleParams };
}
