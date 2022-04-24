import React, { Component } from 'react';
import CompanyService from '../../services/company/CompanyService';

class CreateUpdateCompanyComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyId: this.props.match.params.companyId,
            name: '',
            areaOfWork: '',
            phoneNumber: '',
            year: 0,
            countOfEmployee: '',
        };

        this.saveCompany = this.saveCompany.bind(this);
    }
    componentDidMount = () => {
        setTimeout(() => {
            if (this.state.companyId) {
                this.findCompanyById(this.state.companyId);
            }
        }, 300);
    };
    findCompanyById = (companyId) => {
        setTimeout(() => {
            CompanyService.getCompanyById(companyId).then((res) => {
                let company = res.data;
                if (company != null) {
                    this.setState({
                        name: company.name,
                        areaOfWork: company.areaOfWork,
                        phoneNumber: company.phoneNumber,
                        year: company.year,
                        countOfEmployee: company.countOfEmployee,
                    });
                }
            });
        }, 1000);
    };

    companyChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };
    cancel() {
        this.props.history.push('/companies');
    }
    saveCompany = (e) => {
        e.preventDefault();
        let company = {
            name: this.state.name,
            areaOfWork: this.state.areaOfWork,
            phoneNumber: this.state.phoneNumber,
            year: this.state.year,
            countOfEmployee: this.state.countOfEmployee,
        };
        console.log('company => ' + JSON.stringify(company));

        CompanyService.createCompany(company).then((res) => {
            this.props.history.push('/companies');
        });
    };
    updateCompany = (e) => {
        e.preventDefault();
        let company = {
            id: this.state.companyId,
            name: this.state.name,
            areaOfWork: this.state.areaOfWork,
            phoneNumber: this.state.phoneNumber,
            year: this.state.year,
            countOfEmployee: this.state.countOfEmployee,
        };
        console.log('company => ' + JSON.stringify(company));

        CompanyService.updateCompany(company).then((res) => {
            this.props.history.push(`/view-company/${this.state.companyId}`);
        });
    };
    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.companyId
                                    ? 'Обновить данные компании'
                                    : 'Добавить новый компании'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.companyId
                                            ? this.updateCompany
                                            : this.saveCompany
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Название комапнии:</label>
                                        <input
                                            placeholder='Название комапнии:'
                                            name='name'
                                            className='form-control'
                                            value={this.state.name}
                                            onChange={this.companyChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>
                                            Область в которой работает комапния
                                            :
                                        </label>
                                        <input
                                            placeholder='Область в которой работает комапния :'
                                            name='areaOfWork'
                                            className='form-control'
                                            value={this.state.areaOfWork}
                                            onChange={this.companyChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Контакты компании:</label>
                                        <input
                                            placeholder='Контакты компании :'
                                            name='phoneNumber'
                                            className='form-control'
                                            value={this.state.phoneNumber}
                                            onChange={this.companyChange}
                                            required
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>Год создание компании :</label>
                                        <input
                                            placeholder='Год создание компании  :'
                                            name='year'
                                            type='number'
                                            className='form-control'
                                            value={this.state.year}
                                            onChange={this.companyChange}
                                            required
                                        />
                                    </div>
                                    <div className='form-group'>
                                        <label>
                                            Количество работников в компании :
                                        </label>
                                        <input
                                            placeholder='Количество работников в компании :'
                                            name='countOfEmployee'
                                            type='number'
                                            className='form-control'
                                            value={this.state.countOfEmployee}
                                            onChange={this.companyChange}
                                            required
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.companyId
                                                ? this.updateCompany
                                                : this.saveCompany
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

export default CreateUpdateCompanyComponent;
