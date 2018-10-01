import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators, combineReducers} from 'redux';
import {withRouter} from 'react-router-dom';
import propTypes from 'prop-types';

import {loginUser} from "../../actions/authActions";

class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    componentWillReceiveProps = props => {
        if (props.errors) {
            this.setState({errors: props.errors});
        }
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            email: this.state.email,
            password: this.state.password
        };

        console.log(user);

        //TODO: New plug in props.loginUser

        this
            .props
            .loginUser(user);

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {

const {errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">
                                Sign in to your DevConnector account
                            </p>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}/> {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control form-control-lg"
                                        placeholder="Password"
                                        name="password"
                                   
                                        value={this.state.password}
                                        onChange={this.onChange}/> {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
Login.propTypes = {
    loginUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object
};
const mapStateToProps = (state) => ({auth: state.auth, errors: state.errors});
const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    loginUser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));