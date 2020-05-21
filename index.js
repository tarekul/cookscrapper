const app = require("express")();
const { scrapeRecipe } = require("./scrapper");

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
