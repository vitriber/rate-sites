const psi = require('psi');

module.exports = {
    
  async getPageSpeed(url){
    // Get the PageSpeed Insights report
    const result = {
      speedScoreMobile: null,
      speedScoreDesktop: null,
      speedIndexMobile: null,
      speedIndexDesktop: null,
    }
    const { data } = await psi(url);
    result.speedScoreMobile = data.lighthouseResult.categories.performance.score;

    //console.log(data.lighthouseResult.audits['speed-index'].score);

    const data2 = await psi(url, {
      nokey: 'true',
      strategy: 'desktop'
    });

    result.speedScoreDesktop = data2.data.lighthouseResult.categories.performance.score;

    return result;
  }

}