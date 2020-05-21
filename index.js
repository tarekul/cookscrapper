const app = require("express")();
const bodyParser = require("body-parser");

const { scrapeRecipe } = require("./scrapper");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET");
  next();
});

app.get("/", async (req, res) => {
  const { web_url } = req.body;
  const result = await scrapeRecipe(web_url);
  if (!result.valid)
    return res.status(500).json({ error: "Failed to retrieve info" });

  const { ingredients, steps } = result;

  res.json(result).catch(err => {
    console.error(err);
    res.status(500).json({ error: err.code });
  });
});

app.listen(process.env.PORT || 5001, () => {
  console.log("listening on port 5003");
});
