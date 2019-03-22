import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Layout from './HOC/Layout';
import RegisterLogin from './RegisterLogin';
import Register from './RegisterLogin/Register';
import UserDashboard from './User';

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/users/dashboard" exact component={UserDashboard} />
                    <Route path="/register_login" exact component={RegisterLogin} />
                    <Route path="/register" exact component={Register} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes;