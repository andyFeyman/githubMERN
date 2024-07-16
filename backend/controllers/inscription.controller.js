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
    // 这里必须用{}才能取到值，不然是个对象
    const {insptId} = req.params;
    console.log('type:', typeof insptId, 'insptId is: ',insptId);
    try {
        const commentsList = await Comments.find({
            inscriptionId:insptId.toString(),// inscriptionId是字符类型,toString()
        }).exec();

        console.log(commentsList);
        console.log("the type : "+ typeof commentsList);

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



// del comments


