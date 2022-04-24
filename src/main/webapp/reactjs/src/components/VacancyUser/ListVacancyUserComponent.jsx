import React, { Component } from 'react';
import axios from 'axios';
import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward
} from '@fortawesome/free-solid-svg-icons';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './../../assets/css/Style.css';

class ListVacancyUserComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idVacancy: this.props.match.params.vacancyId,
            datas: [],
            currentPage: 1,
            justPerPage: 5,
        };
    }

    componentDidMount = () => {
        this.findAllVacancyUserByVacancyId(this.state.currentPage);
    };
    findAllVacancyUserByVacancyId(currentPage) {
        currentPage -= 1;
        console.log(this.state.idVacancy);
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findUserOnWaitByVacancyId?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage + 
                '&id=' +
                this.state.idVacancy
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
    viewUser(idUser) {
        this.props.history.push(`/user-profile-page/${idUser}`);
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
    viewCompany(companyId) {
        this.props.history.push(`/view-company/${companyId}`);
    }
    render() {
        const { currentPage, totalPages, search } = this.state;
        return (
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
        );
    }
}
export default ListVacancyUserComponent;
