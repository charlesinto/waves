import React, { Component } from 'react';
import Helper from "../../Helper";
import { FormField } from "../../Common/FormField";
import { connect } from "react-redux";
import * as actions from "../../Actions";

class ManageWood extends Component {
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
                    placeholder: 'Enter the wood'
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
        this.props.wood ?
            this.props.wood.map((item,i)=>(
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
        :null
    )

    updateForm = (element) => {
        const newFormdata = Helper.update(element,this.state.formdata,'woods');
        this.setState({
            formError: false,
            formdata: newFormdata
        });
    }

    resetFieldsHandler = () =>{
        const newFormData = Helper.resetForm(this.state.formdata,'woods');

        this.setState({
            formdata: newFormData,
            formSuccess:true
        });
    }

    submitForm= (event) =>{
        event.preventDefault();
        
        const dataToSubmit = Helper.validateForm(this.state.formdata,'woods');
        const formIsValid = dataToSubmit.isValid
        const existingWoods = this.props.wood;

        if(formIsValid){
            this.props.addProductWood(dataToSubmit.record, existingWoods);
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
            <h1>Woods</h1>
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
                        Add wood
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
    const { wood} = state.products.categories;
    return {
        wood
    }
}

export default connect(mapStateToProps, actions)(ManageWood);