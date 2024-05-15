import { useState, useCallback } from "react";
import InscriptionSearch from "../components/Search"
import SortInscription from "../components/SortInscription";
import InscriptionList from "../components/InscriptionList";

const InscriptionPage = ()=>{
    
    return (
        
        <div className='m-4'>
                <InscriptionSearch onSearch='this is address of inscription'/>

                <SortInscription />

                <InscriptionList />
        </div>

        
    )
}


export default InscriptionPage;