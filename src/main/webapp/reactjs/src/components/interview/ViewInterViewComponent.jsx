import React, { Component } from 'react';
import VacancyService from '../../services/vacancy/VacancyService';
import CompanyService from '../../services/company/CompanyService';
import InterviewService from '../../services/interview/InterviewService';

import {
    Tabs,
    Tab,
    Row,
    Col,
    Container,
} from 'react-bootstrap';



class ViewInterviewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idVacancy: this.props.match.params.vacancyId,
            idUser: this.props.match.params.idUser,
            interviewId: this.props.match.params.interviewId,
            companyId: this.props.match.params.companyId,
            idEmployer: this.props.match.params.idEmployer,

            company: {},
            vacancy: {},
            interview: {}
        };
    }

    componentDidMount() {
        setTimeout(() => {
            InterviewService.getInterviewById(
                this.state.interviewId
            ).then((res) => {
                this.setState({ interview: res.data });
            });

            this.getCompanyByInterviewId();
            this.getVacancyByInterviewId();
        }, 1000);
    }
    getCompanyByInterviewId() {
        setTimeout(() => {
            CompanyService.getCompanyByInterviewId(this.state.interview.id).then((res) => {
                this.setState({ company: res.data });
            });
        }, 1000);
    }
    getVacancyByInterviewId() {
        setTimeout(() => {

            VacancyService.getVacancyByInterviewId(
                this.state.interview.id
            ).then((res) => {
                this.setState({ vacancy: res.data });
            });

        }, 1000);
    }


    back() {

        if (this.state.idEmployer !== undefined) {
            this.props.history.push(
                `/view-vacancy-employer/${this.state.companyId}/${this.state.idVacancy}/${this.state.idEmployer}`
            );
        } else {
            this.props.history.push(
                `/interview-list/${this.state.idUser}`
            );
        }

    }
    accessInterview() {
        InterviewService.updateInterviewToacces(this.state.interviewId).then((res) => {
            this.setState({ user: res.data });
        });

        this.props.history.push(
            `/interview-list/${this.state.idUser}`
        );

    }
    refuseInterview() {
        InterviewService.updateInterviewToRefuse(this.state.interviewId).then((res) => {
            this.setState({ user: res.data });
        });

        this.props.history.push(
            `/interview-list/${this.state.idUser}`
        );

    }
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllVacancyUserByVacancyId(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.justPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllVacancyUserByVacancyId(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllVacancyUserByVacancyId(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.justPerPage)
        ) {
            this.findAllVacancyUserByVacancyId(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);

        this.findAllVacancyUserByVacancyId(targetPage);

        this.setState({
            [event.target.name]: targetPage,
        });
    };
    cancel = () => {
        this.props.history.push('/home');
    };
    render() {
        const { } = this.state;
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
                            <Container className='card mb-3'>
                                <div className='card-body'>
                                    <Row>
                                        <Col>
                                            <Tabs
                                                defaultActiveKey='hj'
                                                id='controlled-tab-example'
                                            >
                                                <Tab
                                                    eventKey='интервью'
                                                    title='интервью'
                                                >

                                                    <div className='card-body'>
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Тип интервью:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {this.state.interview.type}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Когда было организовано интервью :
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {this.state.interview.createAt}
                                                            </div>
                                                        </div>
                                                        <hr />
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Описание интервью:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {this.state.interview.descriptions}
                                                            </div>
                                                        </div>
                                                        <div className='row'>
                                                            <div className='col-sm-3'>
                                                                <h6 className='mb-0'>
                                                                    Статус интервью:
                                                                </h6>
                                                            </div>
                                                            <div className='col-sm-9 text-secondary'>
                                                                {this.state.interview.resolve}
                                                            </div>
                                                        </div>


                                                        {this.state.idUser !== undefined ? (

                                                            <div className='row'>
                                                                {this.state.interview.resolve === 'в ожидании ответа' ? (
                                                                    <div className='col-sm-12'>

                                                                        <button
                                                                            onClick={() =>
                                                                                this.accessInterview()
                                                                            }
                                                                            className='btn btn-info'
                                                                        >
                                                                            Принять интервью
                                                                        </button>

                                                                        <hr />


                                                                        <button
                                                                            onClick={() =>
                                                                                this.refuseInterview()
                                                                            }
                                                                            className='btn btn-info'
                                                                        >
                                                                            Отказаться от интервью
                                                                        </button>

                                                                    </div>
                                                                ) : ''}
                                                            </div>

                                                        ) : ''}
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


                                                </Tab>
                                            </Tabs>
                                        </Col>
                                    </Row>
                                </div>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default ViewInterviewComponent;
