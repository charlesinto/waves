import React, { Component } from 'react';
import CardBlockShop from "./CardBlockShop";
class LoadCard extends Component {
    state = {
        lastScrollTop: 0
    }
    componentDidMount(){
        window.addEventListener('scroll', (event) => this.calculateViewPosition(event))
    }
    calculateViewPosition(event){
        const lastChild = document.querySelector('.card_item_wrapper:last-child')
        const lastChildPosition = lastChild ?  lastChild.offsetHeight + lastChild.clientHeight : null;
        const  positionOfScroll = window.pageYOffset + window.innerHeight;
        const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
        // const viewPosition = window.innerHeight + document.documentElement.scrollTop;
        // const viewHeight = document.documentElement.offsetHeight - 
        //                     document.getElementsByClassName('bck_b_dark')[0]
        //                     .getBoundingClientRect().height;
        if(lastChildPosition){
            if(positionOfScroll  > lastChildPosition ){
                this.props.loadMore();
            }
        }
        this.setState({
            lastScrollTop: scrollPosition <= 0 ? 0 : scrollPosition
        })
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', (event) => this.calculateViewPosition(event))
    }
    render() {
        return (
            <div>
                <CardBlockShop
                    grid={this.props.grid}
                    list={this.props.list}
                />
            </div>
        );
    }
}

export default LoadCard;