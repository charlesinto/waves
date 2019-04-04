import React, { Component } from 'react';
import UserLayout from "../../HOC/UserLayout";
import { FormField } from '../../Common';
import Helper from '../../Helper';
import { withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import * as actions from '../../Actions';
import  FileUpload from "../../Common/FileUpload";

class AddProduct extends Component {
    state ={
        c: [],
        formError: false,
        formSuccess:false,
        formdata:{
            name:{
                element:'input',
                value:'',
                config:{
                    label:'Product Name',
                    name:'product_name_input',
                    type:'text',
                    placeholder:'Enter product name'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            description:{
                element:'input',
                value:'',
                config:{
                    label:'Product Description',
                    name:'product_description_input',
                    type:'textarea',
                    placeholder:'Enter description'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            price:{
                element:'input',
                value:'',
                config:{
                    label:'Price',
                    name:'product_price_input',
                    type:'number',
                    placeholder:'Enter price'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            brand:{
                element:'select',
                value:'',
                config:{
                    label:'Brand',
                    name:'brand_input',
                    options:[]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            shipping:{
                element:'select',
                value:'',
                config:{
                    label:'Shipping',
                    name:'shipping_input',
                    options:[
                        {key:true, value:'Yes'},
                        {key:false, value:'No'}
                    ]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            available:{
                element:'select',
                value:'',
                config:{
                    label:'Available in stock',
                    name:'available_input',
                    options:[
                        {key:true, value:'Yes'},
                        {key:false, value:'No'}
                    ]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            wood:{
                element:'select',
                value:'',
                config:{
                    label:'Wood Material',
                    name:'product_wood_input',
                    options:[]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            frets:{
                element:'select',
                value:'',
                config:{
                    label:'Frets',
                    name:'product_frets_input',
                    options:[
                        {key:20, value:'20'},
                        {key:21, value:'21'},
                        {key:22, value:'22'},
                        {key:24, value:'24'}
                    ]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            publish:{
                element:'select',
                value:'',
                config:{
                    label:'Publish',
                    name:'publish_input',
                    options:[
                        {key:true, value:'Public'},
                        {key:false, value:'Hidden'}
                    ]
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:'',
                showLabel: true
            },
            images:{
                element:'input',
                value:[],
                validation:{
                    required:true,
                },
                valid:false,
                validationMessage:''
            }
        }
    }
    componentDidMount(){
        this.props.getProductsCategory()
    }
    submitForm(e){
        e.preventDefault();
        const dataToSubmit = Helper.validateForm(this.state.formdata, 'login');
        if(!dataToSubmit.isValid){
            return this.setState({formError: true})
        }
        this.props.addProduct(dataToSubmit.record)
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.brand){
          const newFormData =  Helper.populateDropdown(this.state.formdata, nextProps.brand, 'brand');
          this.setState({
              formdata:{...newFormData}
          })
        }
        if(nextProps.wood){
          const newFormData =  Helper.populateDropdown(this.state.formdata, nextProps.wood, 'wood');
            this.setState({
                formdata:{...newFormData}
            })
        }
        if(nextProps.addProducts && nextProps.addProducts.status === 200){
            this.setState({
                formSuccess:true,
                formError: false
            }, () => this.resetForm())
        }
        this.setState({
            formdata: {...this.state.formdata, images:{...this.state.formdata.images,
                 value: [...this.state.formdata.images.value, ...nextProps.images], valid:true}}
        }, () =>  console.log(this.state.formdata.images))
        console.log(nextProps)
    }
    resetForm(){
        const $ = this;
        const newFormData = Helper.resetForm(this.state.formdata);
        setTimeout(function(){$.setState({
            formdata: newFormData,
            formSuccess: false
        })}, 2000);
        this.props.clearForm();
    }
    updateForm(element){
        const newFormData = Helper.update(element, this.state.formdata)
        this.setState({
            formError: false,
            formdata: {...newFormData}
        })
    }
    render() {
        return (
            <UserLayout>
                <div>
                    <h2>Add Product</h2>
                    <form
                        onSubmit={(e) => this.submitForm(e)}
                        noValidate
                    >
                        <FileUpload />
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'description'}
                            formdata={this.state.formdata.description}
                            change={(element) => this.updateForm(element)}
                        />
                        
                        <FormField
                            id={'price'}
                            formdata={this.state.formdata.price}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'wood'}
                            formdata={this.state.formdata.wood}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'brand'}
                            formdata={this.state.formdata.brand}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'frets'}
                            formdata={this.state.formdata.frets}
                            change={(element) => this.updateForm(element)}
                        />
                        <div className="form_devider"></div>
                        <FormField
                            id={'available'}
                            formdata={this.state.formdata.available}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'shipping'}
                            formdata={this.state.formdata.shipping}
                            change={(element) => this.updateForm(element)}
                        />
                        <FormField
                            id={'publish'}
                            formdata={this.state.formdata.publish}
                            change={(element) => this.updateForm(element)}
                        />
                        {(this.state.formSuccess) ? <div className="form_success">Success</div> : null}
                        {this.state.formError ? <div className="error_label">Please check your data</div> : null}
                        <button onClick={(e) => this.submitForm(e)}>Add Product</button>
                    </form>
                </div>
            </UserLayout>
        );
    }
}

const mapStateToProps = state => {
    const { brand, wood} = state.products.categories
    const { addProducts, isUploaded, images } = state.products;
    console.log(state)
    return {
        wood,
        brand,
        addProducts,
        isUploaded,
        images
    }
}

export default connect(mapStateToProps, actions)(withRouter(AddProduct));