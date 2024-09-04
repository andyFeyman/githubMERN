
import {useState} from "react";
import { daysSinceDate } from "../utils/functions";
import UpdateDialog from "./UpdateModule";
import ReplyToComent from "./ReplyToCommentmodule";
import toast from "react-hot-toast";
import { useNavigate } from 'react-router-dom';


const CommentsBlock = ({ commentList,authUser,updateFuntion}) => {

    const navigate = useNavigate();

    const [showUpdateDialog, setUpdateDialog] = useState(false);
    const [showReplyDialog, setShowReplyDialog] =useState(false);
    const [commentID,setComentID]  = useState();
    const [updateText,setUpdateText] = useState();
  

    if (!Array.isArray(commentList)) {
      return <div>Loading comments...</div>; // 或者其他适当的加载状态显示
    }

    const handleCommentId =(itemID)=>{
      setComentID(itemID);
    }

    const handlerPrevalue =(itemValue)=>{
      setUpdateText(itemValue);
    }

    // 使用可选链操作符和默认值，??表示如果左侧表达式的值为 null 或 undefined，返回右侧表达式的值；否则返回左侧表达式的值。
    const currentuUser = authUser?.username ?? '';

    console.log("from commentsBlock username:"+currentuUser);
    
    const handleEdit = (itemID,itemContent)=>{
      if(authUser){
        setUpdateDialog(true);
        handleCommentId(itemID);
        handlerPrevalue(itemContent);

      }else{
          toast.error("this function need Login to use!");
          console.log("this function need Login to use!");
          navigate("/login");
      }
    }

    const handlEditClose = ()=>{
      setUpdateDialog(false);
      updateFuntion();
    }

    const handleDelte =async(id)=>{
      if(window.confirm(`DELETE this comment?`)){
        try {
          const delRespone = await fetch(`/api/inscpt/delComment/${id}`);
          if(delRespone.ok){
            console.log("del success");
            updateFuntion();
          }else{
            console.log("something wrong");
          }
        } catch (error) {
          console.log(error);
        }
      }
    };

    const handleReplay = (itemID)=>{
      if(authUser){
        setShowReplyDialog(true);
        handleCommentId(itemID);
      }else{
        toast.error("Please Login for replying!");
        navigate("/login");
      }
    }

    const handleReplayClose = ()=>{
      setShowReplyDialog(false);
      updateFuntion();
    }

    return (
      <div className="space-y-4">
        {commentList.map(item => (
          <div key={item._id} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <div className="w-full">
     
              <p className="font-bold ">{item.writerName} <span className="text-gray-400 text-sm justify-self-end">{"  updated  "+daysSinceDate(item.updatedAt)+" days ago"} </span></p>
              <p className="w-full h-20 border rounded-lg border-green-100">{item.commentContent}</p>
              {item.writerName === currentuUser
              ?
              <div className="m-2">
                <button 
                  className="text-gray-400 text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" 
                  onClick={()=>handleEdit(item._id,item.commentContent)}
                > 
                edit 
                </button>

                {/* <UpdateDialog isOpen={showUpdateDialog} onClose={handlEditClose} commentId={item._id} preValue={item.commentContent}/> */}
               {showUpdateDialog && <UpdateDialog  preValue={updateText} commentId={commentID} onClose={handlEditClose}/> }

                <button 
                  className="text-gray-400 text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4"
                  onClick={()=>handleDelte(item._id)}
                > 
                  delete 
                </button>

                <button 
                  className="text-gray-400 text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4"
                  onClick={()=>handleReplay(item._id)}
                >Reply 
                </button>
                
              </div>
              :
              <button 
                className="m-2 text-gray-400 text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                onClick={()=>handleReplay(item._id)}
              >
                Reply 
              </button>
              }
              {showReplyDialog && <ReplyToComent onClose={handleReplayClose} replyId={commentID} /> }
               {/* 新增: 显示回复内容 */}
               {item.reply && item.reply.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <h4 className="font-semibold text-sm text-black">Replies:</h4>
                    {item.reply.map(replyItem => (
                      <div key={replyItem._id} className="bg-gray-100 p-3 rounded-lg text-black">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-sm">{authUser?.username ?? 'unkown'}</span>
                          <span className="text-xs text-gray-500">{(replyItem.replyTime)}</span>
                        </div>
                        <p className="text-sm mt-1 ">{replyItem.content}</p>
                      </div>
                    ))}
                  </div>)
                }

               {/* 以上新增: 显示回复内容 */}
            </div>
          </div>
        ))}
        <button className="btn text-xs bg-green-500 hover:bg-green-700 sm:btn-sm md:btn-md lg:btn-lg">More</button>
      </div>
    );
  }


export default CommentsBlock;




