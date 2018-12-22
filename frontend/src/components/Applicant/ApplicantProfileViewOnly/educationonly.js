import React, {Component} from 'react';
import Paper from "@material-ui/core/Paper/Paper";
import Card from "@material-ui/core/Card/Card";
import moment from "moment";
import connect from "react-redux/es/connect/connect";
import {addEducation, addExperience, editEducation, editExperience} from "../../../actions/applicantActions";

class EducationOnly extends Component {
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

                </div>
                <ul className="list-group list-group-flush">
                    <div className="mt-4">
                        {this.edu.map((experience, index) => (
                            <li key={index} className="ml-5">
                                <h4><strong>{experience.degreeLevel}</strong>

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



}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile
});

export default connect(mapStateToProps, {addEducation, editEducation})(EducationOnly);