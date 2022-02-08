const { timeStamp } = require('console')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const accountSchema = new Schema ({
    account_name: {type:String,required:true},
    account_metamask_address: {type:String,required:true},
})

const weaponsSchema = new Schema ({
     account: {type:Schema.Types.ObjectId,ref:'accounts'},
     date:{type:Date,required:true},
     weapon_name:{type:String,required:true},
     weapon_type:{type:String,required:true},
     weapon_training:{type:Object,required:true},
     weapon_price:{type:Number,required:true},

})

const Accounts = mongoose.model('accounts',accountSchema,'accounts')
const Weapons = mongoose.model('weapons',weaponsSchema,'weapons')
const mySchemas ={
    'Accounts': Accounts,
    'Weapons':Weapons
}
module.exports = mySchemas;

// {"_id":{"$oid":"620242170805ab68707ef097"},"account_name":"Gun Store","account_metamask_address":"0x4aF7c85FC637aFD8E6e17903e165667343136ce7"}
// {"_id":{"$oid":"620241f90805ab68707ef095"},"account_name":"Dor","account_metamask_address":"0xC77eBb0057E5534efeDBb46360D92CbDA2807B68"}
// {"_id":{"$oid":"6202416a0805ab68707ef093"},"account_name":"Shahaf","account_metamask_address":"0x43A0726774FCbece727A78C818fF7be9D89a8ADb"}



//{"_id":{"$oid":"6202665d0805ab68707ef09c"},
// "account":{"$oid":"6202416a0805ab68707ef093"},
// "date":{"$timestamp":{"t":0,"i":0}},
// "weapon_name":"",
// "weapon_price":{"$numberDouble":"0.0001"},
// "weapon_type":"",
// "weapon_training":
// {"shooting_range":{"$numberInt":"0"},
// "basic_training":{"$numberInt":"0"},
// "advanced_training":{"$numberInt":"0"}}
// }