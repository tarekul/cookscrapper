const app = require("express")();
const bodyParser = require("body-parser");

const { scrapeRecipe } = require("./scrapper");

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
//parse application/json
app.use(bodyParser.json());

const cors = require("cors");
app.use(cors());

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
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
