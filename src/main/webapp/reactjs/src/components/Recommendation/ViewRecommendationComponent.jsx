import React, { Component } from 'react';
import UserService from '../../services/user/UserService';
import UserInformationService from '../../services/user/UserInformationService ';
import RecommendationsService from '../../services/recommendations/RecommendationsService';
import {
    Tabs,
    Tab,
    Row,
    Col,
    Container,
} from 'react-bootstrap';
class ViewRecommendationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idRecommendation: this.props.match.params.idRecommendation,
            idUser: this.props.match.params.idUser,

            role: this.props.match.params.role,
            user: {},
            userInformation: {},
            recommentaion: {},
            idEmployer: this.props.match.params.idEmployer,
        };
    }

    componentDidMount() {
        setTimeout(() => {
            RecommendationsService.getRecommendationByRecommendationId(
                this.state.idRecommendation
            ).then((res) => {
                this.setState({ recommentaion: res.data });
            });

            this.getUserById();
            this.getUserInformation();
        }, 1000);
    }
    getUserById() {
        setTimeout(() => {
            UserService.getUserById(this.state.recommentaion.idUser).then((res) => {
                this.setState({ user: res.data });
            });
        }, 1000);
    }
    getUserInformation() {
        setTimeout(() => {
            UserInformationService.getUserInformationByUserId(
                this.state.recommentaion.idUser
            ).then((res) => {
                this.setState({ userInformation: res.data });
            });
        }, 1000);
    }

    updateRecommendation() {
        setTimeout(() => {
            this.props.history.push(
                `/update-recommendation/${this.state.idRecommendation}/${this.state.idEmployer}`
            );
        }, 1000);
    };
    back() {

        if (this.state.idEmployer !== undefined) {

            this.props.history.push(
                `/recommendations/${this.state.idEmployer}`
            );
        }

        if(this.state.role !== undefined){
            this.props.history.push(
                `/profile/${this.state.idUser}/${this.state.role}`
            );
        }
        
        if(this.state.role === undefined  && this.state.idEmployer === undefined){
            this.props.history.push(
                `/user-profile-page/${this.state.idUser}`
            );
        }
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
                                                            eventKey='рекомендации'
                                                            title='Рекомендации'
                                                        >
                                                            <div className='col-md-8'>
                                                                <div className='card mb-4'>
                                                                    <div className='card-body'>
                                                                        <div className='row'>
                                                                            <div className='col-sm-3'>
                                                                                <h6 className='mb-0'>
                                                                                    Ваше рекомендациия
                                                                                </h6>
                                                                            </div>
                                                                            <div className='col-sm-9 text-secondary'>
                                                                                {this.state.recommentaion.description}
                                                                            </div>
                                                                        </div>
                                                                        <hr />
                                                                        {this.state.role === 'ROLE_USER' ? (
                                                                            '') : (
                                                                            <div className='row'>
                                                                                <div className='col-sm-12'>
                                                                                    <button
                                                                                        onClick={() =>
                                                                                            this.updateRecommendation()
                                                                                        }
                                                                                        className='btn btn-info'
                                                                                    >
                                                                                        Изменить данные
                                                                                    </button>
                                                                                </div>
                                                                            </div>
                                                                        )}

                                                                    </div>
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

export default ViewRecommendationComponent;
