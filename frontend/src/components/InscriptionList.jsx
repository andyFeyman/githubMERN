import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const InscriptionList = ({inscptList})=>{

    const [results, setResults] = useState({});
    const [loadItems,setLoadItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);

    const navigate = useNavigate();

    const imgBaseURL = "https://ordinals.com/content/";

    useEffect(() => {

        const fetchItems = async ()=>{
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const itemsToFetch = inscptList.slice(startIndex, endIndex);
            // Fetch data for all items when the component mounts
            itemsToFetch.forEach(async (inscptItem) => {
                if (inscptItem.content_type !== "image/png"){
                    try {
                        const response = await fetch(`${imgBaseURL}${inscptItem.id}`);
                        if (!response.ok) {
                        throw new Error('Network response was not ok ' + response.statusText);
                        }
                        const data = await response.text();
                        setResults((prevResults) => ({
                        ...prevResults,
                        [inscptItem.id]: data,
                        }));
                    } catch (error) {
                        setResults((prevResults) => ({
                        ...prevResults,
                        [inscptItem.id]: 'An error occurred: ' + error.message,
                        }));
                    }
                }
            });
            setLoadItems(preLoadItems =>[...preLoadItems, ...itemsToFetch]);
        };
        fetchItems();
      }, [inscptList,currentPage]); 

    //handle history push  
    const handleInscptClick = (id)=>{
        navigate(`/detailPage/${id}`)
    };
    
    //前端分页逻辑
    const indexOfLastItem = currentPage * itemsPerPage;
    const currentItems = loadItems.slice(0, indexOfLastItem);

    const handleLoadMore = ()=>{
        setCurrentPage(currentPage+ 1);
        
    }

    // Logging the values for debugging
    // console.log('inscptList.length:', inscptList.length);
    // console.log('loadItems.length:', loadItems.length);

    return (
        <div>
            <div className="flex flex-row flex-wrap justify-around content-start gap-6">
                
                {currentItems.map((inscptItem)=>(
                    <div className='border w-44 h-52' key={inscptItem.id}>
                        <div className='size-3/4'>
                            <a onClick={()=>handleInscptClick(inscptItem.id)} >
                                {
                                    inscptItem.content_type.includes( "image" )
                                    ?
                                    <img
                                        className='w-full h-full'
                                        src={imgBaseURL+inscptItem.id}
                                        alt=""
                                    />
                                    :
                                    <div>
                                        <pre className="overflow-hidden whitespace-nowrap text-ellipsis">{results[inscptItem.id]}</pre>
                                    </div>                               
                                }
                            </a>
                        </div>
                        <h4 className="text-xs">{inscptItem.content_type}</h4>
                        <p className="text-sm"><span># {inscptItem.num} </span></p>  
                    </div>
                ))}  
                </div>
            <div className="flex justify-center mt-4">
                {loadItems.length < inscptList.length && (
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleLoadMore}>
                    Load More
                </button>
                )}
            </div>
        </div>  
    );
}

export default InscriptionList;