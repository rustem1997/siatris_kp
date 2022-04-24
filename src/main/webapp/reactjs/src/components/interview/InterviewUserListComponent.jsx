import React, { Component } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';

import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward
} from '@fortawesome/free-solid-svg-icons';
import { Card, Table, InputGroup, FormControl, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class InterviewUserListComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            Interview: [],
            currentPage: 1,
            justPerPage: 6,
        };
    }
    findAllInterview(currentPage) {
        currentPage -= 1;
        const id = this.state.id;
        axios
            .get(
                'http://localhost:8081/rest/company/vacancy/interview/findAllUserByInterview/?pageNumber=' +
                    currentPage +
                    '&pageSize=' +
                    this.state.justPerPage + 
                    '&id=' +
                    id
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    Interview: data.content,
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
        this.findAllInterview(this.state.currentPage);
    };

    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllInterview(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.justPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllInterview(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllInterview(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.justPerPage)
        ) {
            this.findAllInterview(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
      
            this.findAllInterview(targetPage);
      
    };
 
    viewInterview = (interviewId) => {
        setTimeout(() => {
            this.props.history.push(
                `/view-vacancy-user-interview/${interviewId}/${this.state.id}`
            );
        }, 1000);
    };
    render() {
        const { currentPage, totalPages } = this.state;

        return (
            <Container>
                  <Card className={'border border-dark bg-dark text-white car'}>
                  <Card.Header>
                    <div style={{ float: 'left' }}>
                        <FontAwesomeIcon icon={faUsers} />
                        Список интервью
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
                                {this.state.Interview.map((vac) => (
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
                       
            </Container>
        );
    }
}

export default InterviewUserListComponent;
