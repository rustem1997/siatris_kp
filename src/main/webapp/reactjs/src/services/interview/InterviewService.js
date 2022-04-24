import axios from "axios";

const Interview_API_BASE_URL = "http://localhost:8081/rest/company/vacancy/interview";

class InterviewService{
    createInterview(idUser,vacancyId,idEmployer,vacancy){
        return axios.post(Interview_API_BASE_URL + '/saveInterview/' + idUser + '/' + vacancyId + '/' + idEmployer, vacancy);
    }
    getInterviewById(interviewId){
        return axios.get(Interview_API_BASE_URL + '/getInterviewById/' + interviewId)
    }
    updateInterviewToacces(interviewId){
        return axios.put(Interview_API_BASE_URL + '/updateInterviewToAccept/' + interviewId)
    }
    updateInterviewToRefuse(interviewId){
        return axios.put(Interview_API_BASE_URL + '/updateInterviewToRefuse/' + interviewId)
    }
}

export default new InterviewService()