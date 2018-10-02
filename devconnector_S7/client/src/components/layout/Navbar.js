import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import PropTypes from 'prop-types';
import {logoutUser} from "../../actions/authActions.js";
class Navbar extends Component {

    constructor(props)
    {
        super(props);

        this.state = {};
    }
    onLogOutClick = (e) => {

        const {logoutUser} = this.props;
        //! Prevent refresh
        e.preventDefault();

        logoutUser();

    }

    render() {

        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">

                <li className="nav-item">
                    <a href="" onClick ={this.onLogOutClick} className="nav-link">Logout</a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/register">
                        Sign Up
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        );

        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        DevConnector
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-toggle="collapse"
                        data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/profiles">
                                    {' '}
                                    Developers
                                </Link>
                            </li>
                        </ul>

                        {isAuthenticated
                            ? authLinks
                            : guestLinks}

                    </div>
                </div>
            </nav>
        );
    }
}

//! Prop Types

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

//! Map dispatch

const mapStateToProps = state => ({auth: state.auth});

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
    logoutUser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
