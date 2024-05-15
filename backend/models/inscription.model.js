import mongoose from "mongoose"

const inscriptionSchema = new mongoose.Schema({
    chainType:{
        type: String,
        require: true,
        default:"btc",
        enum:["btc","eth"]
    },
    insHashId:{
        type:String,
    },
    insOrderNum:{
        type: Number,
    },
    insAddress:{
        type:String,
        require: true,
        minlength:3,
        maxlength:100,
    },
    insContentLink:{
        require:true,
        type:String
    },
    insComments:[
        {
            addTime:{
                type:Date,
                require:true,
                default:Date.now
            },
            content:{
                type:String,
                require:true,
                maxlength:2000,
                default:""
            },
            byWho:{
                type:String,
                require:true
            }
        }
    ]
  

})

const Inscription = mongoose.Model("Inscription",inscriptionSchema);

export default Inscription;