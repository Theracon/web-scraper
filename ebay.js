const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const writeStream = fs.createWriteStream("ebay.csv");

// Write CSV headers
writeStream.write(`SN,Title,Price,Shipping,Image,Link\n`);

request(
  "https://www.ebay.com/b/Cell-Phones-Smartphones/9355/bn_320094",
  (error, response, html) => {
    if (!error && response.statusCode == 200) {
      const $ = cheerio.load(html);

      $("li.s-item").each((index, element) => {
        let sn = index + 1;
        let title = $(element).find("h3.s-item__title").text();
        let price = $(element).find("span.s-item__price").text();
        let shipping = $(element).find("span.s-item__shipping").text();
        let image = $(element).find("img.s-item__image-img").attr("src");
        let link = $(element).find("a.s-item__link").attr("href");

        // Write row to CSV
        writeStream.write(
          `${sn}, ${title}, ${price}, ${shipping}, ${image}, ${link}\n`
        );
      });
      console.log("Scraping Done...100%.");
    }
  }
);
