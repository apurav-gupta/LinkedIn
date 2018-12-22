import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import {CONSTANTS} from '../../../Constants';
import jwtDecode from 'jwt-decode';

var yLabels = {
  0: "Recruiter Login",
  2: "Applicant Login",
  4: "Applicant Profile",
  6: "Recruiter Profile",
  8: "Applicant Messages",
  10: "Recruiter Messages",
  12: "Signup",
  16: "Recruiter Dashboard",
  18: "Applicant Dashboard",
  20: "Recruiter Job Posting",
  22: "Job Details",
  24: "Job Search",
  26: "Recruiter Connections",
  28: "Applicant Connections",
  30 : "Job Apply",
  32 : "Recruiter Job Listing",
  34 : "Job List",
  36 : "Job Edit",
  38 : "Recruiter View Applications",
  40: "Recruiter Pending  Connections",
  42: "Applicant Pending Connections",
  44 : "Profile Search"



};

// const data = {
//   labels: ["2018-11-23 02:05", "2018-11-23 02:06", "2018-11-23 02:06", "2018-11-23 02:07", "2018-11-23 02:08", "2018-11-23 02:08", "2018-11-23 02:09"],
//   datasets: [
//     {
//       label: "ag@gmail.com",
//       fill: false,
//       lineTension: 0.5,
//       backgroundColor: "rgba(75,192,192,0.4)",
//       borderColor: "rgba(75,192,192,1)",
//       borderCapStyle: "square",
//       borderDash: [],
//       borderDashOffset: 0.0,
//       borderJoinStyle: "miter",
//       pointBorderColor: "rgba(75,192,192,1)",
//       pointBackgroundColor: "#fff",
//       pointBorderWidth: 1,
//       pointHoverRadius: 5,
//       pointHoverBackgroundColor: "rgba(75,192,192,1)",
//       pointHoverBorderColor: "rgba(220,220,220,1)",
//       pointHoverBorderWidth: 2,
//       pointRadius: 1,
//       pointHitRadius: 10,
//       steppedLine: true,
//       data: [12, 2, 4, 28, 24, 22, 2]
//     }
//   ]
// };
const options = {

  scales: {
    yAxes: [
      {
        ticks: {
          beginsAtZero: true,
          autoSkip: false,
          stepSize: 1,
          callback: function (value, index, values) {
           
            return yLabels[value];
            
          }
        }
      }
    ],
    xAxes: [{
      type: 'time',
      distribution: 'series'

    }]
  }

}
export default class UserTraceDashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
       recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      //recruiter: "recruiter13@gmail.com",
      user :"",
      chartData: {
        labels: [],
        datasets: [
          {
            label:"",
            fill: false,
            lineTension: 0.5,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderCapStyle: "square",
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: "miter",
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 10,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            pointHitRadius: 15,
            steppedLine: true,
            data: []
          }
        ]
      }
    }
    this.usernameSubmitHandler = this.usernameSubmitHandler.bind(this);
    this.valueChangeHandler= this.valueChangeHandler.bind(this);
  }
  usernameSubmitHandler(e){
    e.preventDefault();
    console.log("Username of applicant ", this.state.user);

    axios
    .get(
      `${CONSTANTS.BACKEND_URL}/recruiters/track/`+ this.state.user)
    .then(response => {
      console.log("Inside user trace   component",response.data);
      //console.log("Inside  user trace   component didmount",response.data.jobsList.data);
      var usertracked = this.state.user;
      var tempstate = {...this.state.chartData};
      tempstate.datasets[0].data = response.data.data;
      tempstate.labels = response.data.labels;
      console.log("Temp state in did mount User trace diagram",tempstate);

     this.setState({
       chartData : tempstate,
       user : usertracked
     })
      
     
    })
    
    .catch(function(error) {
      console.log("errored in component did mount User trace diagram");
      alert("No such user, Try again");
      console.log(error);
    });
  }
  valueChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };



  render() {
    return (
      <div>
        <div
          className="card"
          style={{
            borderRadius: "7px",
            margin: "5px"
          }}
        >
          <h4 style={{ textAlign: "center" }}>User Trace Diagram</h4>
          <form>
                    <div className="form-group col-2">
                        <label for="exampleFormControlInput1">Enter User Name:</label>
                        <input
                      type="text"
                      class="form-control"
                      placeholder="Username"
                      name="user"
                      onChange={this.valueChangeHandler}
                    />
                       
                    </div>
                    <div className="form-group">
                    <button class="btn btn-warning" onClick={this.usernameSubmitHandler} >Submit</button>
                    </div>

                    
          </form>
          <Line data={this.state.chartData} options={options} height={80}/>
        </div>
      </div>
    );
  }
}
