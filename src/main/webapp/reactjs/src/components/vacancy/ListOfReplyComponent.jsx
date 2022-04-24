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
            idUser: this.props.match.params.idUser,

            company: {},
            vacancyCompany: {},
            datas: [],
            datasPassed: [],
            datasFailed: [],
            justCurrentPage: 1,
            justPerPage: 5,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            this.findAllVacancyUserByVacancyId(this.state.justCurrentPage);
            this.findAllVacancyUserPassedByVacancyId(this.state.justCurrentPage);
            this.findAllVacancyUserFailedByVacancyId(this.state.justCurrentPage);
        }, 1000);
    }
    findAllVacancyUserByVacancyId(currentPage) {
        currentPage -= 1;
        const id = this.state.idUser;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findVacancyOnWaitByUserId/?pageNumber=' +
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
        const id = this.state.idUser;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findVacancyPassedByUserId/?pageNumber=' +
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
        const id = this.state.idUser;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findVacancyFailedByUseryId/?pageNumber=' +
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
    viewVacancy = (vacancyId) => {
        setTimeout(() => {
            this.props.history.push(
                `/view-vacancy-user/${vacancyId}/${this.state.idUser}`
            );
        }, 1000);
    };

    back() {

        this.props.history.push(
            '/'
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
        this.props.history.push('/');
    };
    render() {
        const { justCurrentPage, totalPages, currentPage } = this.state;
        return (
            <div>
                <div className='container'>
                    <div className='main-body'>
                        <div>
                            <div className='row gutters-sm'>

                                <Container className='card mb-3'>
                                    <div className='card-body'>
                                        <Row>
                                            <Col>
                                                <Tabs
                                                    defaultActiveKey='hj'
                                                    id='controlled-tab-example'
                                                >
                                                    <Tab
                                                        eventKey='запросыВОжидании'
                                                        title='Запросы в ожидании'
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
                                                                                <th>Название</th>
                                                                                <th>Необходимый опыт</th>
                                                                               
                                                                                <td>Посмотреть вакансию:</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.datas.map((user) => (
                                                                                <tr key={user.id}>
                                                                                    <td>{user.name}</td>
                                                                                    <td>{user.experience}</td>

                                                                                    <td>
                                                                                        <button
                                                                                            style={{
                                                                                                marginLeft: '10px',
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                this.viewVacancy(user.id)
                                                                                            }
                                                                                            className='btn btn-info'
                                                                                        >
                                                                                            {' '}
                                                                                            Просмотр вакансии
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
                                                                                <th>Название</th>
                                                                                <th>Необходимый опыт</th>
                                                                              

                                                                                <td>Посмотреть вакансию:</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.datasPassed.map((user) => (
                                                                                <tr key={user.id}>
                                                                                    <td>{user.name}</td>
                                                                                    <td>{user.experience}</td>

                                                                                    <td>
                                                                                        <button
                                                                                            style={{
                                                                                                marginLeft: '10px',
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                this.viewVacancy(user.id)
                                                                                            }
                                                                                            className='btn btn-info'
                                                                                        >
                                                                                            {' '}
                                                                                            Просмотр вакансии
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
                                                                                <th>Название</th>
                                                                                <th>Необходимый опыт</th>
                                                                              

                                                                                <td>Посмотреть вакансию:</td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.datasFailed.map((user) => (
                                                                                <tr key={user.id}>
                                                                                    <td>{user.name}</td>
                                                                                    <td>{user.experience}</td>

                                                                                    <td>
                                                                                        <button
                                                                                            style={{
                                                                                                marginLeft: '10px',
                                                                                            }}
                                                                                            onClick={() =>
                                                                                                this.viewVacancy(user.id)
                                                                                            }
                                                                                            className='btn btn-info'
                                                                                        >
                                                                                            {' '}
                                                                                            Просмотр вакансии
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
            </div>


        );
    }
}

export default ViewVacancyCompany;