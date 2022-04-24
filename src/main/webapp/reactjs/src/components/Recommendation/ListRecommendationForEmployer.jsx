import React, { Component } from 'react';
import axios from 'axios';
import {
    Card,
    Table,
    InputGroup,
    FormControl,
    Button,
} from 'react-bootstrap';
import {
    faUsers,
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import RecommendationsService from '../../services/recommendations/RecommendationsService';

class ListRecommendationForEmployer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.employerId,
            resommendationEmployer: [],
            currentPage: 1,
            justPerPage: 5,
        };
    }
    componentDidMount() {
        setTimeout(() => {
            this.findAllRecommendations(this.state.currentPage);
        }, 1000);
    }

    findAllRecommendations(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/user/recommendation/findByEmployerId/?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.justPerPage +
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
    viewRecommendation = (recommendationId) => {
      
            this.props.history.push(
                `/view-recommendation/${recommendationId}/${this.state.id}`
            );
      
    };
    deleteRecommendation = (recommendationId) => {
        setTimeout(() => {
            RecommendationsService.deleteRecommendation(recommendationId).then((res) => {
                this.setState({
                    resommendationEmployer: this.state.resommendationEmployer.filter(
                        (rec) => rec.id !== recommendationId
                    ),
                });
            });
        }, 1000);
    };
  
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllRecommendations(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.justPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllRecommendations(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllRecommendations(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.justPerPage)
        ) {
            this.findAllRecommendations(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
      
            this.findAllRecommendations(targetPage);
      
        this.setState({
            [event.target.name]: targetPage,
        });
    };
    render() {
        const { currentPage, totalPages } = this.state;

        return (


            <div>
                <Card className={'border border-dark bg-dark text-white'}>
                    <Card.Header>
                        <div style={{ float: 'left' }}>
                            <FontAwesomeIcon icon={faUsers} />
                            Список рекомендаций
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                        <thead>
                                <tr>
                                    <td>
                                        Рекомендация:
                                    </td>
                                    <td>
                                        Просмотреть:
                                    </td>
                                    <td>
                                        Удалить:
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
                                                <td>
                                                    <button
                                                        style={{
                                                            marginLeft:
                                                                '10px',
                                                        }}
                                                        onClick={() =>
                                                            this.viewRecommendation(
                                                                recomm.id
                                                            )
                                                        }
                                                        className='btn btn-info'
                                                    >
                                                        {' '}
                                                        Просмотреть
                                                        рекомендацию
                                                    </button>
                                                </td>
                                                <td>
                                                    <button
                                                        style={{
                                                            marginLeft:
                                                                '10px',
                                                        }}
                                                        onClick={() =>
                                                            this.deleteRecommendation(
                                                                recomm.id
                                                            )
                                                        }
                                                        className='btn btn-info'
                                                    >
                                                        {' '}
                                                        Удалить
                                                        рекомендацию
                                                    </button>
                                                </td>
                                          

                                        </tr>
                                    )
                                )}
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
        );

    }
}

export default ListRecommendationForEmployer;
