const express = require("express");
const router = express.Router();

router.get("/users", (req, res) => {
    res.json({
        message: "User route working",
        users: []
    });
});

module.exports = router;