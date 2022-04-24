import axios from "axios";

const Vacancy_API_BASE_URL = "http://localhost:8081/rest/company/vacancy";

class VacancyService{
    createVacancy(vacancyId,vacancy){
        return axios.post(Vacancy_API_BASE_URL + '/addVacancy/' + vacancyId, vacancy);
    }
    getVacancyByVacancyId(vacancyId){
        return axios.get(Vacancy_API_BASE_URL + '/getVacancyById/' + vacancyId)
    }
    getVacancyByVacancyIdAndUserId(vacancyId, userId){
        return axios.get(Vacancy_API_BASE_URL + '/vacancy/' + vacancyId + '/' + userId)
    }
   
    updateVacancy(vacancy){
        return axios.put(Vacancy_API_BASE_URL + '/updateVacancy', vacancy);
    }

    updateVacancyStatus(vacancyId){
        return axios.put(Vacancy_API_BASE_URL + '/updateVacancyStatus/'  + vacancyId);
    }

    getVacancyByInterviewId(vacancyId){
        return axios.get(Vacancy_API_BASE_URL + '/findByInterview/' + vacancyId)
    }
}

export default new VacancyService()