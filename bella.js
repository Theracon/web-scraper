const request = require("request");
const cheerio = require("cheerio");

request("https://www.bellanaija.com", (error, response, html) => {
  if (!error && response.statusCode == 200) {
    const $ = cheerio.load(html);

    console.log("\n");
    console.log("--------------BLOG TITLE---------------");
    const title = $("title").text();
    console.log(title + "\n");

    console.log("---------------ARTICLES----------------");
    $("h2").each((i, el) => {
      const article = $(el);

      console.log(i + 1 + "." + article.text());
    });
    console.log("\n");

    console.log("---------------NAVIGATION--------------");
    $("nav")
      .find("a")
      .each(function (i, el) {
        const name = $(el).text();
        const link = $(el).attr("href");

        console.log(`${i + 1}. ${name} => ${link}`);
      });
    console.log("\n");

    console.log("---------------SITE LINKS--------------");
    $("a").each(function (i, el) {
      const name = $(el).text().replace(/\s+/g, "");
      const link = $(el).attr("href");

      console.log(`${i + 1}. ${name} => ${link}`);
    });
    console.log("\n");

    console.log("---------------IMAGES------------------");
    $("img").each(function (i, el) {
      const src = $(el).attr("src");
      const alt = $(el).attr("alt");
      const width = $(el).attr("width");
      const height = $(el).attr("height");

      console.log(
        `${i + 1}. ${
          alt ? alt : "Undefined image"
        } => ${src} (${width}x${height} px)`
      );
    });
    console.log("\n");
  }
});
