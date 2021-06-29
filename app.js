const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const LinkModel = require("./models/links");
const shortify = require("./shortify");

const app = express();

const PORT = 4000;

// Middlewares
app.use(express.json());

// Connect to DB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB");
  }
);

app.get("/:shortlink", async (req, res) => {
  try {
    const bigLink = await checkshortLink(req.params.shortlink);
    console.log(bigLink);
    res.send(bigLink);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Enter long url
app.post("/shorten", async (req, res) => {
  const { bigLink } = req.body;
  const shortlink = shortify(bigLink);
  try {
    const dbshortLink = await save2DB({ bigLink, shortlink });
    console.log(dbshortLink);

    res.send(dbshortLink);
  } catch (err) {
    res.status(400).send(err);
  }

  // res.send({
  //   You_entered_Link: link.Link,
  //   shorten_url: short,
  // });
  // console.log(link.Link);
  // res.send(link);
});

function save2DB(val) {
  return new Promise(async (resolve, reject) => {
    try {
      //check if already present
      const alrshortLink = await checkbigLink(val.bigLink);
      if (alrshortLink) resolve(alrshortLink);
      else {
        const linkModel = LinkModel(val);
        const dbRes = await linkModel.save();
        console.log(dbRes);
        resolve(dbRes.shortlink);
      }
    } catch (err) {
      reject(err);
    }
  });
}

function checkbigLink(bigLink) {
  return new Promise(async (resolve, reject) => {
    LinkModel.find({ bigLink: bigLink }, (err, result) => {
      if (err) reject(err);
      if (result) {
        console.log("already saved");
        try {
          return resolve(result[0].shortlink);
        } catch (err) {
          return resolve("");
        }
      }
    });
  });
}
function checkshortLink(shortlink) {
  return new Promise(async (resolve, reject) => {
    LinkModel.find({ shortlink: shortlink }, (err, result) => {
      if (err) reject(err);
      if (result) {
        console.log("already saved " + result);
        try {
          return resolve(result[0].bigLink);
        } catch (err) {
          return resolve("link not found!");
        }
      }
    });
  });
}

app.listen(PORT, () => console.log(`Listen up on http://localhost:${PORT}`));
