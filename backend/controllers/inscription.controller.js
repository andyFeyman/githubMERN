export const getInscpts = async (req,res) => {
    console.log(req.params);
    const { address } = req.params;

    try {
        const respone = await fetch(`https://turbo.ordinalswallet.com/wallet/${address}`,
        
        )
        const inscptsData = await respone.json()
        res.status(200).json({inscptsListOfAddress:inscptsData.inscriptions})

    } catch (error) {
        res.status(500).json({error:error.message})
    }
}


