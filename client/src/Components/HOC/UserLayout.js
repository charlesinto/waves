import React from 'react';
import { Link } from 'react-router-dom';

const UserLayout = (props) => {
    const links = [
        {
            name:'My Account',
            to:'/users/dashboard'
        },
        {
            name:'User Information',
            to:'/users/user_profile'
        },
        {
            name:'My Cart',
            to:'/users/cart'
        }
    ]
    return (
        <div className="container dashboard">
            <div className="user_container">
                <div className="user_left_nav">
                    <h2>My account</h2>
                    <div className="links">
                        {generateLinks(links)}
                    </div>
                    
                </div>
                <div className="user_right">
                    {props.children}
                </div>
            </div>
            
        </div>
    );
};



const generateLinks = (links) => (
    links.map((item, i) => (
        <Link to={item.to} key={i}>
            {item.name}
        </Link>
    ))
)

export default UserLayout;