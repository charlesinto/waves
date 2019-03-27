import React from 'react';
import Card from "./Card";
const CardBlock = (props) => {
    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title  ?
                    <div className="title">
                        {props.title}
                    </div>
                    : null
                }
                <div
                    style={{
                        display:'flex',
                        flexWrap:'wrap'
                    }}
                >
                    {renderCards(props.list)}
                </div>
            </div>
        </div>
    );
};

const renderCards = (list) => (
    list ? 
        list.map((card, i) => (
            <Card 
                key={i}
                {...card}
            />
        ))
    : null
)  

export  {CardBlock};