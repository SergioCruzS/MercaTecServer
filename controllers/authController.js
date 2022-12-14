const { response } =  require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response ) =>{

    const { email, password, confirmPassword } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if ( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya está registrado'
            });
        }

        if(password !== confirmPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Las contraseñas no coinciden'
            });
        }


        const newUser = new User( req.body );

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        newUser.password = bcrypt.hashSync( password, salt );

        await newUser.save();

        //Generar JsonWebToken (JWT)
        const token = await generateJWT(newUser.id);
      
        res.json({
           ok: "true",
           newUser,
           token
        });
        //res.json({
        //    ok:true,
        //    msg: 'Correcto'
        //})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });
    }
}

const loginUser = async (req, res = response) =>{

    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });
        //Verificando que el email esté registrado
        if ( !userDB ) {
            return res.status(400).json({
                ok:false,
                msg: 'Usuario no encontrado'
            });
        } 

        const validPassword = bcrypt.compareSync( password, userDB.password );
        
        //Verificando si la contraseña es correcta
        if ( !validPassword ) {
            return res.status(401).json({
                ok:false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar JWT
        const token = await generateJWT( userDB.id );
        const uid = userDB.id;
        const phone = userDB.phone;
        const name = userDB.name;
        res.json({
            ok: "true",
            uid,
            phone,
            name,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en login'
        });
    }

}

const renewToken = async (req, res = response ) =>{

    const {uid} = req.body;

    //Generar un nuevo JWT
    const token = await generateJWT( uid );
    
    //Obtener el usuario por el UID
    //const userDB = await User.findById( uid );

    res.json({
        ok: "True",
        uid,
        token
    });
}

const getUser = async (req, res = response ) =>{

    try {
        const uid = req.headers["uid"];

        const token = "notoken"
        const newUser = await User.findById( uid );
        //Obtener el usuario por el UID

        res.json({
            ok: "True",
            newUser,
            token
        });
        
    } catch (error) {
        res.json({
            ok: "True",
        });
    }
}

const updateUser = async (req, res = response ) =>{

    try {
        const {uid, phone, password} = req.body;

        
        if (password=="") {
            await User.findByIdAndUpdate(uid,{"phone":phone})
        } else {
            const salt = bcrypt.genSaltSync();
            passwordEnc = bcrypt.hashSync( password, salt );
            await User.findByIdAndUpdate(uid,{"phone":phone,"password":passwordEnc})
        }
        
    
        res.json({
            ok: "True"
        });
    } catch (error) {
        res.json({
            ok: "False"
        });
        
    }
}

module.exports = {
    createUser,
    loginUser,
    renewToken,
    getUser,
    updateUser
}