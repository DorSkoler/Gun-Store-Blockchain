const router = require('express').Router()
let Schemas = require('../models/schemas')
let Weapon = Schemas.Weapons

router.route('/').get((req, res) => {
    Weapon.find()
        .then(weapons => { res.json(weapons) })
        .catch(err => console.log(err))
})


router.route('/byMetamask').post((req, res) => {
    Weapon.find({ account_metamask_address: req.body.account_metamask_address })
        .then(weapons => { res.json(weapons);console.log(weapons); })
        .catch(err => console.log(err))
})

router.route('/add').post(async (req, res) => {
    const account_metamask_address = req.body.account_metamask_address
    const weapon_name = req.body.weapon_name
    const weapon_type = req.body.weapon_type
    const weapon_price = req.body.weapon_price
    const weapon_url = req.body.weapon_url
    const weapon_training = { shooting_range: 0, basic_training: 0, advanced_training: 0 }


    const newWeapon = new Weapon({ weapon_name, weapon_price, weapon_type, weapon_training, weapon_url, account_metamask_address })
    newWeapon
        .save().then(() => { res.json(`added ${JSON.stringify(newWeapon)}`) })
        .catch((err) => console.log(err))
})

router.route('/updateAddress').put(async (req, res) => {
    const account_metamask_address = req.body.account_metamask_address
    // need to check if correct this way
    const weapon_training = { shooting_range: 0, basic_training: 0, advanced_training: 0 }

    await Weapon.findByIdAndUpdate({ _id: req.body._id },
        { account_metamask_address: account_metamask_address, weapon_training: weapon_training })
    res.json("updated address")
})

router.route('/updatePrice').put(async (req, res) => {
    const weapon_price = req.body.weapon_price

    await Weapon.findByIdAndUpdate({ _id: req.body._id },
        { weapon_price: weapon_price })
    res.json("updated price")
})

module.exports = router