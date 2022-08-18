import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";

class Salesdonut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        dataLabels: {
          enabled: true,
        },
        legend: {
          show: false,
        },
        plotOptions: {
          pie: {
            donut: {
              size: "80%",
            },
          },
        },
        colors: ["rgba(2, 164, 153)", "#f8b425"],
      },
      series: [55, 13],
      labels: ["Joined By others", "Joined normally"],
    };
  }
  render() {
    let ss = Object.keys(this.props.joinedByOthers).length;
    let ff = Object.keys(this.props.joinedNormally).length;
    let series = [ss, ff];

    return (
      <React.Fragment>
        <ReactApexChart
          options={this.state.options}
          series={series}
          labels={["Joined By others", "Joined normally"]}
          type="pie"
          height="220"
        />
      </React.Fragment>
    );
  }
}

export default Salesdonut;
