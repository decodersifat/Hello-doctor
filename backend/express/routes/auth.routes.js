const express = require("express");
const { signup, signin } = require("../controllers/auth.controller");
const router = express.Router();
const protect  = require("../middleware/auth.middleware")


router.post("/signup", signup);
router.post("/signin", signin);

router.get("/me", protect, (req, res) =>{
    res.status(200).json(
        { user: req.user }
    );
});

module.exports = router;