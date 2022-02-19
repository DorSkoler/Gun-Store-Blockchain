const router = require('express').Router()
let Schemas = require('../models/schemas')
let Weapon = Schemas.Weapons

router.route('/').get((req, res) => {
    Weapon.find()
        .then(weapons => { res.json(weapons) })
        .catch(err => console.log(err))
})

router.route('/getWeaponsForSale').get((req, res) => {
    Weapon.find({weapon_for_sale:true})
        .then(weapons => { res.json(weapons) })
        .catch(err => console.log(err))
})

router.route('/getLastWeapon').get((req, res) => {
    Weapon.find().sort([['_id',-1]]).limit(1)
        .then(weapon => { res.json(weapon) })
        .catch(err => console.log(err))
})


router.route('/byMetamask').post((req, res) => {
    Weapon.find({ account_metamask_address: req.body.account_metamask_address })
        .then(weapons => { res.json(weapons) })
        .catch(err => console.log(err))
})

router.route('/add').post(async (req, res) => {
    const account_metamask_address = req.body.account_metamask_address
    const weapon_name = req.body.weapon_name
    const weapon_type = req.body.weapon_type
    const weapon_price = req.body.weapon_price
    const weapon_url = req.body.weapon_url
    const weapon_training = { shooting_range: 0, basic_training: 0, advanced_training: 0, idle_time:0 }
    const timestamp = req.body.timestamp
    const last_modified = req.body.timestamp

    const newWeapon = new Weapon({ weapon_name, weapon_price, weapon_type, weapon_training, weapon_url, account_metamask_address,timestamp,last_modified })
    newWeapon
        .save().then(() => { res.json(`added ${JSON.stringify(newWeapon)}`) })
        .catch((err) => console.log(err))
})

router.route('/updateAddress').post(async (req, res) => {
    const account_metamask_address = req.body.account_metamask_address

    await Weapon.findByIdAndUpdate({ _id: req.body._id },
        { account_metamask_address: account_metamask_address,weapon_for_sale:false })
    .then(() => { res.json("updated address") })
})

router.route('/updatePrice').post(async (req, res) => {
    const weapon_price = req.body.weapon_price
    const weapon_training = req.body.weapon_training
    const last_modified = req.body.last_modified

    await Weapon.findByIdAndUpdate({ _id: req.body._id },
        { weapon_price: weapon_price, weapon_training:weapon_training, last_modified:last_modified })
        .then(() => { res.json("updated price") })
})

router.route('/idlePrice').post(async (req, res) => {
    const weapon_training = req.body.weapon_training
    const weapon_price = req.body.weapon_price

    await Weapon.findByIdAndUpdate({ _id: req.body._id },
        { weapon_training:weapon_training, weapon_price: weapon_price })
    .then(() => res.json("updated idle"))
})

router.route('/updateForSale').post(async (req, res) => {
    const weapon_for_sale = req.body.weapon_for_sale

    await Weapon.findByIdAndUpdate({ _id: req.body._id },
        { weapon_for_sale: weapon_for_sale})
    .then(() => res.json("updated for sale"))
})

router.route('/delete').post(async (req, res) => {
    await Weapon.deleteOne({ _id: req.body._id})
    res.json("Deleted")
})



module.exports = router