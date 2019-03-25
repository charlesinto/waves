import React, { Component } from 'react';
import { Button } from '../Common'
class Dashboard extends Component {
    renderUserDetail(){
        if(this.props.user.user){
            return (
                <div>
                    <span>{this.props.user.user.name}</span>
                    <span>{this.props.user.user.lastname}</span>
                    <span>{this.props.user.user.email}</span>
                </div>
            )
        }
        return null;
    }
    render() {
        return (
            <div>
                <div className="user_nfo_panel">
                    <h1>User Information</h1>
                    <div>
                        {this.renderUserDetail()}
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