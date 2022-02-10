const { timeStamp } = require('console')
const mongoose = require ('mongoose')
const Schema = mongoose.Schema

const weaponsSchema = new Schema ({
    account_metamask_address: {type:String,required:true},
     timestamp:{type:Date,default: Date.now()},
     weapon_name:{type:String,required:true},
     weapon_type:{type:String,required:true},
     weapon_training:{type:Schema.Types.Mixed, required:true},
     weapon_price:{type:Number,required:true},
     weapon_url:{type:String,required:true},

}, { versionKey: false })

const Weapons = mongoose.model('weapons',weaponsSchema,'weapons')
const mySchemas ={
    'Weapons':Weapons
}
module.exports = mySchemas;

