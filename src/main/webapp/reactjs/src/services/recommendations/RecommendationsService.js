import axios from "axios";

const RECOMMENDARION_API_BASE_URL = "http://localhost:8081/rest/user/recommendation";

class RecommendationService{
    createRecommendation(userId,employerId,recommendation){
        return axios.post(RECOMMENDARION_API_BASE_URL + '/addRecommendations/' + userId + '/' + employerId, recommendation);
    }
    getRecommendationByRecommendationId(recommendationId){
        return axios.get(RECOMMENDARION_API_BASE_URL + '/' + recommendationId)
    }
    updateRecommendation(recommendation){
        return axios.put(RECOMMENDARION_API_BASE_URL + '/updateRecommendations', recommendation);
    }
    deleteRecommendation(recommendationId){
        return axios.delete(RECOMMENDARION_API_BASE_URL + '/deleteRecommendations/' + recommendationId);
    }
}

export default new RecommendationService()