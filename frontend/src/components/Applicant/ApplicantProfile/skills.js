import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import connect from "react-redux/es/connect/connect";
import {addSkills, editSkills} from "../../../actions/applicantActions";


class Skills extends Component {
    added = false;

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            skills: "",
            indexToEdit: 0

        }
    }

    render() {
        var show;

        if (this.state.adding) {
            show = this.addingSkills();
        } else if (this.state.editing) {
            show = this.editingSkills();
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
        if (nextProps.applicantProfile.skills.length > 0) {
            this.skillsAdded = nextProps.applicantProfile.skills;
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
            this.skills = this.skillsAdded;
            this.added = false;
        } else {
            this.skills = this.props.skills;
        }
        return (
            <Card className="w-75 p-3 ml-5">

                <div className="card-header">
                    Skills
                    <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                        className="glyphicon glyphicon-plus" title="Add Experience">
			</span>
                    </button>
                </div>
                <ul className="list-group list-group-flush">
                    <div className="mt-4">
                        {
                            this.skills.map((experience, index) => (
                                <li key={index} className="ml-5">
                                    <h4><strong>{experience}</strong>
                                        <button className="btn btn-default ml-4"
                                                onClick={this.handleClickEdit.bind(this, index)}>
                                            <span className="glyphicon glyphicon-pencil" title="Edit Skills"></span>
                                        </button>
                                    </h4>
                                    <hr/>

                                </li>
                            ))}
                    </div>
                </ul>

            </Card>
        )
    }

    editingSkills() {
        var indexedExperience = this.skills[this.state.indexToEdit];

        return (
            <Card className="w-75 p-3 ml-5">
                <div className="col-md-12">
                    <div className="card-header">
                        Skills
                        <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                            className="glyphicon glyphicon-plus" title="Add Skills">
			                </span>
                        </button>
                    </div>
                    <div className="col-md-8">
                        <input type="text" ref="skills" className="form-control"
                               defaultValue={indexedExperience}
                        /><br/>

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

    addingSkills() {
        return (
            <Card className="w-75 p-3 ml-5">

                <div className="col-md-12">
                    <div className="card-header">
                        Skills
                        <button className="btn btn-default" onClick={this.handleClickAdd.bind(this)}><span
                            className="glyphicon glyphicon-plus" title="Add Experience">
        </span>
                        </button>
                    </div>

                    <div className="col-md-8">
                        <input type="text" name="skills" className="form-control" placeholder="Skills"
                               onChange={(e) => {
                                   this.setState({[e.target.name]: e.target.value})
                               }}/><br/>
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


        this.skills[this.state.indexToEdit] = this.refs.skills.value;

        var body = {
            skills: this.skills,
            email: this.props.applicantEmail
        };

        this.props.editSkills(body);

    }

    handleClickSave() {

        var body = {
            skills: this.state.skills,
            email: this.props.applicantEmail
        };

        this.props.addSkills(body);

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

export default connect(mapStateToProps, {addSkills, editSkills})(Skills);