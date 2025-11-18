// CommentList.jsx

import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import Comment from '../comment/Comment';

function CommentList({ comments, level = 0, postId, fetchOnePost }) {
  const { authToken, user } = useContext(AuthContext);

  return (
    <div>
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          level={level}
          authToken={authToken}
          user={user}
          postId={postId}
          fetchOnePost={fetchOnePost}
        />
      ))}
    </div>
  );
}

export default CommentList;
