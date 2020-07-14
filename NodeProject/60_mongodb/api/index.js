//const express = require("express");
//const router = express.Router();
const {
    Router
} = require("express"); // express.Router()
const router = Router();

router.use("/play", require("./play"));
router.use("/introduce", require("./introduce"));
router.use("/user", require("./user"));
router.use("/", require("./user"));

module.exports = router;