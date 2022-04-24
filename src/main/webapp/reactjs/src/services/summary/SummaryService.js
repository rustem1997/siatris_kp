import axios from "axios";

const SUMMARY_API_BASE_URL = "http://localhost:8081/rest/user/summary";

class SummaryService{
    createSummary(userId,summary){
        return axios.post(SUMMARY_API_BASE_URL + '/addSummary/' + userId, summary);
    }
    getSummaryBySummaryId(summaryId){
        return axios.get(SUMMARY_API_BASE_URL + '/' + summaryId)
    }

    updateSummary(Summary){
        return axios.put(SUMMARY_API_BASE_URL + '/updateSummary', Summary);
    }
    deleteSummary(summaryId){
        return axios.delete(SUMMARY_API_BASE_URL + '/deleteSummary/' + summaryId);
    }
}

export default new SummaryService()