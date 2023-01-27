const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const { Schema } = mongoose;
const floralSchema = new Schema({
  img: { type: String, required: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
});

const Florals = mongoose.model("floral", floralSchema);
const app = express();
const port = 8080;
app.use(cors());
app.use(bodyParser.json());

app.get("/floral", (req, res) => {
  Florals.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      res.status(500).json({ message: err });
    }
  });
});

app.get("/floral/:id", (req, res) => {
  const { id } = req.params;
  Florals.findById(id, (err, docs) => {
    if (!err) {
      if (docs) {
        res.send(docs);
      } else {
        res.status(404).json({ message: "NOT FOUND" });
      }
    } else {
      res.status(500).json({ message: err });
    }
  });
});

app.delete("/floral/:id", (req, res) => {
  const { id } = req.params;
  Florals.findByIdAndDelete(id, (err) => {
    if (!err) {
      res.send({ message: "success delete" });
    } else {
      res.status(404).json({ message: err });
    }
  });
});

app.post("/floral/", (req, res) => {
  let florals = new Florals({
    img: req.body.img,
    name: req.body.name,
    price: req.body.price,
  });
  florals.save();
  res.send({ message: "success" });
});

mongoose.connect(
  "mongodb+srv://aliyevag:aliyevag@cluster0.4mvfi79.mongodb.net/?retryWrites=true&w=majority",
  (err) => {
    if (!err) {
      app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
      });
    }
  }
);
