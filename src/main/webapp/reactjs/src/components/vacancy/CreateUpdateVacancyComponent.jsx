import React, { Component } from 'react';
import VacancyService from '../../services/vacancy/VacancyService';

class CreateUserInformationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idCompany: this.props.match.params.idCompany,
            idEmployer: this.props.match.params.idEmployer,
            vacancyId: this.props.match.params.vacancyId,
            role: this.props.match.params.role,
            name: '',
            expectation: '',
            conditions: '',
            experience: 0,
            description: '',
            statusVacansy: '',
        };
        this.saveVacancy = this.saveVacancy.bind(this);
    }
    componentDidMount = () => {
        const id = this.state.vacancyId;

        if (id) {
            this.findVacancyById(id);
        }
    };
    findVacancyById = (id) => {
        setTimeout(() => {
            VacancyService.getVacancyByVacancyId(
                id
            ).then((res) => {
                let vacancy = res.data;

                if (vacancy != null) {
                    this.setState({
                        name: vacancy.name,
                        expectation: vacancy.expectation,
                        conditions: vacancy.conditions,
                        experience: vacancy.experience,
                        description: vacancy.description
                    });
                }
            });
        }, 1000);
    };
   
    vacancyChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    saveVacancy = (e) => {
        e.preventDefault();
        const companyId = this.state.idCompany;
        let vacancy = {
            name: this.state.name,
            expectation: this.state.expectation,
            conditions: this.state.conditions,
            experience: this.state.experience,
            description: this.state.description,
        };

        console.log('vacancy => ' + JSON.stringify(vacancy));

        VacancyService.createVacancy(
            companyId,
            vacancy
        ).then((res) => {
            this.props.history.push(
                `/company/employer/${this.state.idEmployer}`
            );
        });
    };
    updateVacancy = (e) => {
        e.preventDefault();
        const vacancyId = this.state.vacancyId;
        let vacancy = {
            id: vacancyId,
            name: this.state.name,
            expectation: this.state.expectation,
            conditions: this.state.conditions,
            experience: this.state.experience,
            description: this.state.description,
        };

        console.log('vacancy => ' + JSON.stringify(vacancy));
        VacancyService.updateVacancy(vacancy).then(
            (res) => {
                this.props.history.push(
                    `/company/employer/${this.state.idEmployer}`
                );
            }
        );
    };
    cancel() {
        this.props.history.push(
            `/company/employer/${this.state.idEmployer}`
        );
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.vacancyId
                                    ? 'Изменение данных вакансии'
                                    : 'Добавление данных вакансии'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.vacancyId
                                            ? this.updateVacancy
                                            : this.saveVacancy
                                    }
                                >
                                 <div className='form-group'>
                                        <label>Название вакансии:</label>
                                        <input
                                            placeholder='Название вакансии:'
                                            name='name'
                                            className='form-control'
                                            value={this.state.name}
                                            onChange={
                                                this.vacancyChange
                                            }
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Ваши ожидания:</label>
                                        <input
                                            placeholder='Ваши ожидания от сотрудника:'
                                            name='expectation'
                                            className='form-control'
                                            value={this.state.expectation}
                                            onChange={
                                                this.vacancyChange
                                            }
                                        />
                                    </div> 

                                    <div className='form-group'>
                                        <label>Условие работы:</label>
                                        <input
                                            placeholder='условие:'
                                            name='conditions'
                                            className='form-control'
                                            value={this.state.conditions}
                                            onChange={
                                                this.vacancyChange
                                            }
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Необходимый опыт:</label>
                                        <input
                                            placeholder='опыт:'
                                            name='experience'
                                            type='number'
                                            className='form-control'
                                            value={this.state.experience}
                                            onChange={
                                                this.vacancyChange
                                            }
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Немного описания:</label>
                                        <input
                                            placeholder='описания:'
                                            name='description'
                                            className='form-control'
                                            value={this.state.description}
                                            onChange={
                                                this.vacancyChange
                                            }
                                        />
                                    </div>
                                
                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.vacancyId
                                                ? this.updateVacancy
                                                : this.saveVacancy
                                        }
                                    >
                                        Сохранить
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        Назад
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateUserInformationComponent;
