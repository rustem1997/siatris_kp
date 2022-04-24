import React, { Component } from 'react';
import VacancyService from '../../services/vacancy/VacancyService';
import CompanyService from '../../services/company/CompanyService';
import axios from 'axios';

class ViewVacancyForUserCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idVacancy: this.props.match.params.vacancyId,
            idUser: this.props.match.params.idUser,

            company: {},
            vacancy: {}
        };
    }

    componentDidMount() {
        setTimeout(() => {
            
                VacancyService.getVacancyByVacancyId(
                    this.state.idVacancy, this.state.idUser
                ).then((res) => {
                    this.setState({ vacancy: res.data });
                });

                this.getCompanyByVacancyId();
               
           }, 1000);
    }
    addToOnWaitGroup() {
        const idUser = this.state.idUser;

        const id = this.state.idVacancy;
 
        axios
            .post(
                'http://localhost:8081/rest/company/vacancy/saveUserOnWaitByVacancyId/?idUser=' +
                idUser +
                '&idVacancy=' +
                id
            )
            .then((response) => response.data)
            .then(() => {
                this.props.history.push(
                    `/vacancy/${this.state.idUser}`
                );
            })
            .catch((error) => {
                console.log(error);
            });
    }
    getCompanyByVacancyId() {
        setTimeout(() => {
            console.log(this.state.vacancy.id);
            CompanyService.getCompanyByVacancyId(this.state.vacancy.id).then((res) => {
                this.setState({ company: res.data });
            });
        }, 1000);
    }
    back() {
      
            this.props.history.push(
                `/vacancy/${this.state.idUser}`
            );
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='main-body'>
                        <div>
                            <div className='row gutters-sm'>
                                <div className='col-md-4 mb-3'>
                                    <div className='card'>
                                        <div className='card-body'>
                                            <div className='d-flex flex-column align-items-center text-center'>
                                                <img
                                                    className='img-thumbnail'
                                                    src={`data:image/*;base64,${this.state.company.image}`}
                                                    alt=''
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <br />
                                </div>

                                <div className='col-md-8'>
                                    <div className='card mb-4'>
                                        <div className='card-body'>
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Наименование
                                                        организации:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.company.name}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Область организации :
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.company.areaOfWork}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Контакты организации:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.company.phoneNumber}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Год образование
                                                        организации:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.company.year}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Количество сотрудников
                                                        организации :
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {
                                                        this.state.company
                                                            .countOfEmployee
                                                    }
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Название
                                                        вакансии:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.vacancy.name}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Ожидание от вас:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.vacancy.expectation}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Условие работы:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.vacancy.conditions}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Необходимы опыт:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.vacancy.experience} года
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Немного описания:
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {
                                                        this.state.vacancy
                                                            .description
                                                    }
                                                </div>
                                            </div>

                                            <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.addToOnWaitGroup()
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                       Откликнуться на вакансию
                                                                                    </button>
                                                                                </td>

                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                                               
                                                    <hr />
                                                    <button
                                                        className='btn btn-danger'
                                                        onClick={this.back.bind(this)}
                                                        style={{
                                                            marginLeft: '10px',
                                                        }}
                                                    >
                                                        Назад
                                                    </button>
                                                </div>

                                            </div>



                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewVacancyForUserCompany;
