import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {CONSTANTS} from '../../../Constants';
import jwtDecode from "jwt-decode";

// var yLabels = {
//   1: "January",
//   2: "February",
//   3: "March",
//   4: "April",
//   5: "May",
//   6: "June",
//   7: "July",
//   8: "August",
//   9: "September",
//   10: "October",
//   11: "November",
//   12: "Decemeber",

// };
/*
[
          {
            label:'Job1',
            backgroundColor: 'blue',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job2',
            backgroundColor: 'yellow',
            data: [15, 15, 25, 40, 26, 1, 4, 8, 32, 33,12,10]
          },
          {
            label:'Job3',
            backgroundColor: 'red',
            data: [54, 22, 34, 40, 65, 11, 24, 8, 3, 3,2,10]
          },
          {
            label:'Job4',
            backgroundColor: 'grey',
            data: [12, 12, 4, 34, 34, 2, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job5',
            backgroundColor: 'black',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job6',
            backgroundColor: 'purple',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job7',
            backgroundColor: 'orange',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job8',
            backgroundColor: 'darkblue',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job9',
            backgroundColor: 'cyan',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          },
          {
            label:'Job10',
            backgroundColor: 'green',
            data: [55, 25, 35, 40, 29, 31, 34, 28, 32, 33,12,10]
          }

          


        ]


*/
export default class GraphProfileViewCountComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      applicant: localStorage.getItem('applicantToken')?jwtDecode(localStorage.getItem('applicantToken')).email : "",
      //applicant : "goel1@gmail.com",
      chartData: {
        labels: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
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
    console.log("applicant is ", this.state.applicant);
    axios
      .get(
        `${CONSTANTS.BACKEND_URL}/applicants/` + this.state.applicant + "/logs/profile-view-count"
      )
      .then(response => {
        console.log("Inside Graph TOP TEN  component",response.data);
        // console.log("Inside JobListing component didmount",response.data.jobsList.data);
        var tempstate = {...this.state.chartData};
        tempstate.datasets[0].data = response.data;
        console.log("tempstate is",tempstate);

       this.setState({
         chartData : tempstate
       })
        
       
      })
      
      .catch(function(error) {
        console.log("errored in componenent graph top ten");
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
          <h4 style={{ textAlign: "center" }}>Profile view count last 30 days</h4>

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
                yAxes: [{
                    ticks: {
                        beginAtZero:true
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
