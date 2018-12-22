import Image from "react-bootstrap/es/Image";
import Card from "@material-ui/core/Card/Card";
import {Component} from "react";
import connect from "react-redux/es/connect/connect";
import {editSummary} from "../../../actions/recruiterActions";
import {getPhoto, postPhotos} from "../../../actions/photoActions";
import * as Validate from "../../../validation/ValidationUtil";

var React = require('react');

class Summary extends Component {
    added = false;
    imageBase = [];

    constructor(props) {
        super(props);

        this.state = {
            adding: false,
            editing: false,
            name: "",
            city: "",
            state: "",
            companyName: "",
            profileImage: "",
            zipcode: "",
            gender: ""
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

    handleDrop = files => {
        // Push all the axios request promise into a single array
        // Initial FormData
        const formData = new FormData();
        formData.append("file", files);
        this.uid = new Date().valueOf();
        formData.append("imagename", files.name);
        this.state.profileImage = files.name;

        console.log(files.name);


        formData.append("timestamp", (Date.now() / 1000) | 0);

        this.props.postPhotos(formData);
    };

    handleGetPhoto = (imgName) => {
        this.props.getPhoto(imgName);
        this.getPhoto = true;
        if(this.edit){
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
                companyName: this.props.companyName,
                zipcode: this.props.zipcode,
                gender: this.props.gender
            };
            this.sum = this.sumProp;
        }

        var
            name = this.sum.firstName + " " + this.sum.lastName;
        var
            cityState = this.sum.city + ", " + this.sum.state;
        var
            companyName = this.sum.companyName;

        return (
            <Card className="w-75 p-3 ml-5" style={{overflow: "auto", height: "auto"}}>

                <div>

                    <div style={{
                        alignItems: 'center',
                        width: "100px",
                        height: "100px",
                        margin: "1px",
                        overflow: "auto"
                    }}>


                        <Image src={this.imageBase[0]} rounded/>
                    </div>
                </div>


                <h3 className="ml-4">{name}
                    <button className="btn btn-default" onClick={this.handleClickEdit.bind(this)}><span
                        className="glyphicon glyphicon-edit" title="Edit Experience">
			                </span>
                    </button>
                </h3>

                <label className="ml-4">{cityState}</label>

                <h5 className="ml-4">{companyName}</h5>


                <h5 className="ml-4" >Zipcode  - {this.sum.zipcode}</h5>

                <h5 className="ml-4" >Gender - {this.sum.gender}</h5>

                <hr/>


            </Card>


        )
    }

    editingSummary() {
        var
            name = this.sum.firstName + " " + this.sum.lastName;
        var
            cityState = this.sum.city + ", " + this.sum.state;
        var
            companyName = this.sum.companyName;


        return (
            <Card className="w-75 p-3 ml-5">
                <div className="col-md-12">

                    <div className="col-md-8">

                        <div style={{margin: "1px"}}>

                            <div style={{
                                alignItems: 'center',
                                width: "100px",
                                height: "100px",
                                overflow: "auto",
                                padding: "1px",
                                backgroundColor: "white"

                            }}>
                                <Image src={this.imageBase[0]} circle/>


                            </div>
                            <input type="file" onChange={(e) => this.handleDrop(e.target.files[0])}/>


                            <input className="ml-4" ref="firstName" defaultValue={this.sum.firstName} placeholder="First Name"/>
                            <input className="ml-4" ref="lastName" defaultValue={this.sum.lastName} placeholder="Last Name"/>

                            <input className="ml-4" ref="city" defaultValue={this.sum.city} placeholder="City"/>
                            <div className="form-group">
                                <label htmlFor="inputState">State</label>
                                <select id="inputState" ref="state" className="form-control" name="diversity"
                                >

                                    <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option>
                                </select>
                            </div>

                            <hr/>

                            <input className="ml-4" ref="zipcode" defaultValue={this.sum.zipcode} placeholder="Zipcode"/>
                            <hr/>
                            <input className="ml-4" ref="gender" defaultValue={this.sum.gender} placeholder="Gender"/>

                            <hr/>

                            <input className="ml-4" ref="companyName" defaultValue={companyName} placeholder="Company"/>

                            <center>
                                <div className="btn btn-toolbar">
                                    <button className="btn btn-primary"
                                            onClick={this.handleClickSaveEdit.bind(this)}>Save
                                    </button>
                                    <button className="btn btn-default"
                                            onClick={this.handleClickCancel.bind(this)}>Cancel
                                    </button>

                                </div>
                            </center>
                            <br/>

                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    handleClickEdit(index) {
        this.setState({editing: true, indexToEdit: index});
    }

    handleClickSaveEdit() {
        var experience = {
            firstName: this.refs.firstName.value,
            lastName: this.refs.lastName.value,
            city: this.refs.city.value,
            state: this.refs.state.value,
            companyName: this.refs.companyName.value,
            profileImage: this.state.profileImage,
            zipcode:this.refs.zipcode.value,
            gender:this.refs.gender.value,
        };

        let valid = Validate.editProfile(experience);
        if(valid === '') {
            var body = {
                summary: experience,
                email: this.props.applicantEmail
            };

            this.props.editSummary(body);
            this.edit = true;
        }else {
            alert("Please enter valid zipcode");
        }




    }

    handleClickCancel() {
        this.setState({editing: false});
        this.setState({adding: false});
    }

}

const mapStateToProps = (state) => ({
    applicantErrorReducer: state.applicantErrorReducer,
    applicantProfile: state.applicantProfile,
    photos: state.photos
});

export default connect(mapStateToProps, {editSummary, postPhotos, getPhoto})(Summary);


