import React, { Component } from 'react';
import  Card  from "../Common/Card";

class CardBlockShop extends Component {
    renderCards(list){
        return  list ?
             list.map((card, i) => (
                <Card 
                    key={i}
                    {...card}
                    grid={this.props.grid}
                />
             ))
         :null
     }
    render() {
        return (
            <div className="card_block_shop">
                <div>
                     {this.props.list ? 
                        
                        this.props.list.length === 0 ?
                        <div className="no_result">
                            Sorry, no results
                        </div>
                        : null
                        : null}
                    {this.renderCards(this.props.list)}
                </div>
            </div>
        );
    }
}

export default CardBlockShop;