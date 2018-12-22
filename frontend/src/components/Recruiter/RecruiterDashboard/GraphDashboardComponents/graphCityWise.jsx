import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {CONSTANTS} from '../../../../Constants';
import jwtDecode from 'jwt-decode';
export default class GraphCityWiseComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      // recruiter: "recruiter13@gmail.com",
      chartData: {
        labels: [],
        datasets: [
          {
            
            backgroundColor: 'rgba(106,183,255,0.6)',
            borderColor: 'rgba(30,126,229,1)',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(255,99,132,0.4)',
            hoverBorderColor: 'rgba(255,99,132,1)',
            data: []
          }
        ]
      }
    }
   
  }


  componentDidMount() {
    console.log("Recruiter is ", this.state.recruiter);
    axios
      .get(
        `${CONSTANTS.BACKEND_URL}/recruiters/` + this.state.recruiter + "/jobs/logs/citywise"
      )
      .then(response => {
        console.log("Inside city wise  component",response.data);
        // console.log("Inside JobListing component didmount",response.data.jobsList.data);
        var tempstate = {...this.state.chartData};
        tempstate.datasets[0].data = response.data.data;
        tempstate.labels = response.data.labels;
        console.log("Temp state in did mount",tempstate);

       this.setState({
         chartData : tempstate
       })
        
       
      })
      
      .catch(function(error) {
        console.log("errored in component did mount City wise ");
        console.log(error);
      });
  }
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
          <h4 style={{ textAlign: "center" }}>City Wise Application/month</h4>

          <Bar
          data={this.state.chartData}
          width={100}
          height={50}
          options={
            {
          legend: {
              display: false
           },
           scales: {
             xAxes:[{
               ticks:{
                autoSkip:false
               }
             }],
              yAxes: [{
                  ticks: {
                      beginAtZero:true,

                  }
              }]
          }
           
          }
        }


        />
        </div>
      </div>
    );
  }
}
