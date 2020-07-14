// //const express = require("express");
// //const router = express.Router();
// const { Router } = require("express"); // express.Router()
// const router = Router();

// router.use("/music", require("./music"));
// router.use("/movie", require("./movie"));

// module.exports = router;


// //비확실 코드


const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

router.get("/signup", ctrl.showSignupPage); // 회원가입 페이지 보여주기
router.get("/login", ctrl.showLoginPage);
router.get("/index", ctrl.showIndexPage);
router.get("/logout", ctrl.logout);

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login); //로그인

module.exports = router;