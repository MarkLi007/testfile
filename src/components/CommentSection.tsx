import React, { useState } from "react";

// 用于展示单个评论的递归组件
interface CommentProps {
  commentId: number;
  userAddr: string;
  content: string;
  replies: CommentProps[];
  onReply: (commentId: number, replyContent: string) => void;
}

const Comment: React.FC<CommentProps> = ({ commentId, userAddr, content, replies, onReply }) => {
  const [replyContent, setReplyContent] = useState('');

  const handleReply = () => {
    onReply(commentId, replyContent);
    setReplyContent('');
  };

  return (
    <div className="comment">
      <p><strong>{userAddr}</strong>: {content}</p>
      <div>
        {replies && replies.length > 0 && (
          <div className="replies">
            {replies.map((reply) => (
              <Comment key={reply.commentId} {...reply} onReply={onReply} />
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

export const CommentSection: React.FC = () => {
  const [comments, setComments] = useState<CommentProps[]>([]);

  const handleReply = (commentId: number, replyContent: string) => {
    // 处理评论回复逻辑（可以通过后端API提交）
    console.log(`Replying to commentId: ${commentId} with content: ${replyContent}`);
  };

  return (
    <div className="comment-section">
      {comments.map((comment) => (
        <Comment key={comment.commentId} {...comment} onReply={handleReply} />
      ))}
    </div>
  );
};
