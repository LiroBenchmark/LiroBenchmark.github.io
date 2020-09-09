class UrlBuilder {
  constructor() {
    this.basePath = '/ro_leaderboard_benchmark';
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
