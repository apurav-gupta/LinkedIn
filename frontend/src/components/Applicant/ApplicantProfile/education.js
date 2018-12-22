import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Card from "@material-ui/core/Card/Card";
import moment from "moment";
import connect from "react-redux/es/connect/connect";
import {addEducation, addExperience, editEducation, editExperience} from "../../../actions/applicantActions";

class Education extends Component {
    added = false;

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            degreeLevel: "",
            school: "",
            location: "",
            from: "",
            to: "",
            indexToEdit: 0

        }
    }


    render() {
        var show;

        if (this.state.adding) {
            show = this.addingExperience();
        } else if (this.state.editing) {
            show = this.editingExperience();
        } else {
            show = this.defaultExperience();
        }

        return (
            <div>
                {show}
                <hr></hr>
            </div>
        )

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.applicantProfile.education.length > 0) {
            this.eduAdded = nextProps.applicantProfile.education;
            this.setState({editing: false, adding: false});
            this.added = true;
        }

    }

    handleClickAdd() {
        this.setState({
            adding: true
        })
    }

    defaultExperience() {
        if (this.added) {
            this.edu = this.eduAdded;
            this.added = false;
        } else {
            this.edu = this.props.education;
        }

        return (
            <Card className="w-75 p-3 ml-5">
                <div className="card-header">
                    Education
                    <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                        className="glyphicon glyphicon-plus" title="Add Education"></span>
                    </button>
                </div>
                <ul className="list-group list-group-flush">
                    <div className="mt-4">
                        {this.edu.map((experience, index) => (
                            <li key={index} className="ml-5">
                                <h4><strong>{experience.degreeLevel}</strong>
                                    <button className="btn btn-default ml-5"
                                            onClick={this.handleClickEdit.bind(this, index)}>
                                        <span className="glyphicon glyphicon-pencil" title="Edit Education"></span>
                                    </button>
                                </h4>
                                <h5>{experience.school}</h5>
                                <h6>{experience.location}</h6>
                                <h6>{moment(experience.from).format("YYYY")} - {moment(experience.to).format("YYYY")}</h6>
                                <h6>
                                <pre style={{
                                    margin: "5px 0px 0px 0px",
                                    fontFamily: "helvetica",
                                    border: "none",
                                    width: "100%",
                                    background: "none",
                                    whiteSpace: "pre-wrap"
                                }}>{experience.description}</pre>
                                    <hr/>
                                </h6>
                            </li>
                        ))}
                    </div>
                </ul>
            </Card>
        )
    }

    editingExperience() {
        var indexedExperience = this.edu[this.state.indexToEdit];

        return (
            <Card className="w-75 p-3 ml-5">
                <div className="col-md-12">
                    <div className="card-header">
                        Education
                        <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                            className="glyphicon glyphicon-plus" title="Add Experience">
			                </span>
                        </button>
                    </div>
                    <div className="col-md-8">
                        <input type="text" ref="degreeLevel" className="form-control"
                               defaultValue={indexedExperience.degreeLevel} placeholder="Degree Level"
                        /><br/>
                        <input type="text" ref="school" className="form-control"
                               defaultValue={indexedExperience.school} placeholder="School"
                        /><br/>
                        <input type="text" ref="location" className="form-control"
                               defaultValue={indexedExperience.location} placeholder="Location"
                               onChange={(e) => {
                                   this.setState({[e.target.name]: e.target.value})
                               }}/><br/>
                        <div className="input-group">
                            <input type="year" ref="from" className="form-control"
                                   defaultValue={moment(indexedExperience.from).format("YYYY")}
                            placeholder="From Year"/>
                            <span className="input-group-addon">-</span>
                            <input type="year" ref="to" className="form-control"
                                   defaultValue={moment(indexedExperience.to).format("YYYY")}
                            placeholder="To Year"/>
                        </div>
                        <br/>
                        <center>
                            <div className="btn btn-toolbar">
                                <button className="btn btn-primary" onClick={this.handleClickSaveEdit.bind(this)}>Save
                                </button>
                                <button className="btn btn-default"
                                        onClick={this.handleClickCancel.bind(this)}>Cancel
                                </button>

                            </div>
                        </center>
                        <br/>
                    </div>
                </div>
            </Card>
        )
    }

    handleClickEdit(index) {
        this.setState({editing: true, indexToEdit: index});
    }

    addingExperience() {
        return (
            <Card className="w-75 p-3 ml-5">

                <div className="col-md-12">
                    <div className="card-header">
                        Education
                        <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                            className="glyphicon glyphicon-plus" title="Add Education">
        </span>
                        </button>
                    </div>

                    <div className="col-md-8">
                        <input type="text" name="degreeLevel" className="form-control" placeholder="Degree Level"
                               onChange={(e) => {
                                   this.setState({[e.target.name]: e.target.value})
                               }}/><br/>
                        <input type="text" name="school" className="form-control" placeholder="School"
                               onChange={(e) => {
                                   this.setState({[e.target.name]: e.target.value})
                               }}/><br/>
                        <input type="text" name="location" className="form-control" placeholder="Location"
                               onChange={(e) => {
                                   this.setState({[e.target.name]: e.target.value})
                               }}/><br/>
                        <div className="input-group">
                            <input type="year" name="from" className="form-control" onChange={(e) => {
                                this.setState({[e.target.name]: e.target.value})
                            }}/>
                            <span className="input-group-addon">-</span>
                            <input type="year" name="to" className="form-control" onChange={(e) => {
                                this.setState({[e.target.name]: e.target.value})
                            }}/>
                        </div>
                        <br/>
                        <center>
                            <div className="btn btn-toolbar">
                                <button className="btn btn-primary" onClick={this.handleClickSave.bind(this)}>Save
                                </button>
                                <button className="btn btn-default" onClick={this.handleClickCancel.bind(this)}>Cancel
                                </button>
                            </div>
                        </center>
                        <br/>
                    </div>
                </div>
            </Card>
        )
    }

    handleClickSaveEdit() {
        var education = {
            degreeLevel: this.refs.degreeLevel.value,
            school: this.refs.school.value,
            location: this.refs.location.value,
            from: this.refs.from.value,
            to: this.refs.to.value
        };

        this.edu[this.state.indexToEdit] = education;

        var body = {
            education: this.edu,
            email: this.props.applicantEmail
        };

        this.props.editEducation(body);

    }

    handleClickSave() {
        var education = {
            degreeLevel: this.state.degreeLevel,
            school: this.state.school,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to
        };
        var body = {
            education: education,
            email: this.props.applicantEmail
        };

        this.props.addEducation(body);

    }


    handleClickCancel() {
        this.setState({editing: false});
        this.setState({adding: false});
    }


}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {addEducation, editEducation})(Education);