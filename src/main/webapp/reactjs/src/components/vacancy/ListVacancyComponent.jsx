import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
    faSearch,
    faTimes,
} from '@fortawesome/free-solid-svg-icons';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class ListVacancyComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            vacancy: [],
            search: '',
            currentPage: 1,
            justPerPage: 6,
        };
    }
    findAllVacancy(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/findAll/?pageNumber=' +
                    currentPage +
                    '&pageSize=' +
                    this.state.justPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    vacancy: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    componentDidMount = () => {
        this.findAllVacancy(this.state.currentPage);
    };
    searchData = (currentPage) => {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/search/' +
                    this.state.search +
                    '?page=' +
                    currentPage +
                    '&size=' +
                    this.state.justPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    vacancy: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    };
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllVacancy(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.justPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllVacancy(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllVacancy(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.justPerPage)
        ) {
            this.findAllVacancy(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllVacancy(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage,
        });
    };
    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancelSearch = () => {
        this.setState({ search: '' });
        this.findAllVacancy(this.state.currentPage);
    };
    viewVacancy = (vacancyId) => {
        setTimeout(() => {
            this.props.history.push(
                `/view-vacancy-user/${vacancyId}/${this.state.id}`
            );
        }, 1000);
    };
    render() {
        const { currentPage, totalPages, search } = this.state;

        return (
            <Container>
                  <Card className={'border border-dark bg-dark text-white car'}>
                  <Card.Header>
                    <div style={{ float: 'left' }}>
                        <FontAwesomeIcon icon={faUsers} />
                        Список вакансий
                  </div>
                  <div style={{ float: 'right' }}>
                            <InputGroup size='sm'>
                                <FormControl
                                    placeholder='Поиск организации'
                                    name='search'
                                    value={search}
                                    className={'info-border bg-dark text-white'}
                                    onChange={this.searchChange}
                                />
                                <InputGroup.Append>
                                    <Button
                                        size='sm'
                                        variant='outline-info'
                                        type='button'
                                        onClick={this.searchData}
                                    >
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    <Button
                                        size='sm'
                                        variant='outline-danger'
                                        type='button'
                                        onClick={this.cancelSearch}
                                    >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <th>Название</th>
                                    <th>Необходимый опыт</th>
                                    <td>Перейти</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.vacancy.map((vac) => (
                                    <tr key={vac.id}>
                                       
                                        <td>{vac.name}</td>
                                        <td>{vac.experience}</td>
                                        <td>
                                            <button
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                                onClick={() =>
                                                    this.viewVacancy(vac.id)
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
                       
            </Container>
        );
    }
}

export default ListVacancyComponent;
