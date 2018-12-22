import Card from "@material-ui/core/Card/Card";
import moment from "moment";
import {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {addExperience, editExperience} from "../../../actions/applicantActions";

var React = require('react');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;


class ExperienceOnly extends Component {
    added = false;

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            title: "",
            company: "",
            location: "",
            description: "",
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
        if (nextProps.applicantProfile.experience.length > 0) {
            this.expAdded = nextProps.applicantProfile.experience;
            this.setState({editing: false, adding: false});
            this.added = true;
        }

    }




    defaultExperience() {
        if (this.added) {
            this.exp = this.expAdded;
            this.added = false;
        } else {
            this.exp = this.props.experience;
        }
        return (
            <Card className="w-75 p-3 ml-5">

                <div className="card-header">
                    Experience

                </div>
                <ul className="list-group list-group-flush">
                    <div className="mt-4">
                        {this.exp.map((experience, index) => (
                            <li key={index} className="ml-5">
                                <h4><strong>{experience.title}</strong>

                                </h4>
                                <h5>{experience.company}</h5>
                                <h6>{moment(experience.from).format("YYYY")} - {moment(experience.to).format("YYYY")}</h6>
                                <h6>{experience.location}</h6>
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

export default connect(mapStateToProps, {addExperience, editExperience})(ExperienceOnly);