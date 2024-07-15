import React, {useState} from "react";
import toast from "react-hot-toast";

const ReplyDialog = ({isOpen, onClose,inScptId})=>{
    const [replyText,setReplyText] = useState("");

    //event事件必须传参进来
    const handleReplyChange = (event)=>{
        setReplyText(event.target.value);
    }

    const handleReplySubmit = async()=>{
        console.log("testing now");
    
        try {
            const response = await fetch('/api/inscpt/addComment',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({content: replyText, inscriptionId: inScptId}),
            });
            if (response.ok) {
                // 处理成功响应，例如关闭对话框、更新评论列表等
                onClose();
                console.log('Reply submitted successfully!');
              } else {
                console.error('Error submitting reply:', response.statusText);
              }

        } catch (error) {
            toast.error(error.message);
        }


    }

    return(
        <div className={`fixed inset-0 z-50 ${isOpen ? 'block' : 'hidden'}`}>
            <div className="flex items-center justify-center h-screen">
                <div className="bg-white rounded-lg p-8 shadow-md">
                    <h2 className="text-xl font-bold mb-4">Add a Reply</h2>
                    <textarea
                        className="w-full border p-2 mb-4"
                        value={replyText}
                        onChange={handleReplyChange}
                        placeholder="Enter your reply..."
                        rows={5}
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleReplySubmit}
                    >
                        Submit
                    </button>
                    <button
                        className="ml-4 bg-gray-300 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};



export default ReplyDialog;