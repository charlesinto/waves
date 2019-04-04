import React, { Component } from 'react';
import Helper from "../../Helper";
import { FormField } from "../../Common/FormField";
import { connect } from "react-redux";
import * as actions from "../../Actions";

class ManageBrand extends Component {
    state = {
        formError:false,
        formSuccess:false,
        formdata:{
            name: {
                element: 'input',
                value: '',
                config:{
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter the brand'
                },
                validation:{
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage:''
            },
        }
    }

    showCategoryItems = () => (
        this.props.brand ?
            this.props.brand.map((item,i)=>(
                <div className="category_item" key={i}>
                    {item.name}
                </div>
            ))
        :null
    )

    updateForm = (element) => {
        const newFormdata = Helper.update(element,this.state.formdata,'brands');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }

    resetFieldsHandler = () =>{
        const newFormData = Helper.resetForm(this.state.formdata,'brands');

        this.setState({
            formdata: newFormData,
            formSuccess:true
        });
    }

  
    submitForm= (event) =>{
        event.preventDefault();
        
        let dataToSubmit = Helper.validateForm(this.state.formdata,'brands');
        let formIsValid = dataToSubmit.isValid;
        let existingBrands = this.props.brand;

        if(formIsValid){
            console.log(dataToSubmit)
           this.props.addProductBrand(dataToSubmit.record, existingBrands)
        } else {
            this.setState({
                formError: true
            })
        }
    }

    componentDidMount(){
        this.props.getProductsCategory()
    }


    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Brands</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        
                    <form onSubmit={(event)=> this.submitForm(event)}>

                         <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />


                        {this.state.formError ?
                            <div className="error_label">
                                Please check your data
                            </div>
                            : null}
                        <button onClick={(event) => this.submitForm(event)}>
                            Add brand
                        </button>

                    </form>

                    </div>

                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log(state)
    const { brand} = state.products.categories;
    return {
        brand
    }
}

export default connect(mapStateToProps, actions)(ManageBrand);