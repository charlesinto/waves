import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormField} from '../Common';
import Helper from '../Helper';
import { withRouter } from 'react-router-dom';
import * as actions from '../Actions';

class Login extends Component {
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
        const dataToSubmit = Helper.validateForm(this.state.formdata, 'login');
        if(!dataToSubmit.isValid){
            return this.setState({formError: true})
        }
        this.props.loginUser(dataToSubmit.record);
    }
    updateForm(element){
        const newFormData = Helper.update(element, this.state.formdata, 'Login')
        this.setState({
            formError: false,
            formdata: {...newFormData}
        })
    }
    render() {
        return (
            <div className="signin_wrapper">
                <form onSubmit={(e) => this.submitForm(e)} >
                    <FormField
                        id={'email'}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateForm(element)}
                    />
                    <FormField
                        id={'password'}
                        formdata={this.state.formdata.password}
                        change={(element) => this.updateForm(element)}
                    />
                    {this.state.formError ? <div className="error_label">Please check your data</div> : null}
                    <button onClick={(e) => this.submitForm(e)}>Log In</button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { loginSuccess } = state.auth;
    return {
        loginSuccess
    }
}

export default connect(mapStateToProps, actions )(withRouter((Login)));