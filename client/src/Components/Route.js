import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Layout from './HOC/Layout';
import RegisterLogin from './RegisterLogin';

class Routes extends Component {
    render() {
        return (
            <Layout>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/register_login" exact component={RegisterLogin} />
                </Switch>
            </Layout>
        );
    }
}

export default Routes;