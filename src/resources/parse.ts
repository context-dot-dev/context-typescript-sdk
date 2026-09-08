// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Parse extends APIResource {
  /**
   * Converts raw text, source code, web/data, PDF, Microsoft Office, and image bytes
   * into LLM-usable Markdown.
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
   * Input bytes converted to GitHub Flavored Markdown
   */
  markdown: string;

  /**
   * Indicates success
   */
  success: true;

  /**
   * Detected content type used for parsing
   */
  type:
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
   * Credit usage, included whenever a valid API key is provided.
   */
  key_metadata?: ParseHandleResponse.KeyMetadata;
}

export namespace ParseHandleResponse {
  /**
   * Credit usage, included whenever a valid API key is provided.
   */
  export interface KeyMetadata {
    /**
     * Credits used by this request.
     */
    credits_consumed: number;

    /**
     * Credits remaining for your organization.
     */
    credits_remaining: number;
  }
}

export interface ParseHandleParams {
  /**
   * Query param: Optional client identifier used for usage attribution.
   */
  client?: string;

  /**
   * Query param: Optional file extension hint, such as pdf, docx, xlsx, pptx, html,
   * json, csv, md, py, rtf, jpg, png, or txt.
   */
  extension?:
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
   * Query param: Include image references in Markdown output
   */
  includeImages?: boolean;

  /**
   * Query param: Preserve hyperlinks in Markdown output
   */
  includeLinks?: boolean;

  /**
   * Query param: When true for PDF inputs, OCR the selected pages that have no
   * usable text layer (scans), replacing each recovered page's text with the OCR
   * result while pages with a real text layer keep it. pdf.start/pdf.end limit the
   * inclusive page range. Billed at 1 credit per page OCR actually recovered, on top
   * of the base request cost. When false, no OCR runs.
   */
  ocr?: boolean;

  /**
   * Query param: PDF page-range options as a JSON object, e.g. {"start": 2, "end":
   * 5}.
   */
  pdf?: ParseHandleParams.Pdf;

  /**
   * Query param: Shorten base64-encoded image data in the Markdown output
   */
  shortenBase64Images?: boolean;

  /**
   * Query param: Comma-separated tags for tracking request usage. Up to 20 tags,
   * each 1-50 characters.
   */
  tags?: Array<string>;

  /**
   * Query param: Extract only the main content from HTML-like inputs
   */
  useMainContentOnly?: boolean;

  /**
   * Query param: Set to enabled to bypass shared caches and omit request and
   * response content from retained usage logs. Requires zero data retention to be
   * enabled for your organization (contact support@context.dev), otherwise the
   * request fails with ZDR_NOT_ENABLED. Successful ZDR responses include
   * X-Context-ZDR: true.
   */
  zdr?: 'enabled' | 'disabled';
}

export namespace ParseHandleParams {
  /**
   * PDF page-range options as a JSON object, e.g. {"start": 2, "end": 5}.
   */
  export interface Pdf {
    /**
     * Last 1-based PDF page to parse. When omitted, parsing ends at the last page.
     * Must be greater than or equal to start when both are provided.
     */
    end?: number;

    /**
     * First 1-based PDF page to parse. When omitted, parsing starts at the first page.
     */
    start?: number;
  }
}

export declare namespace Parse {
  export { type ParseHandleResponse as ParseHandleResponse, type ParseHandleParams as ParseHandleParams };
}
