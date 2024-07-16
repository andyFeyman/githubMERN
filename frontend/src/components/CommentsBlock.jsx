export const CommentsBlock = ({commentList})=>{

    return(
        <div className="space-y-4">
        <div className="flex items-start space-x-4">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex-shrink-0"></div>
            
            <div>
                <p className="font-bold">User Name <span className="text-gray-400 text-sm">• 2 days ago</span></p>
                <p>Comment text here</p>
                <button className="text-gray-400 text-sm">Reply</button>
            </div>
        </div>
    </div>
    );
}

