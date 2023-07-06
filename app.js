const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const punkAPI = new PunkAPIWrapper();

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

hbs.registerPartials(path.join(__dirname, "views", "partials"));

app.get("/", (req, res, next) => res.render("index.hbs"));

app.get("/beers", (req, res) => {
  punkAPI
    .getBeers()
    .then(beersFromApi => {
      res.render("beers", { beers: beersFromApi });
    })
    .catch(error => {
      console.log(error);
      res.render("error");
    });
});

app.get("/random-beer", (req, res, next) => {
  punkAPI
    .getRandom()
    .then(responseFromAPI => {
      const randomBeer = responseFromAPI[0];
      res.render("random-beer", { beer: randomBeer });
    })
    .catch(error => {
      console.log(error);
      res.render("error");
    });
});

app.listen(3000, () => console.log('Running on port 3000'));
