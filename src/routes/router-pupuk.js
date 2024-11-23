const router = require('express').Router();
const pupukController = require('../controllers').pupuk;

router.get('/', pupukController.getPupuk);
router.get('/add', pupukController.formPupuk);
router.post('/save', pupukController.savePupuk);
router.get('/edit/:id', pupukController.editPupuk);
router.post('/update/:id', pupukController.updatePupuk);
router.get('/delete/:id', pupukController.deletePupuk);

module.exports = router;