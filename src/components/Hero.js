import React from 'react'
import { FaWhatsapp, FaRegLightbulb } from 'react-icons/fa'
import './HeroStyles.css'

const Hero = () => {
    return (
        <div className='hero'>
            <div className='container'>
                <div className='content'>
                    <div className='col-1'>
                        <h1> WHATASAPP BARG..  </h1>
                        <h2><span className='warning-color'>All in one click </span></h2>
                        <p>
                            This solution is all what you really need to expand your business and target more people
                        </p>

                        <div className='used-by'>
                            <p>ENJOY </p>
                            <div className='icons'>
                                <i><FaWhatsapp /> Support WhatsApp Web </i>
                                <i><FaRegLightbulb /> One click Solution</i>
                                <i>  
                                    
                                    
                                    
                                    
                                     Available 24/7</i>
                            </div>
                        </div>
                    </div>
                    <div className='col-2'>
                        <div className='form-layout'>
                            <div className='form-container'>
            

                                <div className='divider'>
                                    <p><span>Sign in </span></p>
                                </div>
                                <form action=''>
                                    <input type='mobile' placeholder='Mobile Number 05412345645' />
                                    <input type='password' placeholder='Password' />
                                    <button> Sign in </button>

                                
                                    
                                </form>
                            </div>
                            <div className='form-footer'>
                                <p>By signing up, you agree to our
                                    <span className='primary-color'> Terms, Data Policy</span> and
                                    <span className='primary-color'> Cookies Policy</span>.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Hero
