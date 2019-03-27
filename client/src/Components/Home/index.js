import React, { Component } from 'react';
import HomeSlider from './HomeSlider';
import {connect } from 'react-redux';
import { withRouter } from "react-router-dom";
import HomePromotion from './HomePromotion';
import * as actions from '../Actions';
import { CardBlock } from "../Common";

class Home extends Component {
    state ={
        byarrival:[],
        bysales:[]
    }
    componentDidMount(){
        this.props.getProductByArrivalTopSelling()
    }
    componentWillUpdate(){
        console.log('satat', this.state);
    }
    componentWillReceiveProps(nexprops){
        const { byarrival, bysales} = nexprops;
        console.log(byarrival, bysales)
        this.setState({
            byarrival,
            bysales
        })
        
    }
    render() {
        return (
            <div>
                <HomeSlider />
                <CardBlock title="New Arrival"
                    list={this.state.byarrival}
                />
                <HomePromotion />
                <CardBlock title="Best Selling Guitar"
                    list={this.state.bysales}
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { products} = state;
    return {
        bysales: products.promotions.bysales,
        byarrival: products.promotions.byarrival
    }
}

export default connect(mapStateToProps, actions)(withRouter(Home));