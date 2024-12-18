import axios from 'axios';

const API_BASE_URL = 'http://localhost:808/api/comments';

const commentService = {
    addNewComment: async (comment) => {
        try {
            const response = await axios.post(`${API_BASE_URL}`, comment);
            return response.data;
        } catch (error) {
            console.error('Error adding new comment:', error);
            throw error;
        }
    },

    getCommentsByRecipe: async (recipeId, page = 0, size = 10, sortBy = 'createdAt', sortDirection = 'DESC') => {
        try {
            const response = await axios.get(`${API_BASE_URL}/recipe/${recipeId}`, {
                params: { page, size, sortBy, sortDirection }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching comments by recipe:', error);
            throw error;
        }
    },

    updateComment: async (commentId, request) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${commentId}`, request);
            return response.data;
        } catch (error) {
            console.error('Error updating comment:', error);
            throw error;
        }
    },

    deleteComment: async (commentId) => {
        try {
            await axios.delete(`${API_BASE_URL}/${commentId}`);
        } catch (error) {
            console.error('Error deleting comment:', error);
            throw error;
        }
    }
};

export default commentService;