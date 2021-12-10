var express = require("express");
var router = express.Router();
const checkAuth = require("../middleware/check-auth");

router.use(checkAuth);
// this checks for user authentication, comment/disable it for now if you don't want to create a new user
router.get("/:anything", async function (req, res) {
  const endpoint = req.url;
  // to get the whole url that made a call to this route or endpoint
  console.log(endpoint);
  const params = req.params.anything;
  console.log(params);
  // to only get the params of the url that made a call to this route
  const query = req.query;
  // to get query params of the url that made a call to this route
  // for eg: start date and end date in the form of query (?startDate="xoxo"&&endDate="lolo")
  console.log(query);
  res.send("Not hello world!");
  // for sending back response
});
router.post("/:anything", async function (req, res) {
  const endpoint = req.url;
  console.log(endpoint);
  // to get the whole url that made a call to this route or endpoint
  const params = req.params.anything;
  console.log(params);
  // to only get the params of the url that made a call to this route
  const userInputs = req.body;
  //users inputs sent in the post request
  res.send("Not hello world!");
  // for sending back response
});

module.exports = router;
