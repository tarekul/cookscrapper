const cheerio = require("cheerio");
const request = require("request");

const cheerioScrape = url => {
  return new Promise(resolve => {
    let steps = [];
    request(url, function(error, response, body) {
      const $ = cheerio.load(body);
      steps.push(
        $(".recipe-ingredients")
          .children("li")
          .children("span")
          .html()
      );
      resolve(steps);
    });
  });
};

cheerioScrape(
  "https://cooking.nytimes.com/recipes/1016841-rigatoni-and-cauliflower-al-forno?action=click&module=Collection%20Page%20Recipe%20Card&region=Our%20Most%20Popular%20Weeknight%20Recipes%20of%202015&pgtitle=collection&rank=2"
);

module.exports = { cheerioScrape };
