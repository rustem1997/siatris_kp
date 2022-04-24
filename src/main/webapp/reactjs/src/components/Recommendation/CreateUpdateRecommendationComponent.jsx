import React, { Component } from 'react';
import RecommendationsService from '../../services/recommendations/RecommendationsService';

class CreateUpdateRecommendationComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recommendationId: this.props.match.params.idRecommendation,
            descriptions: '',
            userInformation: {},
            user: {},
            idUser: this.props.match.params.idUser,
            idEmployer: this.props.match.params.idEmployer,
            role: this.props.match.params.role,

        };
        this.saveRecommendation = this.saveRecommendation.bind(this);
    }
    componentDidMount = () => {
        const id = this.state.recommendationId;
        if (id) {
            this.findByIdRecommendation(id);
        }
    };
    findByIdRecommendation = (id) => {
      
        setTimeout(() => {
            RecommendationsService.getRecommendationByRecommendationId(id).then((res) => {
                let recommendation = res.data;

                if (recommendation != null) {
                    this.setState({
                        descriptions: recommendation.descriptions,
                    });
                }
            });
        }, 1000);
        console.log(this.state.descriptions);

    };

    recommendationChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    saveRecommendation = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        const employerId = this.state.idEmployer;
        let recommendation = {
            descriptions: this.state.descriptions,
        };

        console.log('recommendation => ' + JSON.stringify(recommendation));

        RecommendationsService.createRecommendation(userId, employerId, recommendation).then((res) => {
            this.props.history.push(
                `/user-profile-page/${this.state.idUser}/${this.state.idEmployer}`
            );
        });
    };
    updateRecommendation = (e) => {
        e.preventDefault();
        const recommendationId = this.state.recommendationId;
        let recommendation = {
            id: recommendationId,
            descriptions: this.state.descriptions,
        };
        RecommendationsService.updateRecommendation(recommendation).then((res) => {
            this.props.history.push(
                `/recommendations/${this.state.idEmployer}`
            );
        });
    };
    cancel() {
      
            this.props.history.push(
                `/recommendations/${this.state.idEmployer}`
            )
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.recommendationId
                                    ? 'Изменение рекомендации'
                                    : 'Добавление рекомендации'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.center
                                            ? this.updateRecommendation
                                            : this.saveRecommendation
                                    }
                                >
                                    <div className='form-group'>
                                        <label>Немного о себе:</label>
                                        <input
                                            placeholder='Оставьте отзыв(Как он работал, поведение, работа в команде):'
                                            name='descriptions'
                                            type='text'
                                            className='form-control'
                                            value={this.state.descriptions}
                                            onChange={this.recommendationChange}
                                        />
                                    </div>

                                    <br></br>

                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.recommendationId
                                                ? this.updateRecommendation
                                                : this.saveRecommendation
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

export default CreateUpdateRecommendationComponent;
