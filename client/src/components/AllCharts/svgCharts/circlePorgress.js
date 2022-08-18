import React from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

const ProgressCircleSvg = ({ initialTime, remiainigDays }) => {
  return (
    <CountdownCircleTimer
      //  isPlaying
      duration={initialTime}
      size={200}
      strokeWidth={20}
      initialRemainingTime={remiainigDays}
      colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
      colorsTime={[7, 5, 2, 0]}
    >
      {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
  );
};
export default ProgressCircleSvg;
