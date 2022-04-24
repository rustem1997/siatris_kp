import React, { Component } from 'react';
import CompanyService from '../../../services/company/CompanyService';
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';
import axios from 'axios';
import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,

} from '@fortawesome/free-solid-svg-icons';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
class ViewCompanyForEmployerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idEmployer: this.props.match.params.idEmployer,
            company: {},
            activeVacancy: [],
            archiveVacancy: [],
            currentPage: 1,
            pagePerPage: 5,
        };

    }

    componentDidMount() {
        const id = this.state.idEmployer;
        setTimeout(() => {

            CompanyService.getCompanyByEmployerId(id).then((res) => {
                this.setState({ company: res.data });
            });

            console.log(this.state.company);

            this.findAllActiveVacancy(this.state.currentPage);
            this.findAllArchiveVacancy(this.state.currentPage);
        }, 1000);
    }

    findAllActiveVacancy(currentPage) {
        setTimeout(() => {
            currentPage -= 1;

            axios
                .get(
                    'http://localhost:8081/rest/company/vacancy/findByCompanyId/?pageNumber=' +
                    currentPage +
                    '&pageSize=' +
                    this.state.pagePerPage +
                    '&id=' +
                    this.state.company.id
                )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({
                        activeVacancy: data.content,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        currentPage: data.number + 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    }
    findAllArchiveVacancy(currentPage) {
        setTimeout(() => {
            currentPage -= 1;

            axios
                .get(
                    'http://localhost:8081/rest/company/vacancy/findByCompanyIdArchive/?pageNumber=' +
                    currentPage +
                    '&pageSize=' +
                    this.state.pagePerPage +
                    '&id=' +
                    this.state.company.id
                )
                .then((response) => response.data)
                .then((data) => {
                    this.setState({
                        archiveVacancy: data.content,
                        totalPages: data.totalPages,
                        totalElements: data.totalElements,
                        currentPage: data.number + 1,
                    });
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 1000);
    }

    cancel() {
        this.props.history.push('/');
    }
    viewVacancy = (vacancyId) => {
        setTimeout(() => {
            this.props.history.push(
                `/view-vacancy-employer/${this.state.company.id}/${vacancyId}/${this.state.idEmployer}`
            );
        }, 1000);
    };
    viewVacancyUser = (vacancyId) => {
        setTimeout(() => {
            this.props.history.push(
                `/view-vacancy-user-employer/${vacancyId}`
            );
        }, 1000);
    };
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllActiveVacancy(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.pagePerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllActiveVacancy(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllActiveVacancy(this.state.currentPage - prevPage);
        }
    };
    addVacancy() {
        setTimeout(() => {
            this.props.history.push(
                `/create-vacancy/${this.state.company.id}/${this.state.idEmployer}`
            );
        }, 1000);
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.pagePerPage)
        ) {
            this.findAllActiveVacancy(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);

        this.findAllActiveVacancy(targetPage);

        this.setState({
            [event.target.name]: targetPage,
        });
    };
    render() {
        const { currentPage, totalPages } = this.state;

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
                                                    {
                                                        this.state.company.areaOfWork
                                                    }
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
                                                    {
                                                        this.state.company.phoneNumber
                                                    }
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
                                            <button
                                                className='btn btn-danger'
                                                onClick={this.cancel.bind(this)}
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
                                                defaultActiveKey='персональныеДанные'
                                                id='controlled-tab-example'
                                            >
                                                <Tab
                                                    eventKey='активныеВакансии'
                                                    title='Активные вакансии'
                                                >
                                                    <div>
                                                        <Card className={'border border-dark bg-dark text-white'}>
                                                            <Card.Header>
                                                                <div style={{ float: 'left' }}>
                                                                    <FontAwesomeIcon icon={faUsers} />
                                                                    Список активных вакансий
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Table bordered hover striped variant='dark'>
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Название вакансии:</td>
                                                                            <td>Необходимы опыт:</td>
                                                                            <td>Действие:</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.activeVacancy.map((vacancy) => (
                                                                            <tr key={vacancy.id}>
                                                                                <td>{vacancy.name}</td>
                                                                                <td>{vacancy.experience}</td>

                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.viewVacancy(vacancy.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Просмотреть вакансию
                                                                                    </button>
                                                                                </td>
                                                                            
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>

                                                                </Table>
                                                            </Card.Body>

                                                            <Card.Footer>
                                                                <div style={{ float: 'left' }}>
                                                                    Страница{currentPage} от {totalPages}
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
                                                        <hr />
                                                        <td>
                                                            <button
                                                                style={{ marginLeft: '10px' }}
                                                                onClick={() =>
                                                                    this.addVacancy()
                                                                }
                                                                className='btn btn-info'
                                                            >
                                                                {' '}
                                                                Добавить вакансию
                                                            </button>
                                                        </td>
                                                    </div>
                                                </Tab>

                                                <Tab
                                                    eventKey='вакансииВАрхиве'
                                                    title='Вакансии в архиве'
                                                >
                                                    <div>
                                                        <Card className={'border border-dark bg-dark text-white'}>
                                                            <Card.Header>
                                                                <div style={{ float: 'left' }}>
                                                                    <FontAwesomeIcon icon={faUsers} />
                                                                    Список вакансий в архиве
                                                                </div>
                                                            </Card.Header>
                                                            <Card.Body>
                                                                <Table bordered hover striped variant='dark'>
                                                                    <thead>
                                                                        <tr>
                                                                            <td>Название вакансии:</td>
                                                                            <td>Необходимы опыт:</td>

                                                                            <td>Действие:</td>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {this.state.archiveVacancy.map((vacancy) => (
                                                                            <tr key={vacancy.id}>
                                                                                <td>{vacancy.name}</td>
                                                                                <td>{vacancy.experience}</td>

                                                                                <td>
                                                                                    <button
                                                                                        style={{ marginLeft: '10px' }}
                                                                                        onClick={() =>
                                                                                            this.viewVacancy(vacancy.id)
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        {' '}
                                                                                        Просмотреть вакансию
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </Table>
                                                            </Card.Body>

                                                            <Card.Footer>
                                                                <div style={{ float: 'left' }}>
                                                                    Страница{currentPage} от {totalPages}
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
export default ViewCompanyForEmployerComponent;
