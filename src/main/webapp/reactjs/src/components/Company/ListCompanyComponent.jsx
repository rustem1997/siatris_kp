import React, { Component } from 'react';
import axios from 'axios';
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
import './../../assets/css/Style.css';

class ListCompanyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            search: '',
            currentPage: 1,
            companiesPerPage: 5,
        };
    }

    componentDidMount = () => {
        this.findAllCompany(this.state.currentPage);
    };
    findAllCompany(currentPage) {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/company/getAllCompany?pageNumber=' +
                currentPage +
                '&pageSize=' +
                this.state.companiesPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    companies: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            })
            .catch((error) => {
                console.log(error);
            });
    }
    firstPage = () => {
        let firstPage = 1;
        if (this.state.currentPage > firstPage) {
            this.findAllCompany(firstPage);
        }
    };
    lastPage = () => {
        let condition = Math.ceil(
            this.state.totalElements / this.state.companiesPerPage
        );
        if (this.state.currentPage < condition) {
            this.findAllCompany(condition);
        }
    };
    prevPage = () => {
        let prevPage = 1;
        if (this.state.currentPage > prevPage) {
            this.findAllCompany(this.state.currentPage - prevPage);
        }
    };
    nextPage = () => {
        if (
            this.state.currentPage <
            Math.ceil(this.state.totalElements / this.state.companiesPerPage)
        ) {
            this.findAllCompany(this.state.currentPage + 1);
        }
    };
    changePage = (event) => {
        let targetPage = parseInt(event.target.value);
        if (this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllCars(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage,
        });
    };
    searchData = (currentPage) => {
        currentPage -= 1;
        axios
            .get(
                'http://localhost:8081/rest/company/search/' +
                this.state.search +
                '?page=' +
                currentPage +
                '&size=' +
                this.state.companiesPerPage
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    companies: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1,
                });
            });
    };
    searchChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancelSearch = () => {
        this.setState({ search: '' });
        this.findAllCompany(this.state.currentPage);
    };
    cancel = () => {
        this.props.history.push('/home');
    };
    viewCompany(companyId) {
        this.props.history.push(`/view-company/${companyId}`);
    }
    addCompany = () => {
        setTimeout(() => {
            this.props.history.push('/create-company');
        }, 1000);
    };
    render() {
        const { currentPage, totalPages, search } = this.state;
        return (
            <div>
                <Card className={'border border-dark bg-dark text-white car'}>
                    <Card.Header>
                        <div style={{ float: 'left' }}>
                            <FontAwesomeIcon icon={faUsers} />
                            Список организаций
                        </div>
                        <div style={{ float: 'right' }}>
                            <InputGroup size='sm'>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.addCompany}
                                >
                                    Добавить компанию
                                </button>

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
                                    <th>Image</th>
                                    <th>Наименование организации</th>
                                    <th>Область организации</th>
                                    <th>Количество работников организации</th>
                                    <td>Действия</td>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.companies.map((company) => (
                                    <tr key={company.id}>
                                        <td>
                                            {' '}
                                            <img
                                                className='img-thumbnail'
                                                src={`data:image/*;base64,${company.image}`}
                                                alt=''
                                            />
                                        </td>
                                        <td>{company.name}</td>
                                        <td>{company.areaOfWork}</td>
                                        <td>{company.countOfEmployee}</td>
                                        <td>
                                            <button
                                                style={{
                                                    marginLeft: '10px',
                                                }}
                                                onClick={() =>
                                                    this.viewCompany(company.id)
                                                }
                                                className='btn btn-info'
                                            >
                                                {' '}
                                                Просмотр компании
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
export default ListCompanyComponent;
