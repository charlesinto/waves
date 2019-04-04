import React, { Component } from 'react';
import { PageTop } from "../Common";
import { connect } from "react-redux";
import * as actions from "../Actions";
import CollapseCheckbox from "./CollapseCheckbox";
import FontAwesomeIcon from "@fortawesome/react-fontawesome";
import { faBars, faTh } from "@fortawesome/fontawesome-free-solid";
import Frets from "./Frets.json";

import CollapseRadio from "./CollapseRadio";
import prices from "./prices.json";

import LoadCard from "./LoadCard";

class Shop extends Component {
    state = {
        grid:'',
        skip: 0,
        limit: 6,
        category:{
            wood:[],
            brand:[]
        },
        filters:{
            wood:[],
            frets:[],
            brand:[],
            price:[]
        },
        toShop:[]
    }
    componentDidMount(){
        this.props.getProductsCategory()
        this.props.getProductsToShop(
            this.state.limit,
            this.state.skip,
            this.state.filters
        )
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            category: {...this.state.category, 
                wood:nextProps.wood, brand:nextProps.brand},
            toShop: nextProps.toShop
        }, () => {})

    }
    handleCheck(filters, category){
        const newFilters = {...this.state.filters};
        if(category === 'price'){
            const checkedRadioArray = prices.filter(element => element._id === parseInt(filters))
            newFilters[category] = checkedRadioArray[0].value;
        }else{
            newFilters[category] = filters;
        }
        this.setState({
            filters: {...newFilters}
        }, () => this.props.getProductsToShop(
            this.state.limit,this.state.skip
            , this.state.filters
        ))
       
    }
    handleGrid(){
        this.setState({
            grid: this.state.grid ? '' : 'grid_bars'
        }, () => console.log(this.state))
    }
    loadList(){
        const skip = this.state.skip + this.state.limit;
        console.log('skip',skip);
        this.setState({skip}, () => this.props.getProductsToShop(
            this.state.limit,this.state.skip, this.state.filters,
            this.state.toShop
        ))
    }
    render() {
        console.log(this.state.filters, this.state.toShop);
        return (
            <div>
                <PageTop
                    title="Browse Products"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="right">
                            <CollapseCheckbox
                                title={'Brands'}
                                init={true}
                                list={this.state.category.brand}
                                handleCheck={(filters) => this.handleCheck(filters, 'brand')}
                            />
                            <CollapseCheckbox
                                title={'Frets'}
                                init={false}
                                list={Frets}
                                handleCheck={(filters) => this.handleCheck(filters, 'frets')}
                            />
                            <CollapseCheckbox
                                title={'Woods'}
                                init={false}
                                list={this.state.category.wood}
                                handleCheck={(filters) => this.handleCheck(filters, 'wood')}
                            />
                            <CollapseRadio
                                title={'Prices'}
                                init={true}
                                list={prices}
                                handleCheck={(filters) => this.handleCheck(filters, 'price')}
                            />
                            
                        </div>
                        <div className="left">
                            <div className="shop_options">
                                <div className="shop_grids clear">
                                    <div className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faTh}
                                        />
                                    </div>
                                    <div className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                                        onClick={() => this.handleGrid()}
                                    >
                                        <FontAwesomeIcon 
                                            icon={faBars}
                                        />

                                    </div>
                                </div>
                            </div>
                            <div>
                                <LoadCard
                                    grid={this.state.grid}
                                    limit={this.state.limit}
                                    size={this.props.toShopSize}
                                    list={this.state.toShop}
                                    loadMore = {() => this.loadList()}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { categories, toShop, toShopSize } = state.products;
    console.log('to shop', toShop)
    return {
        wood: categories.wood,
        brand: categories.brand,
        toShop,
        toShopSize
    }
}

export default connect(mapStateToProps, actions)(Shop);