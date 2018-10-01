import React, {Component} from 'react';
import axios from 'axios';
import classnames from 'classnames';
import propTypes from 'prop-types';
//TODO: exportn withROuter
import {withRouter} from "react-router-dom";
//*Connect redux to this component
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";

class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };

        this.onChange = this
            .onChange
            .bind(this);
        this.onSubmit = this
            .onSubmit
            .bind(this);
    }

    //*Test for errors props
    componentWillReceiveProps = props => {
        if (props.errors) {
            this.setState({errors: props.errors})
        }

    }

    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2
        };

        //TODO: use history to redirect within the action
        this
            .props
            .registerUser(newUser, this.props.history);

    }

    render() {
        const {errors} = this.state;

        const {user} = this.props.auth;

        return (
            <div className="register">
                {user
                    ? <h1>{user.name}</h1>
                    : null}

                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Create your DevConnector account
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames('form-control form-control-lg', {'is-invalid': errors.name})}
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}/> {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg', {'is-invalid': errors.email})}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}/> {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                    <small className="form-text text-muted">
                                        This site uses Gravatar so if you want a profile image, use a Gravatar email
                                    </small>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {'is-invalid': errors.password})}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}/> {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {'is-invalid': errors.password2})}
                                        placeholder="Confirm Password"
                                        name="password2"
                                        value={this.state.password2}
                                        onChange={this.onChange}/> {errors.password2 && (
                                        <div className="invalid-feedback">{errors.password2}</div>
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

//TOD: PROPTYPES
Register.propTypes = {
    registerUser: propTypes.func.isRequired,
    auth: propTypes.object.isRequired,
    errors: propTypes.object
};

/*
@purpose: Use dispatch
*/
const mapStateToProps = state => ({auth: state.auth, errors: state.errors});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    registerUser
}, dispatch);

//TODO: CONNECT TO REDUX
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Register));
