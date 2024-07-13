import mongoose from "mongoose"

const { Schema } = mongoose;

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
        {type:Schema.Types.ObjectId,ref:'Comments'}
    ]
  

})

const Inscription = mongoose.Model("Inscription",inscriptionSchema);

export default Inscription;