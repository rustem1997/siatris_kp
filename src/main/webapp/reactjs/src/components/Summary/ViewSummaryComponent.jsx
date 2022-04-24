import React, { Component } from 'react';
import UserService from '../../services/user/UserService';
import UserInformationService from '../../services/user/UserInformationService ';
import SummaryService from '../../services/summary/SummaryService';
import { Tabs, Tab, Row, Col, Container } from 'react-bootstrap';

class ViewSummaryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.idUser,
            role: this.props.match.params.role,
            summaryId: this.props.match.params.summaryId,
            user: {},
            userInformation: {},

            summary: {},
        };
    }

    componentDidMount() {

        setTimeout(() => {
            UserService.getUserById(this.state.id).then((res) => {
                this.setState({ user: res.data });
            });
            UserInformationService.getUserInformationByUserId(
                this.state.id
            ).then((res) => {
                this.setState({ userInformation: res.data });
            });

            SummaryService.getSummaryBySummaryId(this.state.summaryId).then(
                (res) => {
                    this.setState({ summary: res.data });
                }
            );
        }, 1000);
    }

    editUser = (idUser) => {
        let role = this.state.role;
        setTimeout(() => {
            this.props.history.push(`/update-user/${idUser}/${role}`);
        }, 1000);
    };
    addImageAccount = (idUserInformation) => {
        let idUser = this.state.id;
        let role = this.state.role;

        setTimeout(() => {
            this.props.history.push(
                `/create-account-image/${idUserInformation}/${idUser}/${role}`
            );
        }, 1000);
    };
    editUserInformation = (userInformationId) => {
        let role = this.state.role;

        setTimeout(() => {
            this.props.history.push(
                `/update-user-information/${userInformationId}/${this.state.id}/${role}`
            );
        }, 1000);
    };
    editSummary = (summaryId) => {
        setTimeout(() => {
            this.props.history.push(
                `/update-summary/${summaryId}/${this.state.id}/${this.state.role}`
            );
        }, 1000);
    };

    back() {
        if(this.state.role === undefined){
            this.props.history.push(
                `/user-profile-page/${this.state.id}`
            );
        }
        this.props.history.push('/');
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
                                                    src={`data:image/*;base64,${this.state.userInformation.accountImage}`}
                                                    alt=''
                                                />
                                                {this.state.role !== undefined ? (
                                                <div className='mt-3'>
                                                    {this.state.userInformation
                                                        .id ? (
                                                        <button
                                                            className='btn btn-primary push-right'
                                                            onClick={() =>
                                                                this.addImageAccount(
                                                                    this.state
                                                                        .userInformation
                                                                        .id
                                                                )
                                                            }
                                                            style={{
                                                                marginLeft:
                                                                    '10px',
                                                            }}
                                                        >
                                                            {this.state
                                                                .userInformation
                                                                .accountImage
                                                                ? 'Изменить'
                                                                : 'Добавить'}
                                                        </button>
                                                    ) : (
                                                        ''
                                                    )}
                                                </div>
                                                ) : '' }
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
                                                        Ваша фамилие
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
                                                        Ваша имя
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
                                                        Ваша почта
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
                                                        Аккаунт добавлен
                                                    </h6>
                                                </div>
                                                <div className='col-sm-9 text-secondary'>
                                                    {this.state.user.createAt}
                                                </div>
                                            </div>
                                            <hr />
                                            {this.state.role !== undefined ? (
                                            <div className='row'>
                                                <div className='col-sm-12'>
                                                    <button
                                                        onClick={() =>
                                                            this.editUser(
                                                                this.state.user
                                                                    .id
                                                            )
                                                        }
                                                        className='btn btn-info'
                                                    >
                                                        Изменить данные
                                                    </button>
                                                </div>
                                             
                                            </div>
                                               ) : (
                                                ''
                                            )}
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
                                                                        Ваш пол:
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
                                                                        Ваш
                                                                        возраст:
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
                                                            <hr />
                                                            {this.state.role !== undefined ? (
                                                            <div className='row'>
                                                                <div className='col-sm-12'>
                                                                    <button
                                                                        onClick={() => {
                                                                            this
                                                                                .state
                                                                                .userInformation
                                                                                .id
                                                                                ? this.editUserInformation(
                                                                                    this
                                                                                        .state
                                                                                        .userInformation
                                                                                        .id
                                                                                )
                                                                                : this.createUserInformation(
                                                                                    this
                                                                                        .state
                                                                                        .user
                                                                                        .id
                                                                                );
                                                                        }}
                                                                        className='btn btn-info'
                                                                    >
                                                                        {this
                                                                            .state
                                                                            .userInformation
                                                                            .id
                                                                            ? 'Изменить'
                                                                            : 'Добавить'}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                                ) : (
                                                                    ''
                                                                )}
                                                        </Tab>

                                                        <Tab
                                                            eventKey='резюме'
                                                            title='Резюме'
                                                        >
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        На
                                                                        каккую
                                                                        должность:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .objective
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Ваше
                                                                        образование(курсы,
                                                                        стажировки)
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .education
                                                                    }
                                                                </div>
                                                            </div>

                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Опыт
                                                                        работы:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .workExperience
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Ваши
                                                                        умения:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .skills
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        О себе
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .descriptions
                                                                    }
                                                                </div>
                                                            </div>

                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Причина
                                                                        по
                                                                        которой
                                                                        вы
                                                                        должны
                                                                        меня
                                                                        взять на
                                                                        работу:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .reasonForApplying
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Ваш
                                                                        Linkedin:
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .linkedin
                                                                    }
                                                                </div>
                                                            </div>
                                                            <hr />
                                                            <div className='row'>
                                                                <div className='col-sm-3'>
                                                                    <h6 className='mb-0'>
                                                                        Ваш
                                                                        Github
                                                                    </h6>
                                                                </div>
                                                                <div className='col-sm-9 text-secondary'>
                                                                    {
                                                                        this
                                                                            .state
                                                                            .summary
                                                                            .github
                                                                    }
                                                                </div>
                                                            </div>

                                                            <hr />
                                                            {this.state.role !== undefined ? (
                                                            <div className='row'>
                                                                <div className='col-sm-12'>
                                                                    <button
                                                                        onClick={() => {
                                                                            this.editSummary(
                                                                                this
                                                                                    .state
                                                                                    .summary
                                                                                    .id
                                                                            );
                                                                        }}
                                                                        className='btn btn-info'
                                                                    >
                                                                        Изменить
                                                                        резюме
                                                                    </button>
                                                                </div>
                                                            </div>
                                                                ) : (
                                                                    ''
                                                                )}

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

export default ViewSummaryComponent;
