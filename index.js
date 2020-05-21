const app = require("express")();
const { scrapeRecipe } = require("./scrapper");

app.get("/", async (req, res) => {
  const result = await scrapeRecipe(
    "https://cooking.nytimes.com/recipes/1017936-chicken-tacos-with-chipotle?action=click&module=Global%20Search%20Recipe%20Card&pgType=search&rank=13"
  );
  if (!result.valid)
    return res.status(500).json({ error: "Failed to retrieve info" });

  const { ingredients, steps } = result;

  res.json(result);
});

app.listen(process.env.PORT || 5001, () => {
  console.log("listening on port 5003");
});
