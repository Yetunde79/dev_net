const express = require("express");
const router = express.Router();

router.get("/test", (res, req) => res.json({ msg: "Profile Works" }));

module.exports = router;
