class UrlBuilder {
  constructor() {
    this.basePath = "/ro_benchmark_leaderboard";
  }

  static get taskUrlTemplate() {
    return "/task/:id";
  }

  static get datasetUrlTemplate() {
    return "/dataset/:id";
  }

  static get aboutPageUrl() {
    return "/ro_benchmark_leaderboard/about";
  }

  static get termsPageUrl() {
    return "/ro_benchmark_leaderboard/terms";
  }

  normalizeUrl(url) {
    return url.toLowerCase();
  }

  buildTaskUrl(task) {
    const { id } = task;
    var url = this.basePath + "/task/" + id;
    return this.normalizeUrl(url);
  }

  buildDatasetUrl(dataset) {
    const { id } = dataset;
    var url = this.basePath + "/dataset/" + id;
    return this.normalizeUrl(url);
  }
}

export default UrlBuilder;
