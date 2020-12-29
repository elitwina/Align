
const express = require("express");
const fetch = require('node-fetch')
let router = express.Router();
let result = [];
let ignored_items = [];


const getData = async () => {
  const response = await fetch('https://picsum.photos/v2/list?page=1&limit=100')
  return response.json();
}

router.use(function (req, res, next) {
  console.log(req.url, "@", Date.now());
  next();
});






router
  .route("/getall")
  .get((req, res) => {
    ignored_items = [];
    (async () => {
      result = await getData()
      res.send(result)
    })()
  })

router
  .route("/get5")
  .get((req, res) => {
    let index;
    let five = [];
    if (ignored_items.length < 100) {
      while (five.length < 5) {
        index = Math.floor(Math.random() * (result.length + 1));
        let item = result[index];
        if (!ignored_items.includes(item) && item) {
          ignored_items.push(item);
          five.push(item);
        }
      }
      res.send(five)
    }
    else {
      console.log("its the end")
      res.send('DONE')
    }
    // console.log("LENGTH OF ignored: ", ignored_items.length)
  })

module.exports = router;
