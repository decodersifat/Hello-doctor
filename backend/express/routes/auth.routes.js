const express = require("express");
const { signup, signin, logout } = require("../controllers/auth.controller");
const router = express.Router();
const { protect, upload } = require("../middleware/auth.middleware"); // ✅ Correct import

router.post("/signup",upload.single('profileImg'), signup);
router.post("/signin", signin);
router.post("/logout", logout);


router.get("/me", protect, (req, res) =>{
    res.status(200).json(
        { user: req.user }
    );
});

module.exports = router;