import Image from "react-bootstrap/es/Image";
import Card from "@material-ui/core/Card/Card";
import {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {editSummary} from "../../../actions/applicantActions";
import {getPhoto, postPhotos} from "../../../actions/photoActions";

var React = require('react');

class SummaryOnly extends Component {
    added = false;
    imageBase = [];
    stateSelect = "";
    resume = "";

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            name: "",
            city: "",
            state: "",
            profileSummary: "",
            profileImage: "",
            zipcode: "",
            gender: "",
            resume: ""
        };
        this.getPhoto = false;
        this.handleClicked = false;
        this.edit = false;


    }


    render() {
        var show;

        if (this.state.adding) {
            //   show = this.addingSummary();
        } else if (this.state.editing) {
            show = this.editingSummary();
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
        if (nextProps.applicantProfile.summary.firstName !== undefined && !this.handleClicked) {
            this.sumAdded = nextProps.applicantProfile.summary;
            this.setState({editing: false, adding: false});
            this.handleGetPhoto(this.sumAdded.profileImage);
            this.added = true;
        } else if (this.getPhoto) {
            let imagePreview = 'data:image/jpg;base64, ' + nextProps.photos.photo;
            this.imageBase.push(imagePreview);
            this.setState({
                imagePushed: true
            })
        } else if (nextProps.applicantProfile.summary.firstName == undefined && nextProps.profileImage !== "" && !this.getPhoto) {
            this.handleGetPhoto(nextProps.profileImage);
        }

    }



    handleGetPhoto = (imgName) => {
        this.props.getPhoto(imgName);
        this.getPhoto = true;
        if (this.edit) {
            this.handleClicked = true;
        }

    };


    defaultExperience() {
        if (this.added) {
            this.sum = this.sumAdded;
            this.added = false;
        } else {
            this.sumProp = {
                firstName: this.props.firstName,
                lastName: this.props.lastName,
                city: this.props.city,
                state: this.props.state,
                profileSummary: this.props.profileSummary,
                zipcode: this.props.zipcode,
                gender: this.props.gender,
                resume: this.props.resume
            };
            this.sum = this.sumProp;
        }

        var
            name = this.sum.firstName + " " + this.sum.lastName;
        var
            cityState = this.sum.city + ", " + this.sum.state;
        var
            profileSummary = this.sum.profileSummary;


        return (
            <Card className="w-75 p-3 ml-5" style={{overflow: "auto", height: "auto"}}>

                <div>

                    <div style={{
                        alignItems: 'center',
                        width: "200px",
                        height: "200px",
                        margin: "1px",
                        overflow: "auto"
                    }}>


                        <Image src={this.imageBase[0]} rounded/>
                    </div>
                </div>


                <h3 className="ml-4">{name}

                </h3>

                <label className="ml-4">{cityState}</label>

                <h5 className="ml-4">{profileSummary}</h5>

                <h5 className="ml-4">Zipcode - {this.sum.zipcode}</h5>

                <h5 className="ml-4">Gender - {this.sum.gender}</h5>

                <h5 className="ml-4">Resume - {this.sum.resume}</h5>

                <hr/>


            </Card>


        )
    }


}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile,
    photos: state.photos
});

export default connect(mapStateToProps, {editSummary, postPhotos, getPhoto})(SummaryOnly);


