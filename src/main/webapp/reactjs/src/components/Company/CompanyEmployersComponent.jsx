import React, { Component } from 'react';
import axios from 'axios';
import {
    faUsers,
} from '@fortawesome/free-solid-svg-icons';
import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './../../assets/css/Style.css';


class CompanyEmployersComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companyId: this.props.match.params.idCompany,
            companyEmployers: []
        };
        this.findAllEmployers();
    };
    findAllEmployers = () => {
        setTimeout(() => {
        axios
            .get(
                'http://localhost:8081/rest/company/all/employers/?id=' +
                this.state.companyId
            )
            .then((response) => response.data)
            .then((data) => {
                this.setState({
                    companyEmployers: data.content,
                });
            })
            .catch((error) => {
                console.log(error);
            });

            console.log(this.state.companyEmployers);
        }, 1000);
    }


    render() {
        return (
            <div>
                <Card className={'border border-dark bg-dark text-white car'}>
                    <Card.Header>
                        <div style={{ float: 'left' }}>
                            <FontAwesomeIcon icon={faUsers} />
                            Список организаций
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant='dark'>
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Наименование организации</th>
                                    
                                 
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.companyEmployers.map((company) => (
                                    <tr key={company.id}>
                                       
                                        <td>{company.name}</td>
                                        <td>{company.surname}</td>
                                      
                                       
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    </Card>
            </div>
        );
    }
}
export default CompanyEmployersComponent;
