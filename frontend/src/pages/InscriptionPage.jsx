import { useState,useCallback,useEffect } from "react";
import InscriptionSearch from "../components/InsSearch";
import SortInscription from "../components/SortInscription";
import InscriptionList from "../components/InscriptionList";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";

const InscriptionPage = () =>{
    const [inscptList,setInscptList] = useState([]);
	const [loading, setLoading] = useState(false);

    const getInscptList = useCallback(
       
        async(address="bc1p495urvn0ggtp668ezvtjm2ukkvcsjdp0tex86xqm9nxsywmvamaqurmz38")=>{
            setLoading(true);
            try {
                const res = await fetch(`/api/inscpt/getInscpts/${address}`);
                const dataList = await res.json();
               
                // console.log('dataList:',dataList);
                // console.log('typeof dataList:',typeof dataList);
                // console.log(dataList.inscptsData.balance);
                console.log(dataList.inscptsData.inscriptions.length);
                console.log(dataList.inscptsData.inscriptions[0]);
                setInscptList(dataList.inscptsData.inscriptions)
                return {inscptList};

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

        const dataList = await getInscptList(address);
		//setInscptList(dataList.inscptsData.inscriptions)

		setLoading(false);

	};
    
    return (

        <div className='grid m-4'>
            <InscriptionSearch onSearch={onSearch} />
            <SortInscription />
            <div className='flex text-white'>
                {!loading && <InscriptionList inscptList={inscptList}/>}
                {loading && <Spinner />}
            </div>
               
        </div>
    );
}


export default InscriptionPage;

