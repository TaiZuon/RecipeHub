import React, { useState, useEffect } from 'react';
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

    const handleAddComment = async () => {
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

    useEffect(() => {
        getAllComments(1);
    }, [recipeId]);

    return (
        <div>
            <div>
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                />
                <button onClick={handleAddComment}>Add Comment</button>
            </div>
            <div>
                {comments.map((comment) => (
                    <div key={comment.id}>
                        {editingCommentId === comment.id ? (
                            <div>
                                <textarea
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                                <button onClick={() => handleUpdateComment(comment.id)}>Update</button>
                                <button onClick={() => setEditingCommentId(null)}>Cancel</button>
                            </div>
                        ) : (
                            <div>
                                <p>{comment.content}</p>
                                {comment.userId === userId && (
                                    <div>
                                        <button onClick={() => {
                                            setEditingCommentId(comment.id);
                                            setEditedContent(comment.content);
                                        }}>Edit</button>
                                        <button onClick={() => handleDeleteComment(comment.id)}>Delete</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;