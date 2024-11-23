const router = require('express').Router();
const homeController = require('../controllers').home;
const pupukController = require('../controllers/controller-pupuk');
// const bibitController = require('../controllers/controller-bibit');


router.get("/pupuk", pupukController.getPupuk);

router.get("/", (req, res) => {
    res.render("home", { url: "/" });
});


module.exports = router;