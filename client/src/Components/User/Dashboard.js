import React, { Component } from 'react';
import { Button } from '../Common'
class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="user_nfo_panel">
                    <h1>User Information</h1>
                    <div>
                        <span>Name</span>
                        <span>Lastname</span>
                        <span>Email</span>
                    </div>
                    <Button 
                        type="default"
                        title="Edit account Info"
                        link={'/users/user_profile'}
                    />
                </div>
                <div className="user_nfo_panel">
                    <h1>History Purchases</h1>
                    <div className="user_product_block_wrapper">

                    </div>
                </div>
            </div>
        );
    }
}

export default Dashboard;