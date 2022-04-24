import React, { Component } from 'react';
import CompanyService from '../../services/company/CompanyService';

class CreateEmployerComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            idCompany: this.props.match.params.companyId,
            name: '',
            surname: '',
            email: '',
            password: '',
        };

        this.saveEmployerToCompany = this.saveEmployerToCompany.bind(this);
    }

    saveEmployerToCompany = (e) => {
        e.preventDefault();
      
        let user = {
            name: this.state.name,
            surname: this.state.surname,
            email: this.state.email,
            password: this.state.password,
        };

        CompanyService.addEmployerCompany(user, this.state.idCompany).then((res) => {
            this.props.history.push(
                `/view-company/${this.state.idCompany}`
            );
        });
        
    };
    userChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancel() {
        this.props.history.push(
            `/view-company/${this.state.idCompany}`
        );
    }
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>Изменение данных</h3>
                            <div className='card-body'>
                                <form id='contact-form' 
                                   onSubmit={
                                         this.saveEmployerToCompany
                                        
                                    }>
                                    <div className='form-group'>
                                        <label>Введите имя:</label>
                                        <input
                                            placeholder='Введите имя:'
                                            name='name'
                                            id='name'
                                            type='text'
                                            className='form-control'
                                            value={this.state.name}
                                            onChange={this.userChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Введите фамилию:</label>
                                        <input
                                            placeholder='Введите фамилию:'
                                            name='surname'
                                            className='form-control'
                                            value={this.state.surname}
                                            onChange={this.userChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>Введите email:</label>
                                        <input
                                            placeholder='Введите email:'
                                            name='email'
                                            id='name'
                                            type='text'
                                            className='form-control'
                                            value={this.state.email}
                                            onChange={this.userChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Введите пароль:</label>
                                        <input
                                            placeholder='Введите пароль:'
                                            name='password'
                                            className='form-control'
                                            value={this.state.password}
                                            onChange={this.userChange}
                                            required
                                        />
                                    </div>

                                    <br></br>
                                  
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                         this.saveEmployerToCompany
                                               
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

export default CreateEmployerComponent;
