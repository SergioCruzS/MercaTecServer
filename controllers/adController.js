const { response } = require('express');
var Ad = require('../models/ad');


const createAds = async (req, res = response ) =>{
    try {
        const newAd = new Ad(req.body);
        await newAd.save();

        res.json({
            ok: true,
            msg: "Correcto"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Contacte al admin'
        });        
    }  
}

const getAds = async (req, res = response ) =>{

    const uid = req.uid;
    
    //Obtener los anuncios por el UID
    const ads = await Ad.find( uid );

    res.json({
        ok: true,
        ads
    });
}

module.exports = {
    createAds,
    getAds
}