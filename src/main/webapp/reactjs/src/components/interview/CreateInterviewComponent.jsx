import React, { Component } from 'react';
import InterviewService from '../../services/interview/InterviewService';
import axios from 'axios';
class CreateInterviewComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            descriptions: '',
            idEmployer: this.props.match.params.idEmployer,
            idVacancy: this.props.match.params.idVacancy,
            idUser: this.props.match.params.idUser,
            companyId: this.props.match.params.idCompany,
            type: '',
            types: [],
          
        };
        this.saveInterview = this.saveInterview.bind(this);
    }
    componentDidMount = () => {
        this.findAllTypes();
    };
    findAllTypes = () => {
        setTimeout(() => {
            axios
                .get('http://localhost:8081/rest/company/vacancy/interview/status')
                .then((response) => {
                    let typesAll = response.data;
                    if (typesAll != null) {
                        this.setState({
                            types: [
                                { value: '', display: 'Select type' },
                            ].concat(
                                typesAll.map((type) => {
                                    return { value: type, display: type };
                                })
                            ),
                        });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        }, 100);
    };
    saveInterview = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        const idEmployer = this.state.idEmployer;

        const idVacancy = this.state.idVacancy;

        let interview = {
            type: this.state.type,
            descriptions: this.state.descriptions,
        };

        InterviewService.createInterview(userId, idVacancy,idEmployer,interview).then((res) => {
            this.props.history.push(
                `/view-vacancy-employer/${this.state.companyId}/${this.state.idVacancy}/${this.state.idEmployer}`
            );
        });
    };
    cancel() {
        this.props.history.push(
            `/view-vacancy-employer/${this.state.companyId}/${this.state.idVacancy}/${this.state.idEmployer}`
        );
    }
    userInformationChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                               
                                   Создание интервью
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                      
                                            this.saveSummary
                                    }
                                >
                                    <div className='form-group'>
                                        <label>На какую должность:</label>
                                        <input
                                            placeholder='Описание:'
                                            name='descriptions'
                                            type='text'
                                            className='form-control'
                                            value={this.state.descriptions}
                                            onChange={this.userInformationChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Тип интервью:</label>
                                        <select
                                            placeholder='Тип интервью:'
                                            name='type'
                                            type='select'
                                            className='form-control'
                                            value={this.state.type}
                                            onChange={
                                                this.userInformationChange
                                            }
                                        >
                                            {this.state.types.map((type) => (
                                                <option
                                                    key={type.value}
                                                    value={type.value}
                                                >
                                                    {type.display}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                          
                                                this.saveInterview
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

export default CreateInterviewComponent;
