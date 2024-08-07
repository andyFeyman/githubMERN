import mongoose, { Schema } from "mongoose";

// const { Schema } = mongoose;
const commentSchema = new mongoose.Schema(
    {	
        byWho:{
            type:Schema.Types.ObjectId,ref:'User'
        },
        writerName:{
            type: String,
            require:true,
            maxlength:20,
            default:"Casey",
        },
        inscriptionId:{
            type:String,
            require:true
        },
        createTime:{
            type:Date,
            require: true,
            default:Date.now,
        },
        commentContent:{
            type: String,
            maxlength:416,
            require:true
        },
        reply:[
            {	
                byWho:{
                    type:Schema.Types.ObjectId,ref:'User'
                },
                content:{
                    type: String,
                    maxlength:416,
                },
                replyTime:{
                    type:Date,
                    default:Date.now
                }
            },
        ],
        loveNums:{
            type:Number,
            default:0
        },
        delStatus:{
            type:Boolean,
            default:false
        }   
    },
    { timestamps: true }
);

const Comments = mongoose.model("Comments", commentSchema);

export default Comments;