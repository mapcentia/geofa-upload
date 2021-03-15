import React from 'react';
import { Switch } from 'react-router-dom';
import injectSaga from '../../utils/injectSaga';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getGC2ConfigurationRequest } from './actions';
import { withRouter, Route } from "react-router";

import Footer from '../../components/Footer/Loadable';
import SigninPage from '../SigninPage/Loadable';
import DashboardPage from '../DashboardPage/Loadable';
import NotFoundPage from '../NotFoundPage/Loadable';
import AppLoadingOverlay from '../../components/AppLoadingOverlay';

import PublicLayoutRoute from '../PublicLayoutRoute';
import ProtectedLayoutRoute from '../ProtectedLayoutRoute';

import { makeSelectGC2Configuration, makeSelectGC2ConfigurationLoading } from './selectors';
import saga from './saga';

import config from './../../config'

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.getGC2Configuration();
    }

    render() {
        let appBaseURL = config.homepage;
        return (<div>
            {this.props.gc2ConfigurationsLoading && this.props.gc2Configurations === false ? (<AppLoadingOverlay messageId="loadingConfiguration"/>) : (
                <div>
                    <Switch>
                        <ProtectedLayoutRoute exact path={appBaseURL} component={DashboardPage} />
                        <PublicLayoutRoute exact path={appBaseURL + "sign-in"} component={SigninPage} />
                        <PublicLayoutRoute path="" component={NotFoundPage} />
                    </Switch>
                    <Footer />
                </div>
            )}
        </div>);
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        getGC2Configuration: () => dispatch(getGC2ConfigurationRequest())
    };
}

const mapStateToProps = createStructuredSelector({
    gc2Configurations: makeSelectGC2Configuration(),
    gc2ConfigurationsLoading: makeSelectGC2ConfigurationLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = injectSaga({ key: 'app', saga });

export default withRouter(compose(withSaga, withConnect)(App));
