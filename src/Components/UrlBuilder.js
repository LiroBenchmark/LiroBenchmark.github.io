class UrlBuilder {
  constructor() {
    this.basePath = '/ro_leaderboard_benchmark';
  }

  buildCanonicalUrl(name) {
    var url = name.replace(/[\W_]+/g, '-');
    url = url.replace(/[-]+/g, '-');
    return url;
  }

  normalizeUrl(url) {
    return url.toLowerCase();
  }

  buildTaskUrl(taskName) {
    var url = this.basePath + '/task/' + this.buildCanonicalUrl(taskName);
    return this.normalizeUrl(url);
  }
}

export default UrlBuilder;
