import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Layout from './HOC/Layout';
import RegisterLogin from './RegisterLogin';
import Register from './RegisterLogin/Register';
import UserDashboard from './User';
import AuthCheck from './HOC/AuthCheck';
import { PRIVATE, PUBLIC, AUTH_RESTRICTED} from './Actions/types';

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={AuthCheck(Home, PUBLIC)} />
                    <Route path="/users/dashboard" exact component={AuthCheck(UserDashboard, PRIVATE)} />
                    <Route path="/register_login" exact component={AuthCheck(RegisterLogin, AUTH_RESTRICTED)} />
                    <Route path="/register" exact component={AuthCheck(Register, AUTH_RESTRICTED)} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes;