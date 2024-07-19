
import { daysSinceDate } from "../utils/functions";

const CommentsBlock = ({ commentList }) => {

    if (!Array.isArray(commentList)) {
      return <div>Loading comments...</div>; // 或者其他适当的加载状态显示
    }

    return (
      <div className="space-y-4">
        {commentList.map(item => (
          <div key={item._id} className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex-shrink-0"></div>
            <div>
              <p className="font-bold">{item.writerName} <span className="text-gray-400 text-sm">{daysSinceDate(item.updatedAt)}</span></p>
              <p>{item.commentContent}</p>
              <button className="text-gray-400 text-sm">Reply</button>
              <button className="text-gray-400 text-sm">edit</button>
              <button className="text-gray-400 text-sm">delete</button>
            </div>
          </div>
        ))}
      </div>
    );
  }


export default CommentsBlock;




