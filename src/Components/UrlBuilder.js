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

  static get termsPageUrl() {
    return "/ro_benchmark_leaderboard/terms";
  }

  normalizeUrl(url) {
    return url.toLowerCase();
  }

  buildTaskUrl(task) {
    const { id } = task;
    var url = UrlBuilder.basePath + "/task/" + id;
    return this.normalizeUrl(url);
  }

  buildDatasetUrl(dataset) {
    const { id } = dataset;
    var url = UrlBuilder.basePath + "/dataset/" + id;
    return this.normalizeUrl(url);
  }
}

export default UrlBuilder;
