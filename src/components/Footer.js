import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'
import { AiOutlineMail } from "react-icons/ai";
import { Link } from 'react-router-dom'
import './FooterStyles.css'

const Footer = () => {
    return (
        <div className='footer'>
            <div className='container'>
                <div className='col solutions'>
                    <h6>Useful Links</h6>
                    <ul>
                        <li><Link to='/' className='link'>Home</Link></li>
                        <li><Link to='/' className='link'>Pricing</Link></li>
                        <li><Link to='/' className='link'>FAQ</Link></li>
                        <li><Link to='/' className='link'>Contact</Link></li>
                    </ul>
                </div>
                {/* <div className='col support'>
                    <h6>About </h6>
                    <ul>
                        <p> WhatsApp Barq is<br/> your soltuion to expand your business  </p>
                    </ul>
                </div> */}
                {/* <div className='col company'>
                    <h6>Company</h6>
                    <ul>
                        <li><Link to='/'className='link'>About</Link></li>
                        <li><Link to='/'className='link'>Blog</Link></li>
                        <li><Link to='/'className='link'>Jops</Link></li>
                        <li><Link to='/'className='link'>Press</Link></li>
                    </ul>
                </div> */}
                <div className='col legal'>
                    <h6>Legal</h6>
                    <ul>

                        <li><Link to='/' className='link'>Privacy</Link></li>
                        <li><Link to='/' className='link'>Cookies</Link></li>
                        <li><Link to='/' className='link'>Terms</Link></li>
                    </ul>
                </div>
                <div className='col-subscribe'>
                    <h6>Subscribe to our newsletter</h6>
                    <p> The latest news, articles, and resources sent to your inbox.</p>
                    <div className='subscribe'>
                        <input type='email' placeholder='Enter your email' />
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
            <div className='footer-bottom'>
                <div className='content'>
                    <div className='rights'>
                        <p>&copy; WhatsApp Barg, All rights reserved.</p>
                    </div>
                    <div>
                        <FaFacebook size={20} style={{ color: '#d3d3d3', marginRight: '10px' }} />
                        <FaInstagram size={20} style={{ color: '#d3d3d3', marginRight: '10px' }} />
                        <FaTwitter size={20} style={{ color: '#d3d3d3', marginRight: '10px' }} />
                        <AiOutlineMail size={20} style={{ color: '#d3d3d3', marginRight: '10px' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
