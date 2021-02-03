import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {createStructuredSelector} from 'reselect';
import {injectIntl} from 'react-intl';
import SwipeableViews from 'react-swipeable-views';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Grid from '@material-ui/core/Grid';

import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';


import {makeSelectUser} from '../App/selectors';
import reducer from './reducer';
import saga from './saga';

import {UploadFileTab} from "../../components/UploadFileTab";

export class DashboardPage extends React.PureComponent {

    state = {
        activeTab: 0,
    };

    componentWillMount() {
        if (window.location.hash === `#configuration`) {
            this.setState({
                activeTab: 1
            });
        }
    }

    handleChangeActiveTab = (event, activeTab) => {
        this.setState({activeTab});
    };

    handleChangeIndex = (index) => {
        this.setState({activeTab: index});
    };

    render() {
        return (<Grid container spacing={24}>
            <AppBar position="static" color="default" style={{backgroundColor: `white`, boxShadow: `none`}}>
                <Tabs
                    value={this.state.activeTab}
                    onChange={this.handleChangeActiveTab}
                    indicatorColor="primary"
                    textColor="primary">
                    <Tab label={this.props.intl.formatMessage({id: `Upload files`})}/>
                    <Tab label={this.props.intl.formatMessage({id: `Upload images`})}/>
                    <Tab label={this.props.intl.formatMessage({id: `Relate images`})}/>
                    <Tab label={this.props.intl.formatMessage({id: `Get data`})}/>
                </Tabs>
            </AppBar>
            <SwipeableViews
                index={this.state.activeTab}
                onChangeIndex={this.handleChangeIndex}>
                <div style={{paddingTop: `16px`, paddingLeft: `4px`, paddingRight: `4px`}}>
                    <UploadFileTab />
                </div>
                <div style={{paddingTop: `16px`, paddingLeft: `4px`, paddingRight: `4px`}}>
                    <h1>TEST2</h1>
                </div>
                <div style={{paddingTop: `16px`, paddingLeft: `4px`, paddingRight: `4px`}}>
                    <h1>TEST2</h1>
                </div>
                <div style={{paddingTop: `16px`, paddingLeft: `4px`, paddingRight: `4px`}}>
                    <h1>TEST2</h1>
                </div>
            </SwipeableViews>
        </Grid>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});

const withConnect = connect(mapStateToProps);

const withReducer = injectReducer({key: 'home', reducer});
const withSaga = injectSaga({key: 'home', saga});

export default compose(withReducer, withSaga, withConnect)(injectIntl(DashboardPage));
