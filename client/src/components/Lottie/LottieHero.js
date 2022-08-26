import React from 'react'
import Lottie from 'react-lottie' 
import data from './chat.json' 
import "./chat.css" 

function homelottie() {
    const defaultOptions = {
        renderer:'svg',
        loop: true,
        autoplay: true,
        animationData: data,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    return (
      <div className="chat-container">
        <Lottie 
          options={defaultOptions}
          height={500}
          width={500}
        />
      </div>
    );
  }

export default homelottie