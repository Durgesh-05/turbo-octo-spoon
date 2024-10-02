import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL, formattedTime } from '../api/utils';
import { AuthState } from '../store/atom';

interface CommentCardProps {
  author: string;
  content: string;
  createdAt: string;
}

const CommentCard: React.FC<CommentCardProps> = ({
  author,
  content,
  createdAt,
}) => {
  return (
    <div className='p-4 border border-gray-200 rounded-xl'>
      <p className='font-semibold text-gray-900'>{author}</p>
      <p className='text-gray-700'>{content}</p>
      <p className='text-sm text-gray-500'>{formattedTime(createdAt)}</p>
    </div>
  );
};

const CommentSection = ({
  blogId,
  authState,
}: {
  blogId: string;
  authState: AuthState;
}) => {
  const [comments, setComments] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState<string>('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(
          `${BACKEND_URL}/api/v1/blog/${blogId}/comment`
        );

        setComments(response.data.data);
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      }
    };
    fetchComments();
  }, [blogId]);

  const handleCommentSubmit = async () => {
    try {
      await axios.post(`${BACKEND_URL}/api/v1/blog/${blogId}/comment`, {
        content: commentInput,
      });
      setCommentInput('');
      // Optionally, refetch comments after submitting a new one
      const response = await axios.get(
        `${BACKEND_URL}/api/v1/blog/${blogId}/comment`
      );
      setComments(response.data.data);
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <div className='mt-6'>
      {authState.isAuthenticated ? (
        <>
          <h2 className='text-xl font-bold mb-4'>Comments</h2>
          <div className='mb-4'>
            <textarea
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              rows={3}
              placeholder='Add a comment...'
              className='w-full border border-gray-300 p-2 rounded'
            />
            <button
              onClick={handleCommentSubmit}
              className='mt-2 px-4 py-2 bg-gray-950 text-white rounded'
            >
              Submit
            </button>
          </div>
        </>
      ) : (
        ''
      )}
      <div>
        {comments.map((comment) => (
          <CommentCard
            key={comment.id}
            author={comment.user.name}
            content={comment.content}
            createdAt={comment.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
