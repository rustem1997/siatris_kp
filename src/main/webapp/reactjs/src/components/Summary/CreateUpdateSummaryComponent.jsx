import React, { Component } from 'react';
import SummaryService from '../../services/summary/SummaryService';

class CreateUserSummaryComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            sumaryId: this.props.match.params.summaryId,
            objective: '',
            education: '',
            workExperience: '',
            skills: '',
            descriptions: '',
            reasonForApplying: '',
            linkedin: '',
            github: '',
            userInformation: {},
            user: {},
            idUser: this.props.match.params.idUser,

            role: this.props.match.params.role,
        };
        this.saveSummary = this.saveSummary.bind(this);
    }
    componentDidMount = () => {
        const id = this.props.match.params.summaryId;
        console.log('id 1  => ' + id);
        console.log('id 2  => ' + this.state.sumaryId);

        if (id) {
            this.findByIdSummary(id);
        }
    };
    findByIdSummary = (id) => {
        console.log('id 1  => ' + id);

        setTimeout(() => {
            SummaryService.getSummaryBySummaryId(id).then((res) => {
                let summary = res.data;

                if (summary != null) {
                    this.setState({
                        objective: summary.objective,
                        education: summary.education,
                        workExperience: summary.workExperience,
                        skills: summary.skills,
                        descriptions: summary.descriptions,
                        reasonForApplying: summary.reasonForApplying,
                        linkedin: summary.linkedin,
                        github: summary.github,
                    });
                }
            });
        }, 1000);
    };

    summaryChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    saveSummary = (e) => {
        e.preventDefault();
        const userId = this.state.idUser;
        let summary = {
            objective: this.state.objective,
            education: this.state.education,
            workExperience: this.state.workExperience,
            skills: this.state.skills,
            descriptions: this.state.descriptions,
            reasonForApplying: this.state.reasonForApplying,
            linkedin: this.state.linkedin,
            github: this.state.github,
        };

        console.log('summary => ' + JSON.stringify(summary));

        SummaryService.createSummary(userId, summary).then((res) => {
            this.props.history.push(
                `/profile/${this.state.idUser}/${this.state.role}`
            );
        });
    };
    updateSummary = (e) => {
        e.preventDefault();
        const sumaryId = this.state.sumaryId;
        let summary = {
            id: sumaryId,
            objective: this.state.objective,
            education: this.state.education,
            workExperience: this.state.workExperience,
            skills: this.state.skills,
            descriptions: this.state.descriptions,
            reasonForApplying: this.state.reasonForApplying,
            linkedin: this.state.linkedin,
            github: this.state.github,
        };

        console.log('summary => ' + JSON.stringify(summary));
        SummaryService.updateSummary(summary).then((res) => {
            this.props.history.push(
                `/profile/${this.state.idUser}/${this.state.role}`
            );
        });
    };
    cancel() {
        this.props.history.push(
            `/profile/${this.state.idUser}/${this.state.role}`
        );
    }

    render() {
        return (
            <div>
                <div className='container'>
                    <div className='row'>
                        <div className='card col-md-6 offset-md-3 offset-md-3'>
                            <h3 className='text-center'>
                                {this.state.sumaryId
                                    ? '?????????????????? ????????????'
                                    : '???????????????????? ????????????'}
                            </h3>
                            <div className='card-body'>
                                <form
                                    onSubmit={
                                        this.state.center
                                            ? this.updateSummary
                                            : this.saveSummary
                                    }
                                >
                                    <div className='form-group'>
                                        <label>???? ?????????? ??????????????????:</label>
                                        <input
                                            placeholder='??????????????????:'
                                            name='objective'
                                            type='text'
                                            className='form-control'
                                            value={this.state.age}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>??????e ??????????????????????(??????????):</label>
                                        <input
                                            placeholder='??????????????????????:'
                                            name='education'
                                            type='text'
                                            className='form-control'
                                            value={this.state.education}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>
                                            ???????? ????????????(???????? ???? ????????????????
                                            ???????????????? ?? ???????????????? ??????????????
                                            ??????????????????):
                                        </label>
                                        <input
                                            placeholder='???????? ????????????:'
                                            name='workExperience'
                                            type='text'
                                            className='form-control'
                                            value={this.state.workExperience}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>
                                            ???????? ????????????(Spring,Java,JS):
                                        </label>
                                        <input
                                            placeholder='?????? ????????????:'
                                            name='skills'
                                            type='text'
                                            className='form-control'
                                            value={this.state.skills}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>?????????????? ?? ????????:</label>
                                        <input
                                            placeholder='?????????????? ?? ????????:'
                                            name='descriptions'
                                            type='text'
                                            className='form-control'
                                            value={this.state.descriptions}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>
                                            ???????????? ???? ???????????? ?????????? ???????????? ??????:
                                        </label>
                                        <input
                                            placeholder='??????????????:'
                                            name='reasonForApplying'
                                            type='text'
                                            className='form-control'
                                            value={this.state.reasonForApplying}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>?????? LinkedIn:</label>
                                        <input
                                            placeholder='???????????? ???? LinkedIn:'
                                            name='linkedin'
                                            type='text'
                                            className='form-control'
                                            value={this.state.linkedin}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <div className='form-group'>
                                        <label>?????? Github:</label>
                                        <input
                                            placeholder='???????????? ????  Github:'
                                            name='github'
                                            type='text'
                                            className='form-control'
                                            value={this.state.github}
                                            onChange={this.summaryChange}
                                        />
                                    </div>

                                    <br></br>
                                    <button
                                        className='btn btn-success'
                                        onClick={
                                            this.state.sumaryId
                                                ? this.updateSummary
                                                : this.saveSummary
                                        }
                                    >
                                        ??????????????????
                                    </button>
                                    <button
                                        className='btn btn-danger'
                                        onClick={this.cancel.bind(this)}
                                        style={{ marginLeft: '10px' }}
                                    >
                                        ??????????
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

export default CreateUserSummaryComponent;
