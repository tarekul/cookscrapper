const app = require("express")();
const bodyParser = require("body-parser");

const cors = require("cors");
app.options("*", cors());
const { scrapeRecipe } = require("./scrapper");
const { cheerioScrape } = require("./webScrapper");
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

app.use(cors());

app.get("/", async (req, res) => {
  const { web_url } = req.body;
  const result = await cheerioScrape(web_url);
  res.json(result);
  // const result = await scrapeRecipe(web_url);
  // if (!result.valid)
  //   return res.status(500).json({ error: "Failed to retrieve info" });

  // const { ingredients, steps } = result;

  // res.json(result).catch(err => {
  //   console.error(err);
  //   res.status(500).json({ error: err.code });
  // });
});

app.get("/idk", (req, res) => {
  res.json({ idk: "idk" });
});

app.listen(process.env.PORT || 5001, () => {
  console.log("listening on port 5003");
});
