import React, { Component } from 'react';
import VacancyService from '../../services/vacancy/VacancyService';
import CompanyService from '../../services/company/CompanyService';
import axios from 'axios';
import {
    Card,
    Table,
    InputGroup,
    FormControl,
    Button,
    Tabs,
    Tab,
    Row,
    Col,
    Container,
} from 'react-bootstrap';
import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


class ViewVacancyCompany extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idVacancy: this.props.match.params.vacancyId,
            idEmployer: this.props.match.params.idEmployer,
            companyId: this.props.match.params.idCompany,
            company: {},
            vacancyCompany: {},
            datas: [],
            datasPassed: [],
            datasFailed: [],
            interviewOnWaiting: [],
            interviewOnFefuse: [],
            interviewOnAccept: [],
            justCurrentPage: 1,
            justPerPage: 5,
        };
    }

    componentDidMount() {
        setTimeout(() => {

            CompanyService.getCompanyById(this.state.companyId).then((res) => {
                this.setState({ company: res.data });
            });
            this.getVacancyById();
            this.findAllVacancyUserByVacancyId(this.state.justCurrentPage);
            this.findAllVacancyUserPassedByVacancyId(this.state.justCurrentPage);
            this.findAllVacancyUserFailedByVacancyId(this.state.justCurrentPage);
            this.findAllInterviewOnWaiting(this.state.currentPage);
            this.findAllInterviewOnRefuse(this.state.currentPage);
            this.findAllInterviewOnAccept(this.state.currentPage);
        }, 1000);
    }
    findAllInterviewOnWaiting(currentPage) {
        currentPage -= 1;
        const id = this.state.idVacancy;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/interview/findAllInterviewByVacancyIdOnWaiting/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage +
                '&id=' +
                id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    interviewOnWaiting: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    findAllInterviewOnRefuse(currentPage) {
        currentPage -= 1;
        const id = this.state.idVacancy;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/interview/findAllInterviewByVacancyIdRefuse/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage +
                '&id=' +
                id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    interviewOnFefuse: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    findAllInterviewOnAccept(currentPage) {
        currentPage -= 1;
        const id = this.state.idVacancy;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/interview/findAllInterviewByVacancyIdAccept/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage +
                '&id=' +
                id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    interviewOnAccept: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    findAllVacancyUserByVacancyId(currentPage) {
        currentPage -= 1;
        const id = this.state.idVacancy;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findUserOnWaitByVacancyId/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage +
                '&id=' +
                id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    datas: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    findAllVacancyUserPassedByVacancyId(currentPage) {
        currentPage -= 1;
        const id = this.state.idVacancy;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findUserPassedByVacancyId/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage +
                '&id=' +
                id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    datasPassed: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    findAllVacancyUserFailedByVacancyId(currentPage) {
        currentPage -= 1;
        const id = this.state.idVacancy;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findUserFailedByVacancyId/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage +
                '&id=' +
                id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    datasFailed: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    addToPassedGroup(userId) {

        const id = this.state.idVacancy;

        axios
            .post(
                'http://localhost:8081/rest/company/vacancy/saveUserOnPassedByVacancyId/?idUser=' +
                userId +
                '&idVacancy=' +
                id
            )
            .then((response) => response.data)
            .then(() => {
                if (this.state.idEmployer === undefined) {
                    this.props.history.push(
                        `/view-company/${this.state.companyId}`
                    );
                } else {

                    this.props.history.push(
                        `/company/employer/${this.state.idEmployer}`
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    addToFailedGroup(userId) {

        const id = this.state.idVacancy;

        axios
            .post(
                `http://localhost:8081/rest/company/vacancy/saveUserOnFailedByVacancyId/${userId}/${id}`

            )
            .then((response) => response.data)
            .then(() => {
                if (this.state.idEmployer === undefined) {
                    this.props.history.push(
                        `/view-company/${this.state.companyId}`
                    );
                } else {

                    this.props.history.push(
                        `/company/employer/${this.state.idEmployer}`
                    );
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
    getVacancyById() {
        setTimeout(() => {
            VacancyService.getVacancyByVacancyId(
                this.state.idVacancy
            ).then((res) => {
                this.setState({ vacancyCompany: res.data });
            });
        }, 1000);
    }
    editVacancy() {
        setTimeout(() => {
            this.props.history.push(
                `/update-vacancy/${this.state.idVacancy}/${this.state.companyId}/${this.state.idEmployer}`
            );
        }, 1000);
    };

    back() {
        if (this.state.idEmployer === undefined) {
            this.props.history.push(
                `/view-company/${this.state.companyId}`
            );
        } else {

            this.props.history.push(
                `/company/employer/${this.state.idEmployer}`
            );
        }
    }
    changeStatus() {
        VacancyService.updateVacancyStatus(this.state.idVacancy).then(
            (res) => {
                this.props.history.push(
                    `/company/employer/${this.state.idEmployer}`
                );
            }
        );
    }
    viewUser(idUser) {
        this.props.history.push(`/user-profile-page/${idUser}/${this.state.idEmployer}`);
    }
    createInterview(idUser) {
        this.props.history.push(`/create-interview/${idUser}/${this.state.idEmployer}/${this.state.idVacancy}/${this.state.companyId}`);
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
    viewInterview = (interviewId) => {
        setTimeout(() => {
            this.props.history.push(
                `/view-vacancy-employer-interview/${interviewId}/${this.state.idEmployer}/${this.state.companyId}/${this.state.idVacancy}`
            );
        }, 1000);
    };
    cancel = () => {
        this.props.history.push('/home');
    };
    render() {
        const { justCurrentPage, totalPages, currentPage } = this.state;
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
                                                    {this.state.vacancyCompany.name}
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
                                                    {this.state.vacancyCompany.expectation}
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
                                                    {this.state.vacancyCompany.conditions}
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
                                                    {this.state.vacancyCompany.experience} года
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
                                                        this.state.vacancyCompany
                                                            .description
                                                    }
                                                </div>
                                            </div>


                                            {this.state.idEmployer !== undefined ? (
                                                <div className='row'>
                                                    <div className='col-sm-12'>

                                                        <button
                                                            onClick={() =>
                                                                this.editVacancy()
                                                            }
                                                            className='btn btn-info'
                                                        >
                                                            Изменить данные
                                                        </button>

                                                        <hr />

                                                        <button
                                                            className='btn btn-danger'
                                                            onClick={this.changeStatus.bind(this)}
                                                            style={{
                                                                marginLeft: '10px',
                                                            }}
                                                        >

                                                            {this.state.vacancyCompany.vacancyStatus === "ACTIVE" ? (
                                                                'Дискативация вакансии'
                                                            ) : (
                                                                'Активация вакансии'
                                                            )}
                                                        </button>


                                                    </div>

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
                                                    eventKey='пользователиВОжидании'
                                                    title='Пользователи В Ожидании ответа'
                                                >
                                                    <div>
                                                        <Card className={'border border-dark bg-dark text-white car'}>
                                                            <Card.Header>
                                                                <div style={{ float: 'left' }}>
                                                                    <FontAwesomeIcon icon={faUsers} />
                                                                    Список откликов
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Table bordered hover striped variant='dark'>
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Имя:</td>
                                                                            <td>Фамилие:</td>
                                                                            <td>Почта:</td>

                                                                            <td>Действие:</td>
                                                                            <td>Принять:</td>
                                                                            <td>Отказать:</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.datas.map((user) => (
                                                                            <tr key={user.id}>
                                                                                <td>{user.name}</td>
                                                                                <td>{user.surname}</td>
                                                                                <td>{user.email}</td>
                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.viewUser(user.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Просмотреть пользователя
                                                                                    </button>
                                                                                </td>
                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.addToPassedGroup(user.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Принять пользователя
                                                                                    </button>
                                                                                </td>
                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.addToFailedGroup(user.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Отказать пользователя
                                                                                    </button>
                                                                                </td>
                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.createInterview(user.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Организовать интервью с данным пользователем
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </Card.Body>

                                                            <Card.Footer>
                                                                <div style={{ float: 'left' }}>
                                                                    Страница {currentPage} от {totalPages}
                                                                </div>
                                                                <div style={{ float: 'right' }}>
                                                                    <InputGroup size='sm'>
                                                                        <InputGroup.Prepend>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === 1 ? true : false
                                                                                }
                                                                                onClick={this.firstPage}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faFastBackward}
                                                                                />{' '}
                                                                                Первая
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === 1 ? true : false
                                                                                }
                                                                                onClick={this.prevPage}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faStepBackward}
                                                                                />{' '}
                                                                                Пред
                                                                            </Button>
                                                                        </InputGroup.Prepend>
                                                                        <FormControl
                                                                            className={'page-num bg-dark'}
                                                                            name='currentPage'
                                                                            value={currentPage}
                                                                            onChange={this.changePage}
                                                                        />
                                                                        <InputGroup.Append>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={this.nextPage}
                                                                            >
                                                                                <FontAwesomeIcon icon={faStepForward} />{' '}
                                                                                След
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={this.lastPage}
                                                                            >
                                                                                <FontAwesomeIcon icon={faFastForward} />{' '}
                                                                                Последняя
                                                                            </Button>
                                                                        </InputGroup.Append>
                                                                    </InputGroup>
                                                                </div>
                                                            </Card.Footer>
                                                        </Card>
                                                    </div>

                                                </Tab>


                                                <Tab
                                                    eventKey='прошедшиеСобеседование'
                                                    title='Прошедшие Собеседование'
                                                >
                                                    <div>
                                                        <Card className={'border border-dark bg-dark text-white car'}>
                                                            <Card.Header>
                                                                <div style={{ float: 'left' }}>
                                                                    <FontAwesomeIcon icon={faUsers} />
                                                                    Список прошедших собеседование
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Table bordered hover striped variant='dark'>
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Имя:</td>
                                                                            <td>Фамилие:</td>
                                                                            <td>Почта:</td>

                                                                            <td>Действие:</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.datasPassed.map((user) => (
                                                                            <tr key={user.id}>
                                                                                <td>{user.name}</td>
                                                                                <td>{user.surname}</td>
                                                                                <td>{user.email}</td>

                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.viewUser(user.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Просмотреть пользователя
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </Card.Body>

                                                            <Card.Footer>
                                                                <div style={{ float: 'left' }}>
                                                                    Страница {currentPage} от {totalPages}
                                                                </div>
                                                                <div style={{ float: 'right' }}>
                                                                    <InputGroup size='sm'>
                                                                        <InputGroup.Prepend>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === 1 ? true : false
                                                                                }
                                                                                onClick={this.firstPage}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faFastBackward}
                                                                                />{' '}
                                                                                Первая
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === 1 ? true : false
                                                                                }
                                                                                onClick={this.prevPage}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faStepBackward}
                                                                                />{' '}
                                                                                Пред
                                                                            </Button>
                                                                        </InputGroup.Prepend>
                                                                        <FormControl
                                                                            className={'page-num bg-dark'}
                                                                            name='currentPage'
                                                                            value={currentPage}
                                                                            onChange={this.changePage}
                                                                        />
                                                                        <InputGroup.Append>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={this.nextPage}
                                                                            >
                                                                                <FontAwesomeIcon icon={faStepForward} />{' '}
                                                                                След
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={this.lastPage}
                                                                            >
                                                                                <FontAwesomeIcon icon={faFastForward} />{' '}
                                                                                Последняя
                                                                            </Button>
                                                                        </InputGroup.Append>
                                                                    </InputGroup>
                                                                </div>
                                                            </Card.Footer>
                                                        </Card>
                                                    </div>
                                                </Tab>


                                                <Tab
                                                    eventKey='неПодходяшие'
                                                    title='Не подходяшие'
                                                >
                                                    <div>
                                                        <Card className={'border border-dark bg-dark text-white car'}>
                                                            <Card.Header>
                                                                <div style={{ float: 'left' }}>
                                                                    <FontAwesomeIcon icon={faUsers} />
                                                                    Список не прошедших собеседование/ не подходящих
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Table bordered hover striped variant='dark'>
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Имя:</td>
                                                                            <td>Фамилие:</td>
                                                                            <td>Почта:</td>

                                                                            <td>Действие:</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.datasFailed.map((user) => (
                                                                            <tr key={user.id}>
                                                                                <td>{user.name}</td>
                                                                                <td>{user.surname}</td>
                                                                                <td>{user.email}</td>

                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.viewUser(user.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Просмотреть пользователя
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </Card.Body>

                                                            <Card.Footer>
                                                                <div style={{ float: 'left' }}>
                                                                    Страница {currentPage} от {totalPages}
                                                                </div>
                                                                <div style={{ float: 'right' }}>
                                                                    <InputGroup size='sm'>
                                                                        <InputGroup.Prepend>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === 1 ? true : false
                                                                                }
                                                                                onClick={this.firstPage}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faFastBackward}
                                                                                />{' '}
                                                                                Первая
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === 1 ? true : false
                                                                                }
                                                                                onClick={this.prevPage}
                                                                            >
                                                                                <FontAwesomeIcon
                                                                                    icon={faStepBackward}
                                                                                />{' '}
                                                                                Пред
                                                                            </Button>
                                                                        </InputGroup.Prepend>
                                                                        <FormControl
                                                                            className={'page-num bg-dark'}
                                                                            name='currentPage'
                                                                            value={currentPage}
                                                                            onChange={this.changePage}
                                                                        />
                                                                        <InputGroup.Append>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={this.nextPage}
                                                                            >
                                                                                <FontAwesomeIcon icon={faStepForward} />{' '}
                                                                                След
                                                                            </Button>
                                                                            <Button
                                                                                type='button'
                                                                                variant='outline-info'
                                                                                disabled={
                                                                                    currentPage === totalPages
                                                                                        ? true
                                                                                        : false
                                                                                }
                                                                                onClick={this.lastPage}
                                                                            >
                                                                                <FontAwesomeIcon icon={faFastForward} />{' '}
                                                                                Последняя
                                                                            </Button>
                                                                        </InputGroup.Append>
                                                                    </InputGroup>
                                                                </div>
                                                            </Card.Footer>
                                                        </Card>
                                                    </div>


                                                </Tab>
                                                <Tab
                                                    eventKey='cписокИнтервьюВОжиданииОтвета'
                                                    title='   Список интервью в ожидании ответа'
                                                >
                                                <div>
                                                    <Card className={'border border-dark bg-dark text-white car'}>
                                                        <Card.Header>
                                                            <div style={{ float: 'left' }}>
                                                                <FontAwesomeIcon icon={faUsers} />
                                                                Список интервью в ожидании ответа
                                                            </div>

                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Table bordered hover striped variant='dark'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Тип интервью</th>
                                                                        <th>Описание</th>
                                                                        <td>Перейти</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.interviewOnWaiting.map((vac) => (
                                                                        <tr key={vac.id}>

                                                                            <td>{vac.type}</td>
                                                                            <td>{vac.descriptions}</td>
                                                                            <td>
                                                                                <button
                                                                                    style={{
                                                                                        marginLeft: '10px',
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        this.viewInterview(vac.id)
                                                                                    }
                                                                                    className='btn btn-info'
                                                                                >
                                                                                    {' '}
                                                                                    Просмотр интервью
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>

                                                        <Card.Footer>
                                                            <div style={{ float: 'left' }}>
                                                                Страница {currentPage} от {totalPages}
                                                            </div>
                                                            <div style={{ float: 'right' }}>
                                                                <InputGroup size='sm'>
                                                                    <InputGroup.Prepend>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === 1 ? true : false
                                                                            }
                                                                            onClick={this.firstPage}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faFastBackward}
                                                                            />{' '}
                                                                            Первая
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === 1 ? true : false
                                                                            }
                                                                            onClick={this.prevPage}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faStepBackward}
                                                                            />{' '}
                                                                            Пред
                                                                        </Button>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl
                                                                        className={'page-num bg-dark'}
                                                                        name='currentPage'
                                                                        value={currentPage}
                                                                        onChange={this.changePage}
                                                                    />
                                                                    <InputGroup.Append>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={this.nextPage}
                                                                        >
                                                                            <FontAwesomeIcon icon={faStepForward} />{' '}
                                                                            След
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={this.lastPage}
                                                                        >
                                                                            <FontAwesomeIcon icon={faFastForward} />{' '}
                                                                            Последняя
                                                                        </Button>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </Card.Footer>
                                                    </Card>
                                                    </div>
                                                </Tab>
                                                <Tab
                                                    eventKey='списокИнтервьюКоторыеОтклонены'
                                                    title='Список интервью которые отклонены'
                                                >
                                                <div>
                                                    <Card className={'border border-dark bg-dark text-white car'}>
                                                        <Card.Header>
                                                            <div style={{ float: 'left' }}>
                                                                <FontAwesomeIcon icon={faUsers} />
                                                                Список интервью которые отклонены
                                                            </div>

                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Table bordered hover striped variant='dark'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Тип интервью</th>
                                                                        <th>Описание</th>
                                                                        <td>Перейти</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.interviewOnFefuse.map((vac) => (
                                                                        <tr key={vac.id}>

                                                                            <td>{vac.type}</td>
                                                                            <td>{vac.descriptions}</td>
                                                                            <td>
                                                                                <button
                                                                                    style={{
                                                                                        marginLeft: '10px',
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        this.viewInterview(vac.id)
                                                                                    }
                                                                                    className='btn btn-info'
                                                                                >
                                                                                    {' '}
                                                                                    Просмотр интервью
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>

                                                        <Card.Footer>
                                                            <div style={{ float: 'left' }}>
                                                                Страница {currentPage} от {totalPages}
                                                            </div>
                                                            <div style={{ float: 'right' }}>
                                                                <InputGroup size='sm'>
                                                                    <InputGroup.Prepend>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === 1 ? true : false
                                                                            }
                                                                            onClick={this.firstPage}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faFastBackward}
                                                                            />{' '}
                                                                            Первая
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === 1 ? true : false
                                                                            }
                                                                            onClick={this.prevPage}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faStepBackward}
                                                                            />{' '}
                                                                            Пред
                                                                        </Button>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl
                                                                        className={'page-num bg-dark'}
                                                                        name='currentPage'
                                                                        value={currentPage}
                                                                        onChange={this.changePage}
                                                                    />
                                                                    <InputGroup.Append>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={this.nextPage}
                                                                        >
                                                                            <FontAwesomeIcon icon={faStepForward} />{' '}
                                                                            След
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={this.lastPage}
                                                                        >
                                                                            <FontAwesomeIcon icon={faFastForward} />{' '}
                                                                            Последняя
                                                                        </Button>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </Card.Footer>
                                                    </Card>
                                                    </div>
                                                </Tab>
                                                <Tab
                                                    eventKey='списокОдобренныхИнтервью'
                                                    title=' Список одобренных интервью'
                                                >
                                                <div>
                                                    <Card className={'border border-dark bg-dark text-white car'}>
                                                        <Card.Header>
                                                            <div style={{ float: 'left' }}>
                                                                <FontAwesomeIcon icon={faUsers} />
                                                                Список одобренных интервью
                                                            </div>

                                                        </Card.Header>
                                                        <Card.Body>
                                                            <Table bordered hover striped variant='dark'>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Тип интервью</th>
                                                                        <th>Описание</th>
                                                                        <td>Перейти</td>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {this.state.interviewOnAccept.map((vac) => (
                                                                        <tr key={vac.id}>

                                                                            <td>{vac.type}</td>
                                                                            <td>{vac.descriptions}</td>
                                                                            <td>
                                                                                <button
                                                                                    style={{
                                                                                        marginLeft: '10px',
                                                                                    }}
                                                                                    onClick={() =>
                                                                                        this.viewInterview(vac.id)
                                                                                    }
                                                                                    className='btn btn-info'
                                                                                >
                                                                                    {' '}
                                                                                    Просмотр интервью
                                                                                </button>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        </Card.Body>

                                                        <Card.Footer>
                                                            <div style={{ float: 'left' }}>
                                                                Страница {currentPage} от {totalPages}
                                                            </div>
                                                            <div style={{ float: 'right' }}>
                                                                <InputGroup size='sm'>
                                                                    <InputGroup.Prepend>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === 1 ? true : false
                                                                            }
                                                                            onClick={this.firstPage}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faFastBackward}
                                                                            />{' '}
                                                                            Первая
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === 1 ? true : false
                                                                            }
                                                                            onClick={this.prevPage}
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={faStepBackward}
                                                                            />{' '}
                                                                            Пред
                                                                        </Button>
                                                                    </InputGroup.Prepend>
                                                                    <FormControl
                                                                        className={'page-num bg-dark'}
                                                                        name='currentPage'
                                                                        value={currentPage}
                                                                        onChange={this.changePage}
                                                                    />
                                                                    <InputGroup.Append>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={this.nextPage}
                                                                        >
                                                                            <FontAwesomeIcon icon={faStepForward} />{' '}
                                                                            След
                                                                        </Button>
                                                                        <Button
                                                                            type='button'
                                                                            variant='outline-info'
                                                                            disabled={
                                                                                currentPage === totalPages
                                                                                    ? true
                                                                                    : false
                                                                            }
                                                                            onClick={this.lastPage}
                                                                        >
                                                                            <FontAwesomeIcon icon={faFastForward} />{' '}
                                                                            Последняя
                                                                        </Button>
                                                                    </InputGroup.Append>
                                                                </InputGroup>
                                                            </div>
                                                        </Card.Footer>
                                                    </Card>
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

export default ViewVacancyCompany;
