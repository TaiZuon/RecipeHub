import { Title } from "../../router";
import axiosClient from "../../services/axiosClient";
import { commonClassNameOfInput } from "../../components/common/Design"; 
import { useState, useEffect } from "react";
import { authUtils } from "../../utils/authUtils";
import { PrimaryButton } from "../../components/common/Design";
import { formatTime } from "../../utils/DateFormatter"; 
import { FaEllipsisH } from "react-icons/fa";
import { Pagination } from "../../router";
import { Caption } from "../../components/common/Design";
import { FaStar } from "react-icons/fa";
import axios from "axios";
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
  
    const handleUpdateComment = async (commentId) => {
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
      <div className="reviews-tab shadow-s3 p-8 rounded-md">
        <div className="flex items-center gap-5">
          <Title level={4}>Comments ({totalItems})</Title>
        </div>
        <hr className="my-5" />
        <div className="shadow-s3 border p-8 mb-5 gap-5 flex-col rounded-xl">
          <div>
            <Title level={6} className="font-semibold text-left mb-5">Your comment</Title>
            <textarea name="description" className={`${commonClassNameOfInput}`} cols="30" rows="5" value={newComment}
              onChange={(e) => setNewComment(e.target.value)}></textarea>
            <PrimaryButton
              type="button"
              className="rounded-none my-5 flex items-center justify-center"
              onClick={handleNewComment}
            >
              SEND
            </PrimaryButton>
          </div>
        </div>
  
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="shadow-s3 border p-8 mb-5 gap-5 flex-col rounded-xl"
          >
            <div className="flex items-center">
              
              <Title level={6} className="font-normal p-3">{comment.userEmail}</Title>
  
              {comment.userId === userId && (
                <div className="relative ml-auto">
                  <button
                    className="text-gray-600 hover:text-gray-900"
                    onClick={() => handleToggleOptions(comment.id)} // Toggle options when clicked
                  >
                    <FaEllipsisH />
                  </button>
  
                  {showOptions === comment.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white shadow-lg rounded-md">
                      <button
                        onClick={() => handleEdit(comment.id, comment.content)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteComment(comment.id)}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 ml-12 ps-3">
              <div className="flex items-center">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={i < comment.rating ? 'text-yellow-300' : 'text-gray-300'}
                  />
                ))}
              </div>
              <div className="text-gray-500">{comment.updatedAt && comment.createdAt !== comment.updatedAt ? `Updated at: ${formatTime(comment.updatedAt)}` : formatTime(comment.createdAt)}</div>
            </div>
            <div className="ml-12 ps-3">
              {editingCommentId === comment.id ? (
                // Hiển thị textarea khi chỉnh sửa
                <div className="flex flex-col gap-2">
                  <textarea
                    className="w-full p-2 border rounded"
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                  ></textarea>
                  <div className="flex gap-2">
                    <button
                      className="bg-green text-white px-4 py-2 rounded"
                      onClick={() => handleSaveEdit(comment.id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (<Caption className="leading-7">{comment.content}</Caption>)}
  
            </div>
  
          </div>
        ))}
        <Pagination
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          pagesPerGroup={pagesPerGroup}
          onPageChange={getAllComments}
          className="mt-4"
          buttonClassName="bg-blue-500 text-white hover:bg-blue-700"
        />
      </div>
    );
  };
  