import React, { Component } from 'react';
import UserLayout from '../HOC/UserLayout';
import Dashboard from './Dashboard'
class User extends Component {
    render() {
        return (
            <UserLayout>
                <Dashboard />
            </UserLayout>
        );
    }
}

export default User;