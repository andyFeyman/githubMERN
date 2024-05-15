import { useState, useCallback } from "react";
import InscriptionSearch from "../components/Search"
import SortInscription from "../components/SortInscription";
import InscriptionList from "../components/InscriptionList";
import toast from "react-hot-toast";

const InscriptionPage = () =>{
	const [address, setAddress] = useState("");
	const [loading, setLoading] = useState(false);

    const onSearch = async (e, address) => {
		e.preventDefault();

		setLoading(true);
		setAddress("");

		setLoading(false);

	};
    
    return (

        <div className='m-4'>

                <InscriptionSearch onSearch={onSearch}/>
                <SortInscription />

                <InscriptionList />
        </div>

        
    );
}


export default InscriptionPage;