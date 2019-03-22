import React, { Component } from 'react';
import { Button } from '../Common';
import Login from './Login';
class RegisterLogin extends Component {
    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <h2>New Customers</h2>
                            <Button 
                                type="default"
                                title="Craete an account"
                                style={{
                                    margin: '10px 0 0 0'
                                }}
                                link={'/register'}
                            />
                        </div>

                        <div className="right">
                            <h2>Registered Customers</h2>
                            <p>If you have an account please log in</p>
                            <Login />
                        </div>
                    </div>
                </div>
                
            </div>
        );
    }
}

export default RegisterLogin;