const { response } =  require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
//const { generateJWT } = require('../helpers/jwt');

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
        //const token = await generateJWT(newUser.id);
      
        //res.json({
        //   ok: true,
        //   newUser,
        //   token
        //});
        res.json({
            ok:true,
            msg: 'Correcto'
        })

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

        console.log(userDB)

        const validPassword = bcrypt.compareSync( password, userDB.password );
        
        //Verificando si la contraseña es correcta
        if ( !validPassword ) {
            return res.status(400).json({
                ok:false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar JWT
        //const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            userDB
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Error en login'
        });
    }

}

module.exports = {
    createUser,
    loginUser
}