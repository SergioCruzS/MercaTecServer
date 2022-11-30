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

    const  uid = req.headers['uid'];
    
    //Obtener los anuncios por el UID
    const ads = await Ad.find({"uid": uid});

    res.json({
        ok: true,
        ads
    });
}

const getAdsHome = async (req, res = response ) =>{
    
    //Obtener los anuncios por el UID
    const ads = await Ad.find().sort({$natural:-1}).limit(10);

    res.json({
        ok: true,
        ads
    });
}

const getAdsSearch = async (req, res = response ) =>{

    var query = req.headers['query'];

    //Obtener los anuncios por el UID
    const ads = await Ad.find({'title': {'$regex': query, '$options': 'i'}}).sort({$natural:-1}).limit(10);

    res.json({
        ok: true,
        ads
    });
}

const deleteAd = async (req, res = response ) =>{

    var {uid, title} = req.body;

    //Obtener los anuncios por el UID
    const ads = await Ad.findOneAndDelete({'uid':uid,'title': title});

    res.json({
        ok: true
    });
}

module.exports = {
    createAds,
    getAds,
    getAdsHome,
    getAdsSearch,
    deleteAd
}