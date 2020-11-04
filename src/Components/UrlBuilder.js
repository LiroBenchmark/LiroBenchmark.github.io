class UrlBuilder {
  static get basePath() {
    return "/ro_benchmark_leaderboard";
  }

  static get taskUrlTemplate() {
    return "/task/:id";
  }

  static get datasetUrlTemplate() {
    return "/dataset/:id";
  }

  static get aboutPageUrl() {
    return UrlBuilder.basePath + "/about";
  }

  static get termsPageUrl() {
    return UrlBuilder.basePath + "/terms";
  }

  static get submitPageUrl() {
    return UrlBuilder.basePath + "/submit";
  }

  normalizeUrl(url) {
    return url.toLowerCase();
  }

  getCanonicalUrl(url) {
    return this.normalizeUrl(url).replace(UrlBuilder.basePath, "");
  }

  isHomeUrl(url) {
    const canonicalUrl = this.getCanonicalUrl(url);
    return canonicalUrl === "" || canonicalUrl === "/";
  }

  buildTaskUrl(task) {
    const { id } = task;
    var url = UrlBuilder.basePath + "/task/" + id;
    return this.normalizeUrl(url);
  }

  isTaskUrl(url) {
    return this.getCanonicalUrl(url).startsWith("/task");
  }

  getTaskId(url) {
    return this.getCanonicalUrl(url).replace("/task/", "");
  }

  buildDatasetUrl(dataset) {
    const { id } = dataset;
    var url = UrlBuilder.basePath + "/dataset/" + id;
    return this.normalizeUrl(url);
  }

  isDatasetUrl(url) {
    return this.getCanonicalUrl(url).startsWith("/dataset");
  }

  getDatasetId(url) {
    return this.getCanonicalUrl(url).replace("/dataset/", "");
  }
}

export default UrlBuilder;
