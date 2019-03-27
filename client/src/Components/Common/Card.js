import React, { Component } from 'react';
import {Button} from "./Button";
class Card extends Component {
    renderCardImage(images){
      return   images.length > 0 ?
        images[0].url : '/images/image_not_availble.png'
    }
    render() {
        const props = this.props;
        return (
            <div className={`card_item_wrapper ${props.grid}`}>
                <div className="image"
                    style={{
                        background:`url(${this.renderCardImage(props.images)}) no-repeat`
                    }}
                >
                
                </div>
                <div
                    className="action_container"
                >
                    <div className="tags">
                        <div className="brand">
                            {props.brand.name}
                        </div>
                        <div className="name">
                            {props.name}
                        </div>
                        <div className="price">
                            ${props.price}
                        </div>
                    </div>
                </div>
                {
                    props.grid ?
                    <div className="description">
                        biuuibigig
                    </div>
                    : null
                }
                <div className="actions">
                    <div className="button_wrapp">
                        <Button
                            type="default"
                            altClass="card_link"
                            link={`/product_detail/${props._id}`}
                            title="view product"
                            style={{margin:'10px 0 0 0'}}
                        />
                    </div>
                    <div className="button_wrapp">
                        <Button
                            type="bag_link"
                            runAction={() => console.log('added to class')}
                            altClass="card_link"
                            link={`/product_detail/${props._id}`}
                            title="view product"
                            style={{margin:'10px  0 0 0'}}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;