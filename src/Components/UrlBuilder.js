class UrlBuilder {
  static get basePath() {
    return '/';
  }

  static get datasetsPageUrl() {
    return `/datasets`;
  }

  static get starterCodePageUrl() {
    return `/starter-code`;
  }

  static get taskUrlTemplate() {
    return '/task/:id';
  }

  static get datasetUrlTemplate() {
    return '/dataset/:id';
  }

  static get aboutPageUrl() {
    return `/about`;
  }

  static get submitPageUrl() {
    return `/submit`;
  }

  static get termsAndConditionsPageUrl() {
    return `/terms-and-conditions`;
  }

  static get privacyStatementPageUrl() {
    return `/privacy-statement`;
  }

  getCanonicalUrl(url) {
    return url.toLowerCase();
  }

  isHomeUrl(url) {
    const canonicalUrl = this.getCanonicalUrl(url);
    return canonicalUrl === '' || canonicalUrl === '/';
  }

  buildTaskUrl(task) {
    const { id } = task;
    const url = `/task/${id}`;
    return this.getCanonicalUrl(url);
  }

  isTaskUrl(url) {
    return this.getCanonicalUrl(url).startsWith('/task');
  }

  getTaskId(url) {
    return this.getCanonicalUrl(url).replace('/task/', '');
  }

  buildDatasetUrl(dataset) {
    const { id } = dataset;
    const url = `/dataset/${id}`;
    return this.getCanonicalUrl(url);
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
