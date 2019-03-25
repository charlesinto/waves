import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../Actions';

class Header extends Component {
    state = {
        page:[
            {
                name:'Home',
                linkTo:'/',
                public:true
            },
            {
                name:'Guitars',
                linkTo:'/shop',
                public: true
            }
        ],
        user:[
            {
                name:'My Cart',
                linkTo:'/users/cart',
                public:false,
            },
            {
                name:'My Account',
                linkTo:'/users/dashboard',
                public:false,
            },
            {
                name:'Log In',
                linkTo:'/register_login',
                public: true,
            },
            {
                name:'Log Out',
                linkTo:'/user/logout',
                public:false,
            }
        ]
    }
    showLinks(type){
        let links = [];
        if(this.props.user){
            type.forEach(item => {
                if(!this.props.user.isAuth){
                    if(item.public){
                        links.push(item)
                    }
                }else{
                    if(item.name !== 'Log In'){
                        links.push(item)
                    }
                }
            })
        }
        return this.displayLinks(links);
    }
    async logoutHandler(){
        try{
            this.props.logout();
            if(this.props.logoutSuccess){
                if(this.props.user.success){
                    this.props.history.push('/');
                }
            }
        } catch(e){
            throw e
        }
    }
    displayLinks(links){
        return links.map((link, i) => {
            if(link.name === 'My Cart'){
                return (
                    <div className="cart_link" key={i}>
                        <span>{this.props.user.user.cart ? this.props.user.user.cart.length : 0}</span>
                        <Link to={link.linkTo}>{link.name}</Link>
                    </div>
                )
            }
            else if(link.name === 'Log Out'){
                return (
                    <div className="log_out_link" key={i} 
                    onClick={() => this.logoutHandler()}>
                        {link.name}
                    </div>
                )
            }
            return (<Link to={link.linkTo} key={i}>
                {link.name}
            </Link>)
            
    })
    }
    render() {
        return (
            <header className="bck_b_light">
                <div className="container">
                    <div className="left">
                        <div className="logo">
                            waves
                        </div>
                    </div>
                    <div className="right">
                        <div className="top">
                            {this.showLinks(this.state.user)}
                        </div>
                        <div className="bottom">
                            {this.showLinks(this.state.page)}
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}
const mapStateToProp = state => {
    const { userData, logoutSuccess } = state.auth;
    return {user: userData, logoutSuccess};
}
export default connect(mapStateToProp, actions)(withRouter(Header));