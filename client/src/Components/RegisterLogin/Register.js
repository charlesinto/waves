import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../Actions';
import Helper from '../Helper';
import { FormField } from '../Common'

class Register extends Component {
    state ={
        formError: false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type:'email',
                    placeholder:'Enter your email'
                },
                validation:{
                    required:true,
                    email:true
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            password:{
                element:'input',
                value:'',
                config:{
                    name:'password_input',
                    type:'password',
                    placeholder:'Enter your password'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            confirmPassword:{
                element:'input',
                value:'',
                config:{
                    name:'c_password_input',
                    type:'password',
                    placeholder:'confirm password'
                },
                validation:{
                    required:true,
                    confirm: 'password'
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            name:{
                element:'input',
                value:'',
                config:{
                    name:'name_input',
                    type:'text',
                    placeholder:'Enter firstname'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            },
            lastname:{
                element:'input',
                value:'',
                config:{
                    name:'lastname_input',
                    type:'text',
                    placeholder:'Enter lastname'
                },
                validation:{
                    required:true,
                },
                valid:false,
                touched:false,
                validationMessage:''
            }
        }
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.loginSuccess){
            nextProps.history.push('/users/dashboard')
        }else{
            this.setState({
                formError: true
            })
        }
    
    }
    submitForm(e){
        e.preventDefault();
        const dataToSubmit = Helper.validateForm(this.state.formdata, 'register');
        if(!dataToSubmit.isValid){
            return this.setState({formError: true})
        }
        this.props.registerUser(dataToSubmit.record);
        console.log('form', dataToSubmit)
    }
    updateForm(element){
        const newFormData = Helper.update(element, this.state.formdata, 'register')
        this.setState({
            formError: false,
            formdata: {...newFormData}
        })
    }
    render() {
        return (
            <div className="page_wrapper">
                <div className="container">
                    <div className="register_login_container">
                        <div className="left">
                            <form onSubmit={(e) => this.submitForm(e)}>
                                <h2>Personal Information</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'name'}
                                            formdata={this.state.formdata.name}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'lastname'}
                                            formdata={this.state.formdata.lastname}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <FormField
                                        id={'email'}
                                        formdata={this.state.formdata.email}
                                        change={(element) => this.updateForm(element)}
                                    />
                                </div>
                                <h2>Verify Password</h2>
                                <div className="form_block_two">
                                    <div className="block">
                                        <FormField
                                            id={'password'}
                                            formdata={this.state.formdata.password}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                    <div className="block">
                                        <FormField
                                            id={'confirmPassword'}
                                            formdata={this.state.formdata.confirmPassword}
                                            change={(element) => this.updateForm(element)}
                                        />
                                    </div>
                                </div>
                                {this.state.formError ? <div className="error_label">Please check your data</div> : null}
                                <button onClick={(e) => this.submitForm(e)}>Register</button>
                            </form>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { loginSuccess } = state.auth
    console.log('state', loginSuccess);
    return {
        loginSuccess
    }
}
export default connect(mapStateToProps, actions)(withRouter(Register));
