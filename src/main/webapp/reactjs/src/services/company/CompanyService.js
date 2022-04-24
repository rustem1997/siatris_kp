import axios from "axios";

const COMPANY_API_BASE_URL = "http://localhost:8081/rest/company";

class CompanyService{
    createCompany(company){
        return axios.post(COMPANY_API_BASE_URL + '/addCompany', company);
    }
    getCompanyById(companyId){
        return axios.get(COMPANY_API_BASE_URL + '/' + companyId)
    }
    getCompanyByVacancyId(vacancyId){
        return axios.get(COMPANY_API_BASE_URL + '/vacancy/' + vacancyId)
    }
    getCompanyByEmployerId(employerId){
        return axios.get(COMPANY_API_BASE_URL + '/findCompanyByEmployerId/' + employerId)
    }
    updateCompany(company){
        return axios.put(COMPANY_API_BASE_URL + '/updateCompany', company);
    }
    dismissEmployerToCompany(employerId,idCompany){
        return axios.put(COMPANY_API_BASE_URL + '/dismissEmployerToCompany/' + employerId + '/' + idCompany);
    }
    addEmployerCompany(employer,idCompany){
        return axios.post(COMPANY_API_BASE_URL + '/addEmployerToCompany/' + idCompany, employer);
    }
    getCompanyByInterviewId(interviewId){
        return axios.get(COMPANY_API_BASE_URL + '/findByInterview/' + interviewId)
    }
}

export default new CompanyService()