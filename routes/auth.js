//path: api/register

const { Router } = require('express');
const { check }  = require('express-validator');
const { createUser, loginUser, renewToken, getUser, updateUser} = require('../controllers/authController');
const { validate } = require('../middlewares/validateFields');

const router = Router();

router.post('/new', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('email','El correo es obligatorio').not().isEmpty().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    check('confirmPassword','La contraseña es obligatoria').not().isEmpty(),
    validate
],createUser);

router.post('/login', [
    check('email','El correo es obligatorio').not().isEmpty().isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validate
],loginUser);

router.post('/login/renew', [
    check('uid','uid requerido').not().isEmpty(),
    validate
],renewToken);

router.post('/update', [
    check('uid','uid requerido').not().isEmpty(),
],updateUser);


router.get('/getUser', getUser);

module.exports = router