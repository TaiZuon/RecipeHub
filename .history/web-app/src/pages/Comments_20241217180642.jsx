import { Title } from "../components/Design";
import { commonClassNameOfInput } from "../components/Design";
import { useState, useEffect } from "react";
import { PrimaryButton } from "../components/Design";
import { formatTime } from "../utils/DateFormatter"; 
import { FaEllipsisH } from "react-icons/fa";
import { Pagination } from "../components/pagination";
import { Caption } from "../components/Design";
import { FaStar } from "react-icons/fa";
import commentService from "../service/commentService";

export const Comments = ({ recipeId, userId, setShowLoginModal, comments, setComments }) => {
    const [newComment, setNewComment] = useState('');
    const [showOptions, setShowOptions] = useState(null);
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');
  
    const [totalItems, setTotalItems] = useState(0);
    const itemsPerPage = 10; // Số lượng item mỗi trang
    const pagesPerGroup = 5; // Số lượng trang mỗi nhóm
  
  
    const getAllComments = async (page) => {
      try {
          const response = await commentService.getCommentsByRecipe(recipeId, page - 1, itemsPerPage, 'createdAt', 'DESC');
          setComments(response.content);
          console.log(comments);
          setTotalItems(response.totalElements);
      } catch (error) {
          console.error('Error fetching comments:', error);
      }
  };
  
    useEffect(() => {
  
      getAllComments(1);
    }, [recipeId]);
  
    const handleNewComment = async () => {
      if (!userId) {
          setShowLoginModal(true);
          return;
      }

      try {
          const newCommentData = {
              userId,
              recipeId,
              content: newComment
          };
          const response = await commentService.addNewComment(newCommentData);
          setComments((prevComments) => [response, ...prevComments]);
          setNewComment('');
      } catch (error) {
          console.error('Error adding new comment:', error);
      }
  };

  
  const handleDeleteComment = async (commentId) => {
    try {
        await commentService.deleteComment(commentId);
        setComments((prevComments) =>
            prevComments.filter((comment) => comment.id !== commentId)
        );
    } catch (error) {
        console.error('Error deleting comment:', error);
    }
};
  
    const handleEdit = (commentId, currentContent) => {
      setShowOptions(false)
      setEditingCommentId(commentId);
      setEditedContent(currentContent); // Điền nội dung hiện tại vào textarea
    };
  
    const handleCancelEdit = () => {
      setEditingCommentId(null);
      setEditedContent('');
    };
  
    const handleSaveEdit = async (commentId) => {
      try {
          const updatedCommentData = {
              content: editedContent
          };
          const response = await commentService.updateComment(commentId, updatedCommentData);
          setComments((prevComments) =>
              prevComments.map((comment) =>
                  comment.id === commentId ? response : comment
              )
          );
          setEditingCommentId(null);
          setEditedContent('');
      } catch (error) {
          console.error('Error updating comment:', error);
      }
  };
  
    const handleToggleOptions = (commentId) => {
      setShowOptions(showOptions === commentId ? null : commentId); // Toggle visibility
    };
  
     return (
        <div>
            <div className="flex items-center">
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    className={`${commonClassNameOfInput} flex-grow`}
                />
                <PrimaryButton onClick={handleNewComment} className="ml-2">Send</PrimaryButton>
            </div>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        {editingCommentId === comment.id ? (
                            <div>
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                    className={commonClassNameOfInput}
                                />
                                <PrimaryButton onClick={() => handleUpdateComment(comment.id)}>Update</PrimaryButton>
                                <PrimaryButton onClick={() => setEditingCommentId(null)}>Cancel</PrimaryButton>
                            </div>
                        ) : (
                            <div>
                                <p>{comment.content}</p>
                                {comment.userId === userId && (
                                    <div>
                                        <PrimaryButton onClick={() => {
                                            setEditingCommentId(comment.id);
                                            setEditedContent(comment.content);
                                        }}>Edit</PrimaryButton>
                                        <PrimaryButton onClick={() => handleDeleteComment(comment.id)}>Delete</PrimaryButton>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                pagesPerGroup={pagesPerGroup}
                onPageChange={getAllComments}
            />
        </div>
    );
};

export default Comments;
  