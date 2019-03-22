import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Actions';
import  CircularProgress from '@material-ui/core/CircularProgress';
import { PRIVATE, AUTH_RESTRICTED} from '../Actions/types';

 export default function(ComposedClass, routeType, adminRoute = null){
    class AuthCheck extends Component {
        state={
            isLoading: true
        }
        componentDidMount(){
            this.props.authUser();
        }
        componentWillReceiveProps(nextProps){
            const { user } = nextProps;
            if(user.status === 200 || user.status === 406){
                if(!user.isAuth){
                    if(routeType === PRIVATE){
                        nextProps.history.push('/register_login')
                    }
                }else{
                    if(adminRoute && !user.isAdmin){
                        nextProps.history.push('/users/dashboard')
                    }
                    if(routeType === AUTH_RESTRICTED){
                        nextProps.history.push('/users/dashboard')
                    }
                }

                this.setState({
                    isLoading: false
                })
            }
        }
        render() {
            if(this.state.isLoading){
                return (
                    <div className="main_loader">
                        <CircularProgress
                            style={{color:'#2196f3'}}
                            thickness={7}
                        />

                    </div>
                )
            }
            return (
                <div>
                    <ComposedClass 
                        {...this.props}
                        user={this.props.user}
                    />
                </div>
            );
        }
    }
    const mapStateToProps = state => {
        const { userData } = state.auth
        return {
            user: userData
        }
    }
   return connect(mapStateToProps, actions)(AuthCheck)
}