import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";

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
    const adminLinks = [
        {
            name:"Site Info",
            to:'/admin/site_info'
        },
        {
            name:"Add Products",
            to:'/admin/add_products'
        },
        {
            name:"Manage Products",
            to:'/admin/manage_categories'
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
                    
                    {props.isAdmin ?
                        <div>
                            <h2>Admin</h2>
                            <div className="links">
                                {generateLinks(adminLinks)}
                            </div>
                        </div>
                    : null
                    }
                    
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

const mapStateToProps = state => {
    const { isAdmin} = state.auth.userData
    return{
        isAdmin
    }
}

export default connect(mapStateToProps, null)(UserLayout);