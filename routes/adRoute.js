const { Router } = require('express');
const { check }  = require('express-validator');
const { createAds, getAds, getAdsHome, getAdsSearch, deleteAd } = require('../controllers/adController');
const { validate } = require('../middlewares/validateFields');
const router = Router();

router.post('/add', [
    check('uid','El uid es obligatorio').not().isEmpty(),
    check('title','El título es obligatorio').not().isEmpty(),
    check('price','El precio es obligatorio').not().isEmpty(),
    check('description','La descripción es obligatoria').not().isEmpty(),
    validate
],createAds);

router.post('/delete',deleteAd);

router.get('/get', getAds);

router.get('/getHomeAds', getAdsHome);

router.get('/getQuery', getAdsSearch);

module.exports = router