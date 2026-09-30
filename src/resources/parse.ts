// File generated from our OpenAPI spec by Stainless. See CONTRIBUTING.md for details.

import { APIResource } from '../core/resource';
import { APIPromise } from '../core/api-promise';
import { type Uploadable } from '../core/uploads';
import { buildHeaders } from '../internal/headers';
import { RequestOptions } from '../internal/request-options';

export class Parse extends APIResource {
  /**
   * Convert uploaded file bytes into Markdown and optional HTML.
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
   * Unique ID of this request, also in `X-Request-Id`. Include it when contacting
   * support.
   */
  request_id: string;

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
   * Query param: Read text from images and scanned PDF pages. PDF page ranges still
   * apply.
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
   * Query param: Comma-separated labels for filtering usage, e.g.
   * `production,team-alpha`.
   */
  tags?: Array<string>;

  /**
   * Query param: Extract only the main content from HTML-like inputs
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
   * PDF page-range options as a JSON object, e.g. {"start": 2, "end": 5}.
   */
  export interface Pdf {
    /**
     * Last PDF page to parse (1-based, inclusive). Defaults to the final page. Must
     * be >= start.
     */
    end?: number;

    /**
     * First 1-based PDF page to parse.
     */
    start?: number;
  }
}

export declare namespace Parse {
  export { type ParseHandleResponse as ParseHandleResponse, type ParseHandleParams as ParseHandleParams };
}
