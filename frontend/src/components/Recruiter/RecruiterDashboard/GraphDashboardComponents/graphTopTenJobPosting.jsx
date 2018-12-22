import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {CONSTANTS} from '../../../../Constants';
import jwtDecode from 'jwt-decode';
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
export default class GraphTopTenJobPostingComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recruiter: localStorage.getItem('recruiterToken')?jwtDecode(localStorage.getItem('recruiterToken')).email : "",
      // recruiter : "recruiter13@gmail.com",
      chartData: {
        labels: ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'August','September', 'Oct', 'Nov', 'Dec']
        
      }
    }
   
  }

  componentDidMount() {
    console.log("Recruiter is ", this.state.recruiter);
    axios
      .get(
        `${CONSTANTS.BACKEND_URL}/recruiters/` + this.state.recruiter + "/jobs/top-ten"
      )
      .then(response => {
        console.log("Inside Graph TOP TEN  component",response.data);
        // console.log("Inside JobListing component didmount",response.data.jobsList.data);
        var tempstate = {...this.state.chartData};
        tempstate.datasets = response.data;

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
          <h4 style={{ textAlign: "center" }}>Top 10 Job Posting</h4>

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
