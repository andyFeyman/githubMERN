import { useState, useEffect, useCallback } from "react";
import { useParams } from 'react-router-dom';
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import { timeStampFormatter } from "../utils/functions"
import ReplyDialog from "../components/ReplyModule";
import  CommentsBlock  from "../components/CommentsBlock";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';


const InsDetailPage = () => {

    const {authUser} = useAuthContext();
    // const {username } =authUser;
    // console.log("this is authUser info:"+username);
    
    const [loading, setLoading] = useState(false);

    const { id } = useParams();
    console.log("this is detailPage info:" + id);
    const contentBaseUrl = 'https://ord.ordinalswallet.com/content/'

    const [inscptId, setInscptId] = useState();
    const [inscptNum, setInscptNum] = useState();
    const [contentType, setContentType] = useState();
    const [createdTime,setCreatedTime] = useState();
    const [preContent, setPreContent] = useState();

    const [showDialog, setShowDialog] = useState(false);

    const [commentList,setCommentList] = useState([]);

    const navigate = useNavigate();

    const getInscptDetail = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/inscpt/getDetail/${id}`);
            //注意这里变量需要{}包起来，这样才取到变量名为inscptsDetail下的整个对象。
            //不然就需写成【inscptsDetail.inscptsDetail.id】才能取到值。
            const {inscptsDetail} = await res.json();
            setInscptId(inscptsDetail.id);
            setInscptNum(inscptsDetail.num);
            setContentType(inscptsDetail.content_type);
            setCreatedTime(inscptsDetail.created);
            console.log("render times counting");
     
            if(inscptsDetail.content_type && inscptsDetail.content_type.includes("text")){
                const preRes = await fetch(`https://ordinals.com/content/`+inscptsDetail.id);
                const precontent = await preRes.text();
                setPreContent(precontent);
            }else{
                console.log("this inscription is not text");
            }

        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        getInscptDetail();
    }, [getInscptDetail]);

    const getCommentsList = useCallback(async()=>{
        setLoading(true);
        try {
            const replyRespone = await fetch(`/api/inscpt/getAllComments/${id}`);
            const replyData = await replyRespone.json();
            const reverseReplyData = replyData.reverse();
            setCommentList(reverseReplyData);

        } catch (error) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    },[id])

    useEffect(()=>{
        getCommentsList();
    },[getCommentsList]);

    const handleDialogOpen = ()=>{
        if(authUser){
            setShowDialog(true);
        }else{
            toast.error("this function need Login to use!");
            console.log("this function need Login to use!");
            navigate("/login");
        }
    }

    const handleDialogClose = ()=>{
        setShowDialog(false);
        getCommentsList();
    }

    return (
        <div>
            <main className="container mx-auto mt-8 flex">
                <div className="w-2/3 pr-8">
                    <button className="mb-4 text-gray-400"> Back</button>
                    <div className="bg-gray-800 rounded-lg p-4 mb-4">
                        <div className="w-60 h-60">
                            {
                                typeof contentType === 'string' && contentType.includes("image")
                                ?
                                <img src={"https://ordinals.com/content/"+inscptId} alt="Profile image" className="w-full h-full rounded-lg mb-4" />
                                :
                                <pre className="w-full h-full overflow-auto p-4">{preContent}</pre>
                            }
                            
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400">

                            <button className="text-purple-400" onClick={handleDialogOpen}>Add a reply!</button>  
                            
                            <ReplyDialog isOpen={showDialog} onClose={handleDialogClose} inScptId={inscptId}/>

                            <div className="flex space-x-4">
                                <span>▲ 7</span>
                                <span>💬 127</span>
                            </div>
                            
                        </div>
                    </div>
                    <CommentsBlock commentList={commentList} authUser={authUser} updateFuntion={getCommentsList}/>
 

                </div>
                <div className="w-1/3 fixed top-4 right-4 h-screen p-4">
                    <h2 className="text-2xl font-bold mb-4">INSCRIPTION</h2>
                    <h1 className="text-4xl font-bold mb-4">{"# "+inscptNum}</h1>
                    <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                        <div className="relative group max-w-sm">
                            <h3 className="text-gray-400">ID</h3>
                            <p className="truncate">{inscptId}</p>
                            <div class="tooltip absolute left-0 bottom-full mb-2 hidden w-max p-2 text-sm text-white bg-black rounded-lg opacity-0 visibility-hidden group-hover:block group-hover:opacity-100 group-hover:visible transition-opacity duration-300 ease-in-out">
                                {inscptId} 
                            </div>
                        </div>
                        <div>
                            <h3 className="text-gray-400">FILE TYPE</h3>
                            <p>{contentType}</p>
                        </div>
                        <div>
                            <h3 className="text-gray-400">CREATED</h3>
                            <p>{timeStampFormatter(createdTime)}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default InsDetailPage;
