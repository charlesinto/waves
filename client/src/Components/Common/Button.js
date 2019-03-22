import React from 'react';
import { Link } from 'react-router-dom';

const Button = (props) => {
    return (
        <div className="my_link">
            {buttons(props)}
            
        </div>
    );
};

const buttons = (props)=> {
    let template = "";
    switch(props.type){
        case 'default':
            template = <Link className="link_default"
                            to={props.link}
                            {...props.style}
                        >
            {props.title}</Link>
            return template
        default:
            return template;
    }
}
export {Button};