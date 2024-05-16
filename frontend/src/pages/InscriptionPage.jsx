import { useState,useCallback,useEffect } from "react";
import InscriptionSearch from "../components/InsSearch";
import SortInscription from "../components/SortInscription";
import InscriptionList from "../components/InscriptionList";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { response } from "express";

const InscriptionPage = () =>{
    const [inscptList,setInscptList] = useState([]);
	const [loading, setLoading] = useState(false);

    const getInscptList = useCallback(
       
        async(address)=>{
            setLoading(true);
            try {
                const res = await fetch(`/api/inscpt/getInscpts/${address}`);
                const {dataList} = await res.json();
                setInscptList(dataList);
                return {inscptList};
                console.log({inscptList});
            } catch (error) {
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        },[]
    ); 

    useEffect(()=>{getInscptList()},[getInscptList]);

    const onSearch = async (e, address) => {
		e.preventDefault();

		setLoading(true);

        setInscptList([]);

        const {dataList} = await getInscptList(address);
		setInscptList(dataList);
		setLoading(false);

	};
    
    return (

        <div className='m-4'>
            <InscriptionSearch onSearch={onSearch} />
            <SortInscription />
            <div className='flex gap-4 flex-col lg:flex-row justify-center items-start'>
                <InscriptionList inscptList={inscptList}/>
            </div>
               
        </div>
    );
}


export default InscriptionPage;