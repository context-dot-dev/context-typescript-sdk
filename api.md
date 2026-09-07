# Parse

Types:

- <code><a href="./src/resources/parse.ts">ParseHandleResponse</a></code>

Methods:

- <code title="post /parse">client.parse.<a href="./src/resources/parse.ts">handle</a>(body, { ...params }) -> ParseHandleResponse</code>

# Web

Types:

- <code><a href="./src/resources/web.ts">WebExtractResponse</a></code>
- <code><a href="./src/resources/web.ts">WebExtractCompetitorsResponse</a></code>
- <code><a href="./src/resources/web.ts">WebExtractFontsResponse</a></code>
- <code><a href="./src/resources/web.ts">WebExtractStyleguideResponse</a></code>
- <code><a href="./src/resources/web.ts">WebScreenshotResponse</a></code>
- <code><a href="./src/resources/web.ts">WebSearchResponse</a></code>
- <code><a href="./src/resources/web.ts">WebWebCrawlMdResponse</a></code>
- <code><a href="./src/resources/web.ts">WebWebScrapeHTMLResponse</a></code>
- <code><a href="./src/resources/web.ts">WebWebScrapeImagesResponse</a></code>
- <code><a href="./src/resources/web.ts">WebWebScrapeMdResponse</a></code>
- <code><a href="./src/resources/web.ts">WebWebScrapeSitemapResponse</a></code>

Methods:

- <code title="post /web/extract">client.web.<a href="./src/resources/web.ts">extract</a>({ ...params }) -> WebExtractResponse</code>
- <code title="get /web/competitors">client.web.<a href="./src/resources/web.ts">extractCompetitors</a>({ ...params }) -> WebExtractCompetitorsResponse</code>
- <code title="get /web/fonts">client.web.<a href="./src/resources/web.ts">extractFonts</a>({ ...params }) -> WebExtractFontsResponse</code>
- <code title="get /web/styleguide">client.web.<a href="./src/resources/web.ts">extractStyleguide</a>({ ...params }) -> WebExtractStyleguideResponse</code>
- <code title="get /web/screenshot">client.web.<a href="./src/resources/web.ts">screenshot</a>({ ...params }) -> WebScreenshotResponse</code>
- <code title="post /web/search">client.web.<a href="./src/resources/web.ts">search</a>({ ...params }) -> WebSearchResponse</code>
- <code title="post /web/crawl">client.web.<a href="./src/resources/web.ts">webCrawlMd</a>({ ...params }) -> WebWebCrawlMdResponse</code>
- <code title="get /web/scrape/html">client.web.<a href="./src/resources/web.ts">webScrapeHTML</a>({ ...params }) -> WebWebScrapeHTMLResponse</code>
- <code title="get /web/scrape/images">client.web.<a href="./src/resources/web.ts">webScrapeImages</a>({ ...params }) -> WebWebScrapeImagesResponse</code>
- <code title="get /web/scrape/markdown">client.web.<a href="./src/resources/web.ts">webScrapeMd</a>({ ...params }) -> WebWebScrapeMdResponse</code>
- <code title="get /web/scrape/sitemap">client.web.<a href="./src/resources/web.ts">webScrapeSitemap</a>({ ...params }) -> WebWebScrapeSitemapResponse</code>

# AI

Types:

- <code><a href="./src/resources/ai.ts">AIExtractProductResponse</a></code>
- <code><a href="./src/resources/ai.ts">AIExtractProductsResponse</a></code>

Methods:

- <code title="post /brand/ai/product">client.ai.<a href="./src/resources/ai.ts">extractProduct</a>({ ...params }) -> AIExtractProductResponse</code>
- <code title="post /brand/ai/products">client.ai.<a href="./src/resources/ai.ts">extractProducts</a>({ ...params }) -> AIExtractProductsResponse</code>

# Brand

Types:

- <code><a href="./src/resources/brand.ts">BrandRetrieveResponse</a></code>
- <code><a href="./src/resources/brand.ts">BrandRetrieveSimplifiedResponse</a></code>
- <code><a href="./src/resources/brand.ts">BrandSearchResponse</a></code>

Methods:

- <code title="post /brand/retrieve">client.brand.<a href="./src/resources/brand.ts">retrieve</a>({ ...params }) -> BrandRetrieveResponse</code>
- <code title="get /brand/retrieve-simplified">client.brand.<a href="./src/resources/brand.ts">retrieveSimplified</a>({ ...params }) -> BrandRetrieveSimplifiedResponse</code>
- <code title="get /brand/search">client.brand.<a href="./src/resources/brand.ts">search</a>({ ...params }) -> BrandSearchResponse</code>

# Industry

Types:

- <code><a href="./src/resources/industry.ts">IndustryRetrieveNaicsResponse</a></code>
- <code><a href="./src/resources/industry.ts">IndustryRetrieveSicResponse</a></code>

Methods:

- <code title="get /web/naics">client.industry.<a href="./src/resources/industry.ts">retrieveNaics</a>({ ...params }) -> IndustryRetrieveNaicsResponse</code>
- <code title="get /web/sic">client.industry.<a href="./src/resources/industry.ts">retrieveSic</a>({ ...params }) -> IndustryRetrieveSicResponse</code>

# Utility

Types:

- <code><a href="./src/resources/utility.ts">UtilityPrefetchResponse</a></code>

Methods:

- <code title="post /utility/prefetch">client.utility.<a href="./src/resources/utility.ts">prefetch</a>({ ...params }) -> UtilityPrefetchResponse</code>

# Monitors

Types:

- <code><a href="./src/resources/monitors.ts">WebhookDelivery</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorCreateResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorRetrieveResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorUpdateResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorListResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorDeleteResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorGetCreditUsageResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorGetLimitsResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorListAccountChangesResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorListAccountRunsResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorListChangesResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorListRunsResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorRetrieveChangeResponse</a></code>
- <code><a href="./src/resources/monitors.ts">MonitorRunResponse</a></code>

Methods:

- <code title="post /monitors">client.monitors.<a href="./src/resources/monitors.ts">create</a>({ ...params }) -> MonitorCreateResponse</code>
- <code title="get /monitors/{monitor_id}">client.monitors.<a href="./src/resources/monitors.ts">retrieve</a>(monitorID) -> MonitorRetrieveResponse</code>
- <code title="patch /monitors/{monitor_id}">client.monitors.<a href="./src/resources/monitors.ts">update</a>(monitorID, { ...params }) -> MonitorUpdateResponse</code>
- <code title="get /monitors">client.monitors.<a href="./src/resources/monitors.ts">list</a>({ ...params }) -> MonitorListResponse</code>
- <code title="delete /monitors/{monitor_id}">client.monitors.<a href="./src/resources/monitors.ts">delete</a>(monitorID) -> MonitorDeleteResponse</code>
- <code title="get /monitors/credit-usage">client.monitors.<a href="./src/resources/monitors.ts">getCreditUsage</a>({ ...params }) -> MonitorGetCreditUsageResponse</code>
- <code title="get /monitors/limits">client.monitors.<a href="./src/resources/monitors.ts">getLimits</a>() -> MonitorGetLimitsResponse</code>
- <code title="get /monitors/changes">client.monitors.<a href="./src/resources/monitors.ts">listAccountChanges</a>({ ...params }) -> MonitorListAccountChangesResponse</code>
- <code title="get /monitors/runs">client.monitors.<a href="./src/resources/monitors.ts">listAccountRuns</a>({ ...params }) -> MonitorListAccountRunsResponse</code>
- <code title="get /monitors/{monitor_id}/changes">client.monitors.<a href="./src/resources/monitors.ts">listChanges</a>(monitorID, { ...params }) -> MonitorListChangesResponse</code>
- <code title="get /monitors/{monitor_id}/runs">client.monitors.<a href="./src/resources/monitors.ts">listRuns</a>(monitorID, { ...params }) -> MonitorListRunsResponse</code>
- <code title="get /monitors/changes/{change_id}">client.monitors.<a href="./src/resources/monitors.ts">retrieveChange</a>(changeID) -> MonitorRetrieveChangeResponse</code>
- <code title="post /monitors/{monitor_id}/run">client.monitors.<a href="./src/resources/monitors.ts">run</a>(monitorID) -> MonitorRunResponse</code>

# Batch

Types:

- <code><a href="./src/resources/batch.ts">PageErrorCount</a></code>
- <code><a href="./src/resources/batch.ts">Failure</a></code>
- <code><a href="./src/resources/batch.ts">CrawlControls</a></code>
- <code><a href="./src/resources/batch.ts">Intake</a></code>
- <code><a href="./src/resources/batch.ts">BatchRetrieveResponse</a></code>
- <code><a href="./src/resources/batch.ts">BatchListResponse</a></code>
- <code><a href="./src/resources/batch.ts">BatchDeleteResponse</a></code>
- <code><a href="./src/resources/batch.ts">BatchCancelResponse</a></code>
- <code><a href="./src/resources/batch.ts">BatchGetResultsResponse</a></code>
- <code><a href="./src/resources/batch.ts">BatchSubmitResponse</a></code>

Methods:

- <code title="get /batch/{batch_id}">client.batch.<a href="./src/resources/batch.ts">retrieve</a>(batchID) -> BatchRetrieveResponse</code>
- <code title="get /batch/list">client.batch.<a href="./src/resources/batch.ts">list</a>({ ...params }) -> BatchListResponse</code>
- <code title="delete /batch/{batch_id}">client.batch.<a href="./src/resources/batch.ts">delete</a>(batchID) -> BatchDeleteResponse</code>
- <code title="post /batch/{batch_id}/cancel">client.batch.<a href="./src/resources/batch.ts">cancel</a>(batchID) -> BatchCancelResponse</code>
- <code title="get /batch/{batch_id}/results">client.batch.<a href="./src/resources/batch.ts">getResults</a>(batchID, { ...params }) -> BatchGetResultsResponse</code>
- <code title="post /batch/submit">client.batch.<a href="./src/resources/batch.ts">submit</a>({ ...params }) -> BatchSubmitResponse</code>

# Webhooks

Types:

- <code><a href="./src/resources/webhooks/webhooks.ts">RetryConfig</a></code>

## Deliveries

Types:

- <code><a href="./src/resources/webhooks/deliveries.ts">Attempt</a></code>
- <code><a href="./src/resources/webhooks/deliveries.ts">Delivery</a></code>
- <code><a href="./src/resources/webhooks/deliveries.ts">DeliveryRetrieveResponse</a></code>
- <code><a href="./src/resources/webhooks/deliveries.ts">DeliveryListResponse</a></code>
- <code><a href="./src/resources/webhooks/deliveries.ts">DeliveryListAttemptsResponse</a></code>
- <code><a href="./src/resources/webhooks/deliveries.ts">DeliveryRetryResponse</a></code>

Methods:

- <code title="get /webhooks/deliveries/{delivery_id}">client.webhooks.deliveries.<a href="./src/resources/webhooks/deliveries.ts">retrieve</a>(deliveryID, { ...params }) -> DeliveryRetrieveResponse</code>
- <code title="get /webhooks/deliveries">client.webhooks.deliveries.<a href="./src/resources/webhooks/deliveries.ts">list</a>({ ...params }) -> DeliveryListResponse</code>
- <code title="get /webhooks/deliveries/{delivery_id}/attempts">client.webhooks.deliveries.<a href="./src/resources/webhooks/deliveries.ts">listAttempts</a>(deliveryID, { ...params }) -> DeliveryListAttemptsResponse</code>
- <code title="post /webhooks/deliveries/{delivery_id}/retry">client.webhooks.deliveries.<a href="./src/resources/webhooks/deliveries.ts">retry</a>(deliveryID, { ...params }) -> DeliveryRetryResponse</code>

# People

Types:

- <code><a href="./src/resources/people.ts">PersonEnrichResponse</a></code>

Methods:

- <code title="post /people/enrich">client.people.<a href="./src/resources/people.ts">enrich</a>({ ...params }) -> PersonEnrichResponse</code>

# News

Types:

- <code><a href="./src/resources/news.ts">NewsSearchResponse</a></code>

Methods:

- <code title="post /news/search">client.news.<a href="./src/resources/news.ts">search</a>({ ...params }) -> NewsSearchResponse</code>
