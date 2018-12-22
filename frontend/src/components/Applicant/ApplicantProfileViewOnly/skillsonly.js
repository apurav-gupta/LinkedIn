import React, {Component} from 'react';
import Card from "@material-ui/core/Card/Card";
import connect from "react-redux/es/connect/connect";
import {addSkills, editSkills} from "../../../actions/applicantActions";


class SkillsOnly extends Component {
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

                </div>
                <ul className="list-group list-group-flush">
                    <div className="mt-4">
                        {
                            this.skills.map((experience, index) => (
                                <li key={index} className="ml-5">
                                    <h4><strong>{experience}</strong>
                                     

                                    </h4>
                                    <hr/>

                                </li>
                            ))}
                    </div>
                </ul>

            </Card>
        )
    }








}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {addSkills, editSkills})(SkillsOnly);