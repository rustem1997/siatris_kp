import React, { Component } from 'react';
import UserService from '../../services/user/UserService';
import UserInformationService from '../../services/user/UserInformationService ';
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

class UserProfile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.idUser,
            user: {},
            userInformation: {},
            customers: {},
            idUser: this.props.match.params.idUser,
            role: this.props.match.params.role,
            summary: [],
            resommendationEmployer: [],
            currentPage: 1,
            usersPerPage: 5,
            idEmployer: this.props.match.params.idEmployer,
        };
    }

    componentDidMount() {
        setTimeout(() => {

            UserService.getUserById(this.state.id).then((res) => {
                this.setState({ user: res.data });
            });

            this.getUserInformation();
            this.findAllSummaries(this.state.currentPage);
            this.findAllRecommendations(this.state.currentPage);
        }, 1000);
    }
    getUserInformation() {
        setTimeout(() => {
            UserInformationService.getUserInformationByUserId(
                this.state.user.id
            ).then((res) => {
                this.setState({ userInformation: res.data });
            });
        }, 1000);
    }
    findAllRecommendations(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/user/recommendation/findByRecommendationsId/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.usersPerPage +
                '&id=' +
                this.state.id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    resommendationEmployer: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    findAllSummaries(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/user/summary/findBySummaryIdUser/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.usersPerPage +
                '&id=' +
                this.state.id

            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    summary: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    viewSummary = (summaryId) => {
        setTimeout(() => {

            this.props.history.push(
                `/view-summary/${summaryId}/${this.state.id}/${this.state.role}`
            );
        }, 1000);
    };
    addRecommendation = () => {
        setTimeout(() => {
            this.props.history.push(
                `/create-recommendation/${this.state.idUser}/${this.state.idEmployer}`
            );
        }, 1000);
    };
    cancel() {

    }
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
                                                    src={`data:image/*;base64,${this.state.userInformation.accountImage}`}
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
                                                        Фамилие пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.surname}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Имя пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.name}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Почта пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.email}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className='row'>
                                                <div className='col-sm-3'>
                                                    <h6 className='mb-0'>
                                                        Время регистрации
                                                        пользователя
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.createAt}
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
                                    <Container className='card mb-3'>
                                        <div className='card-body'>
                                            <Row>
                                                <Col>
                                                    <Tabs
                                                        defaultActiveKey='данныеПользователя'
                                                        id='controlled-tab-example'
                                                    >
                                                        <Tab
                                                            eventKey='данныеПользователя'
                                                            title='Данные Пользователя'
                                                        >
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <br />
                                                                    <h6 className='mb-0'>
                                                                        Пол
                                                                        пользователя:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    <br />
                                                                    {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .genre
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Возраст
                                                                        пользователя:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .age
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Номер
                                                                        телефона
                                                                        пользователя
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .userInformation
                                                                            .phoneNumber
                                                                    }
                                                                </div>
                                                            </div>
                                                        </Tab>

                                                        <Tab
                                                            eventKey='резюме'
                                                            title='Резюме'
                                                        >
                                                            <Card
                                                                className={
                                                                    'border border-dark bg-dark text-white'
                                                                }
                                                            >
                                                                <Card.Header>
                                                                    <div
                                                                        style={{
                                                                            float: 'left',
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faUsers
                                                                            }
                                                                        />
                                                                        Список
                                                                        резюме
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <Table
                                                                        bordered
                                                                        hover
                                                                        striped
                                                                        variant='dark'
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <td>
                                                                                    Должность:
                                                                                </td>
                                                                                <td>
                                                                                    Умение:
                                                                                </td>
                                                                                <td>
                                                                                    Про
                                                                                    работу:
                                                                                </td>

                                                                                <td>
                                                                                    Действие:
                                                                                </td>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {this.state.summary.map(
                                                                                (
                                                                                    summarS
                                                                                ) => (
                                                                                    <tr
                                                                                        key={
                                                                                            summarS.id
                                                                                        }
                                                                                    >
                                                                                        <td>
                                                                                            {
                                                                                                summarS.objective
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                summarS.skills
                                                                                            }
                                                                                        </td>
                                                                                        <td>
                                                                                            {
                                                                                                summarS.descriptions
                                                                                            }
                                                                                        </td>

                                                                                        <td>
                                                                                            <button
                                                                                                style={{
                                                                                                    marginLeft:
                                                                                                        '10px',
                                                                                                }}
                                                                                                onClick={() =>
                                                                                                    this.viewSummary(
                                                                                                        summarS.id
                                                                                                    )
                                                                                                }
                                                                                                className='btn btn-info'
                                                                                            >
                                                                                                {' '}
                                                                                                Просмотреть
                                                                                                резюме
                                                                                            </button>
                                                                                        </td>

                                                                                    </tr>
                                                                                )
                                                                            )}
                                                                        </tbody>
                                                                    </Table>
                                                                </Card.Body>
                                                                <Card.Footer>
                                                                    <div
                                                                        style={{
                                                                            float: 'left',
                                                                        }}
                                                                    >
                                                                        Страница
                                                                        {
                                                                            currentPage
                                                                        }{' '}
                                                                        от{' '}
                                                                        {
                                                                            totalPages
                                                                        }
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            float: 'right',
                                                                        }}
                                                                    >
                                                                        <InputGroup size='sm'>
                                                                            <InputGroup.Prepend>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            1
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .firstPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faFastBackward
                                                                                        }
                                                                                    />{' '}
                                                                                    Первая
                                                                                </Button>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            1
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .prevPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faStepBackward
                                                                                        }
                                                                                    />{' '}
                                                                                    Пред
                                                                                </Button>
                                                                            </InputGroup.Prepend>
                                                                            <FormControl
                                                                                className={
                                                                                    'page-num bg-dark'
                                                                                }
                                                                                name='currentPage'
                                                                                value={
                                                                                    currentPage
                                                                                }
                                                                                onChange={
                                                                                    this
                                                                                        .changePage
                                                                                }
                                                                            />
                                                                            <InputGroup.Append>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            totalPages
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .nextPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faStepForward
                                                                                        }
                                                                                    />{' '}
                                                                                    След
                                                                                </Button>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            totalPages
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .lastPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faFastForward
                                                                                        }
                                                                                    />{' '}
                                                                                    Последняя
                                                                                </Button>
                                                                            </InputGroup.Append>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Card.Footer>
                                                            </Card>
                                                        </Tab>

                                                        <Tab
                                                            eventKey='рекомендации'
                                                            title='Рекомендации'
                                                        >
                                                            <Card
                                                                className={
                                                                    'border border-dark bg-dark text-white'
                                                                }
                                                            >
                                                                <Card.Header>
                                                                    <div
                                                                        style={{
                                                                            float: 'left',
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faUsers
                                                                            }
                                                                        />
                                                                        Список
                                                                        рекомендаций
                                                                    </div>
                                                                </Card.Header>
                                                                <Card.Body>
                                                                    <Table
                                                                        bordered
                                                                        hover
                                                                        striped
                                                                        variant='dark'
                                                                    >
                                                                        <thead>
                                                                            <tr>
                                                                                <td>
                                                                                    Рекомендация:
                                                                                </td>

                                                                            </tr>
                                                                        </thead>

                                                                        <tbody>
                                                                            {this.state.resommendationEmployer.map(
                                                                                (
                                                                                    recomm
                                                                                ) => (
                                                                                    <tr
                                                                                        key={
                                                                                            recomm.id
                                                                                        }
                                                                                    >
                                                                                        <td>
                                                                                            <td>{recomm.descriptions}</td>
                                                                                        </td>

                                                                                    </tr>
                                                                                )
                                                                            )}
                                                                        </tbody>
                                                                    </Table>
                                                                </Card.Body>
                                                                <Card.Footer>
                                                                    <div
                                                                        style={{
                                                                            float: 'left',
                                                                        }}
                                                                    >
                                                                        Страница
                                                                        {
                                                                            currentPage
                                                                        }{' '}
                                                                        от{' '}
                                                                        {
                                                                            totalPages
                                                                        }
                                                                    </div>
                                                                    <div
                                                                        style={{
                                                                            float: 'right',
                                                                        }}
                                                                    >
                                                                        <InputGroup size='sm'>
                                                                            <InputGroup.Prepend>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            1
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .firstPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faFastBackward
                                                                                        }
                                                                                    />{' '}
                                                                                    Первая
                                                                                </Button>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            1
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .prevPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faStepBackward
                                                                                        }
                                                                                    />{' '}
                                                                                    Пред
                                                                                </Button>
                                                                            </InputGroup.Prepend>
                                                                            <FormControl
                                                                                className={
                                                                                    'page-num bg-dark'
                                                                                }
                                                                                name='currentPage'
                                                                                value={
                                                                                    currentPage
                                                                                }
                                                                                onChange={
                                                                                    this
                                                                                        .changePage
                                                                                }
                                                                            />
                                                                            <InputGroup.Append>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            totalPages
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .nextPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faStepForward
                                                                                        }
                                                                                    />{' '}
                                                                                    След
                                                                                </Button>
                                                                                <Button
                                                                                    type='button'
                                                                                    variant='outline-info'
                                                                                    disabled={
                                                                                        currentPage ===
                                                                                            totalPages
                                                                                            ? true
                                                                                            : false
                                                                                    }
                                                                                    onClick={
                                                                                        this
                                                                                            .lastPage
                                                                                    }
                                                                                >
                                                                                    <FontAwesomeIcon
                                                                                        icon={
                                                                                            faFastForward
                                                                                        }
                                                                                    />{' '}
                                                                                    Последняя
                                                                                </Button>
                                                                            </InputGroup.Append>
                                                                        </InputGroup>
                                                                    </div>
                                                                </Card.Footer>
                                                            </Card>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-12'>
                                                                    <button
                                                                        onClick={() => {
                                                                            this.addRecommendation();
                                                                        }}
                                                                        className='btn btn-info'
                                                                    >
                                                                        Добавить
                                                                        рекомендацию
                                                                    </button>
                                                                </div>
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
            </div>
        );
    }
}

export default UserProfile;
