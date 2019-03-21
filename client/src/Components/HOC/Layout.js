import React, { Component } from 'react';
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header />
                <div className="page_container">
                     {this.props.children}
                </div>
                
                <Footer />
            </div>
        );
    }
}

export default Layout;