class UrlBuilder {
  constructor() {
    this.basePath = '/ro_leaderboard_benchmark';
  }

  static get taskUrlTemplate() {
    return '/ro_leaderboard_benchmark/task/:id';
  }

  normalizeUrl(url) {
    return url.toLowerCase();
  }

  buildTaskUrl(task) {
    const { id } = task;
    var url = this.basePath + '/task/' + id;
    return this.normalizeUrl(url);
  }
}

export default UrlBuilder;
