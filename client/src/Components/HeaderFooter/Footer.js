import React, { Component } from 'react';
import FontAwesome from '@fortawesome/react-fontawesome'
import {faCompass, faPhone
    ,faClock, faEnvelope
} from '@fortawesome/fontawesome-free-solid'

class Footer extends Component {
    render() {
        return (
            <footer className="bck_b_dark">
                <div className="container">
                    <div className="logo">
                        waves
                    </div>
                    <div className="wrapper">
                        <div className="left">
                            <h2>Contact Information</h2>
                            <div className="business_nfo">
                                <div className="tag">
                                    <FontAwesome
                                        icon={faCompass}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Address</div>
                                        <div>Oriental Hotel</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesome
                                        icon={faPhone}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Phone</div>
                                        <div>234-222-1199-0234</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesome
                                        icon={faClock}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Working Hours</div>
                                        <div>Mon - Sun / 9 Am - 8  pm</div>
                                    </div>
                                </div>
                                <div className="tag">
                                    <FontAwesome
                                        icon={faEnvelope}
                                        className="icon"
                                    />
                                    <div className="nfo">
                                        <div>Email</div>
                                        <div>info@waves.com</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                         <div className="">
                             <h4>Be The first to Know</h4>
                            <div>
                                <div>
                                    lore ipusum ipus ta-jus undudne
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;