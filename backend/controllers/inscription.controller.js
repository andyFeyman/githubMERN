import User from "../models/user.model.js";
import Comments from "../models/comments.model.js";

// get  inscriptions from  Address
export const getInscpts = async (req,res) => {
    console.log(req.params);
    const { address } = req.params;

    try {
        const respone = await fetch(`https://turbo.ordinalswallet.com/wallet/${address}`, )
        const inscptsData = await respone.json();
        res.status(200).json({inscptsData});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// detail page
export const getDetail =async (req,res) =>{

    const {inscptId} = req.params;

    try {
        const respone = await fetch(`https://turbo.ordinalswallet.com/inscription/${inscptId}`);
        const inscptsDetail = await respone.json();
        //res.status(200).json({inscptsDetail});
        
        res.status(200).json({inscptsDetail});

    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

// add comment
export const addComment =async(req,res)=>{
    try {
        const user = await User.findById(req.user._id.toString());
        const username = user.username;
        const {content, inscriptionId} = req.body;
        //写入MongoDB
        const newComment = new Comments({
            byWho: user,
            writerName: username,
            inscriptionId: inscriptionId,
            commentContent: content
        })

        await newComment.save();

        console.log({content, inscriptionId});
        //console.log("this is userId: "+user);
        res.status(200).json({message:"a new commenteddata saved by: "+username});


    } catch (error) {
        res.status(500).json({error:error.message});
    }

}

// show comments

export const getAllComments = async(req,res)=>{
    // 这里必须用{params}才能取到值，不然是个对象. 这里要跟路由中：定义的名字保持一致。不然就是undefined
    const {inscptId} = req.params;
    try {
        const commentsList = await Comments.find({
            inscriptionId:inscptId.toString(),// 数据库中inscriptionId是字符类型,所以用toString();
        }).exec();

        if(commentsList.length > 0){
            res.status(200).send(commentsList);
        }else{
            res.status(404).json({message:"there are 0 comments"})
        }
        
    } catch (error) {
        res.status(500).json({error:error.message});    
    }


}


// update comments
export const updateComment =async (req,res)=>{
    try {
        const user = await User.findById(req.user._id.toString());

        //console.log(user._id.toString());
        

        const {content, commentIdForUpdate} = req.body;

        //console.log(req.body);

        const comment = await Comments.findById(commentIdForUpdate);

        //console.log(comment.byWho.toString());
    
    
        if(comment.byWho.toString() !== user._id.toString()){
            res.status(400).json({message:"this comment don't belong to you"});
        }else{
            await Comments.updateOne(comment,{commentContent:content});
            res.status(200).json({message:"comment updated!"});
        }
    } catch (error) {
        res.status(500).json({message:"something wrong:"+error});
    }

}


// del comments

export const delComment =async (req,res)=>{

    try {
        // 用{}才能获取到value 不然是个对象
        const { commentId } =req.params;

        console.log(typeof commentId);
        
        const comment = await Comments.findById(commentId);

        console.log(comment.byWho);
        
        const user = await User.findById(req.user._id.toString());
        console.log(user._id);
        
        if(comment.byWho.toString() !== user._id.toString()){
            res.status(400).json({message:"this comment don't belong to you"});
        }else{
            await Comments.deleteOne(comment);
           
            res.status(200).json({message:"comment deleted!"});
        }

    } catch (error) {
        res.status(500).json({error:error.message});  
    }

}


// add reply of comments
export const replyToComment =async (req,res) => {

    try {
        const user = await User.findById(req.user._id.toString());
        console.log(user._id);

        const {content,replyToComentId} = req.body;
        console.log(content,replyToComentId);

        const comment = await Comments.findById(replyToComentId);

        comment.reply.push({
            byWho:user,
            content:content
        });
        
        await comment.save();

        res.status(200).json({message:"reply updated!"});

        
    } catch (error) {
        res.status(500).json({error:error.message}); 
    }

};
