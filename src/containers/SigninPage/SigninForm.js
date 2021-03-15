import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import NativeSelect from '@material-ui/core/NativeSelect';

import { makeSelectAvailableDatabasesList, makeSelectAvailableDatabasesUserName } from '../App/selectors';

const MIN_LENGTH = 1;
const STEP_NAME = 0;
const STEP_PASSWORD = 1;

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: ``,
            password: ``,
            selectedDatabase: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.databases && nextProps.databases.length > 0 && prevState.selectedDatabase === false) {
            prevState.selectedDatabase = (nextProps.databases[0].parentdb ? nextProps.databases[0].parentdb : nextProps.databases[0].screenname);
            return prevState;
        } else {
            return null;
        }
    }

    componentWillUnmount() {
        this.props.onReset();
    }

    render() {
        let step = STEP_NAME;
        let readyToSubmit = false;
        let databaseSelector = false;
        if (this.props.databases !== false && this.props.databasesLastUserName) {
            if (this.props.databasesLastUserName === this.state.user) {
                step = STEP_PASSWORD;
                readyToSubmit = (this.props.disabled || this.state.user.length < MIN_LENGTH || this.state.password.length < MIN_LENGTH) === false
                    && this.state.selectedDatabase;

                if (this.props.databases.length > 0) {
                    let databaseSelectorOptions = [];
                    this.props.databases.map((item, index) => {
                        databaseSelectorOptions.push(<option key={`option_${index}`} value={item.parentdb}>{item.parentdb}</option>);
                    });

                    databaseSelector = (<FormControl fullWidth>
                        <InputLabel shrink>Select database</InputLabel>
                        <NativeSelect
                            fullWidth
                            value={this.state.selectedDatabase}
                            onChange={(event) => { this.setState({ selectedDatabase: event.target.value })}}>{databaseSelectorOptions}</NativeSelect>
                    </FormControl>)
                }
            }
        }

        return (<form onSubmit={(e) => {
            if (step === STEP_NAME) {
                this.props.onGetDatabases(this.state.user)
            }

            e.preventDefault();
            e.stopPropagation();
        }}>
            <div style={{ paddingBottom: `20px`}}>
                <FormControl margin="normal" fullWidth>
                    <TextField
                        id="username"
                        name="username"
                        autoFocus
                        required
                        label="Username or email"
                        disabled={this.props.disabled}
                        value={this.state.user}
                        onChange={(event) => {
                            this.setState({
                                user: event.target.value,
                                password: ``,
                                selectedDatabase: false
                            });
                        }}/>
                </FormControl>

                {step === STEP_PASSWORD ? (<div>
                    {this.props.databases.length === 0 ? (<div>
                        No databases found for the specified user
                    </div>) : false}
                    {this.props.databases.length > 1 ? (<div>
                        {databaseSelector}
                    </div>) : false}

                    {this.props.databases.length > 0 ? (<FormControl margin="normal" fullWidth>
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            required
                            label="Password"
                            disabled={this.props.disabled}
                            value={this.state.password} onChange={(event) => { this.setState({ password: event.target.value }) }}/>
                    </FormControl>) : false}
                </div>) : false}
            </div>
            {step === STEP_NAME ? (<Button
                type="submit"
                onClick={() => { this.props.onGetDatabases(this.state.user)}}
                fullWidth
                variant="contained"
                disabled={this.props.disabled || this.state.user.length < MIN_LENGTH}
                color="primary">
                Enter password
            </Button>) : (<Button
                type="submit"
                onClick={() => { this.props.onSubmit({
                    user: this.state.user,
                    password: this.state.password,
                    database: this.state.selectedDatabase
                })}}
                fullWidth
                variant="contained"
                disabled={!readyToSubmit} color="primary">
                Sign in
            </Button>)}
        </form>);
    }
}

SigninForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    onGetDatabases: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired
};

const mapStateToProps = createStructuredSelector({
    databases: makeSelectAvailableDatabasesList(),
    databasesLastUserName: makeSelectAvailableDatabasesUserName(),
});

export default connect(mapStateToProps)(SigninForm);
