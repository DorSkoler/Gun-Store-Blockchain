const router = require('express').Router()
let Schemas = require('../models/schemas')
let Account = Schemas.Accounts


router.route('/').get((req,res)=>{
    Account.find()
    .then(accounts => { res.json(accounts) })
    .catch(err => console.log(err))
})

router.route('/add').post(async(req,res) => {
    const account_metamask_address = req.body.account_metamask_address

    const account = await Account.findOne({ account_metamask_address: account_metamask_address }).select("account_metamask_address").lean();
    if (account) { 
        res.json("User exists")
    }
    else {
        const newAccount = new Account({account_metamask_address})
        newAccount
        .save().then(()=> { res.json(`added ${JSON.stringify(newAccount)}`) })
        .catch((err)=>console.log(err))
    }
})

module.exports = router