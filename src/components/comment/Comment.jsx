// Comment.jsx
import { useState } from 'react';
import CommentList from '../commentList/CommentList';
const API_URL = import.meta.env.VITE_API_URL;

function Comment({ comment, level, postId, authToken, fetchOnePost }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDeleteComment = async () => {
    if (!window.confirm('Are you sure you want to delete this comment?')) {
      return; // stop the delete
    }
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        API_URL + `/posts/${postId}/comments/${comment.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
      fetchOnePost();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <p>
        <strong>{comment.owner.username}</strong>: {comment.content}
      </p>
      <button onClick={handleDeleteComment}>DELETE</button>

      {comment.replies?.length > 0 && (
        <CommentList
          comments={comment.replies}
          level={level + 1}
          postId={postId}
        />
      )}
    </div>
  );
}

export default Comment;
