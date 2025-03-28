import React, { useState } from "react";

interface CommentProps {
  commentId: number;
  userAddr: string;
  content: string;
  replies: CommentProps[];
  onReply: (commentId: number, replyContent: string) => void;
  onLike: (commentId: number) => void; // 点赞处理函数
  onReport: (commentId: number) => void; // 举报处理函数
}

const Comment: React.FC<CommentProps> = ({ commentId, userAddr, content, replies, onReply, onLike, onReport }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    onReply(commentId, replyContent);
    setReplyContent('');
  };

  const handleLike = () => {
    // 向后端发送点赞请求
    onLike(commentId);
  };

  const handleReport = () => {
    // 向后端发送举报请求
    onReport(commentId);
  };

  return (
    <div className="comment">
      <p><strong>{userAddr}</strong>: {content}</p>
      <div>
        <button onClick={handleLike}>Like</button>
        <button onClick={handleReport}>Report</button>
        {replies && replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment key={reply.commentId} {...reply} onReply={onReply} onLike={onLike} onReport={onReport} />
            ))}
          </div>
        )}
        <textarea
          value={replyContent}
          onChange={(e) => setReplyContent(e.target.value)}
          placeholder="Reply..."
        />
        <button onClick={handleReply}>Reply</button>
      </div>
    </div>
  );
};

export default Comment;
