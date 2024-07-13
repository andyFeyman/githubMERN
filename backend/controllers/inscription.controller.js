import User from "../models/user.model.js";

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

// add comments
export const addComments =async(req,res)=>{
    try {
        const user = await User.findById(req.user._id.toString());
        //const 

    } catch (error) {
        
    }

}


// update comments



// del comments


