const router = require('express').Router();
const bibitController = require('../controllers').bibit;

router.get('/', bibitController.getBibit);
router.get('/add', bibitController.formBibit);
router.post('/save', bibitController.saveBibit);
router.get('/edit/:id', bibitController.editBibit);
router.post('/update/:id', bibitController.updateBibit);
router.get('/delete/:id', bibitController.deleteBibit);

module.exports = router;