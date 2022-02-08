const router = require('express').Router()
let Schemas = require('../models/schemas')
let Account = Schemas.Accounts


router.route('/').get((req,res)=>{
    Account.find()
    .then(accounts => console.log(accounts))
    .catch(err => console.log(err))
})

router.route('/add').post((req,res)=>{
    const account_name = req.body.account_name
    const account_metamask_address = req.body.account_metamask_address

    const newAccount = new Account({account_name,account_metamask_address})
    newAccount
    .save(() => console.log('added success'))
    .catch(err => console.log(err))
})

module.exports = router