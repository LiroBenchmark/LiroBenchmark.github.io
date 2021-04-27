class UrlBuilder {
  static get basePath() {
    return '/ro_benchmark_leaderboard';
  }

  static get datasetsPageUrl() {
    return `${UrlBuilder.basePath}/datasets`;
  }

  static get taskUrlTemplate() {
    return '/task/:id';
  }

  static get datasetUrlTemplate() {
    return '/dataset/:id';
  }

  static get aboutPageUrl() {
    return `${UrlBuilder.basePath}/about`;
  }

  static get submitPageUrl() {
    return `${UrlBuilder.basePath}/submit`;
  }

  static get termsAndConditionsPageUrl() {
    return `${UrlBuilder.basePath}/terms-and-conditions`;
  }

  static get privacyStatementPageUrl() {
    return `${UrlBuilder.basePath}/privacy-statement`;
  }

  normalizeUrl(url) {
    return url.toLowerCase();
  }

  getCanonicalUrl(url) {
    return this.normalizeUrl(url).replace(UrlBuilder.basePath, '');
  }

  isHomeUrl(url) {
    const canonicalUrl = this.getCanonicalUrl(url);
    return canonicalUrl === '' || canonicalUrl === '/';
  }

  buildTaskUrl(task) {
    const { id } = task;
    const url = `${UrlBuilder.basePath}/task/${id}`;
    return this.normalizeUrl(url);
  }

  isTaskUrl(url) {
    return this.getCanonicalUrl(url).startsWith('/task');
  }

  getTaskId(url) {
    return this.getCanonicalUrl(url).replace('/task/', '');
  }

  buildDatasetUrl(dataset) {
    const { id } = dataset;
    const url = `${UrlBuilder.basePath}/dataset/${id}`;
    return this.normalizeUrl(url);
  }

  isDatasetUrl(url) {
    const canonicalUrl = this.getCanonicalUrl(url);
    return canonicalUrl.startsWith('/dataset') && !canonicalUrl.startsWith('/datasets');
  }

  getDatasetId(url) {
    return this.getCanonicalUrl(url).replace('/dataset/', '');
  }
}

export default UrlBuilder;
