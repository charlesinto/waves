import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faShoppingBag } from '@fortawesome/fontawesome-free-solid';

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
            template = <Link className={props.altClass ? props.altClass : "link_default"}
                            to={props.link}
                            {...props.style}
                        >
            {props.title}</Link>
            return template
        case 'bag_link':
            template = <div className="bag_link"
                            onClick={() => props.runAction()}
                        >
                            <FontAwesomeIcon
                                icon={faShoppingBag}
                            />
                        </div>
            return template
        default:
            return template;
    }
}
export {Button};