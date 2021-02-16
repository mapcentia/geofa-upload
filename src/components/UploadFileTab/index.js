import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import {injectIntl} from 'react-intl';
import styled from 'styled-components';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import FileInput from '@uppy/file-input'
import XHRUpload from '@uppy/xhr-upload'

import { DragDrop } from '@uppy/react'
import { Dashboard } from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Danish from '@uppy/locales/lib/da_DK'


import StyledButtonLink from '../StyledButtonLink';
import { makeSelectUser, makeSelectSubusers } from '../../containers/App/selectors';
import { getSubusersRequest, createUserRequest, updateUserRequest, createUpdateUserReset } from '../../containers/App/actions';

import { makeSelectCreateUserSuccess, makeSelectCreateUserSuccessUserName, makeSelectCreateUserError, makeSelectCreateUserErrorCode,
    makeSelectUpdateUserSuccess, makeSelectUpdateUserSuccessUserName, makeSelectUpdateUserError, makeSelectUpdateUserErrorCode } from '../../containers/App/selectors';

// import SnackbarContent from 'components/SnackbarContent';

const TextFieldWrapper = styled.div`
    padding-bottom: 10px;
`;

const OverlayContainer = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1000;
`;

const OverlayInner = styled.div`
    position: absolute;
    top: 10%;
    text-align: center;
    width: 100%;
`;

const NULL_VALUE = `null`;

const uppy = new Uppy({
    locale: Danish
});

let ext = ["shp", "tab", "geojson", "gml", "kml", "kmz", "mif", "zip", "rar", "dwg", "dgn", "dxf", "csv", "mdb", "accdb"]

let fileArr = [];

//uppy.use(Tus, { endpoint: 'http://localhost:8080/controllers/upload/vector' });
uppy.use(XHRUpload, {
    endpoint: 'http://localhost:8080/controllers/upload/vector',
    formData: true,
    fieldName: 'file',
    withCredentials: true
})

uppy.on('files-added', (files) => {
    files.forEach((file)=>{
        ext.forEach((e)=>{
            if (file.extension.toLowerCase() === e && !fileArr.includes(file.name)) {
                fileArr.push(file.name)
            }
        })
    })
})

uppy.on('complete', (result) => {
    const url = result.successful[0].uploadURL
    console.log(fileArr);

})


export class UploadFileTab extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentWillMount() {
        //this.props.dispatch(createUpdateUserReset());
    }

    componentWillReceiveProps(nextProps) {
    }

    render() {
        let appBaseURL = (process.env.WEBPACK_PUBLIC_PATH ? process.env.WEBPACK_PUBLIC_PATH : `/`);

        let menuItems = [];
        if (this.props.subusers) {
            this.props.subusers.map((item, index) => {
                if (this.state.screenName !== item.screenName) {
                    menuItems.push(<MenuItem key={`option_${index}`} value={item.screenName}>{item.screenName}</MenuItem>);
                }
            });
        }

        let overlayContent = false;
        let errorMessage = false;
        let overlay = false;
        if (overlayContent) {
            overlay = (<OverlayContainer>
                <OverlayInner>
                    {overlayContent}
                    <StyledButtonLink to={appBaseURL}>
                        <Button variant="contained" color="primary">
                            <FormattedMessage id="Dashboard" />
                        </Button>
                    </StyledButtonLink>
                </OverlayInner>
            </OverlayContainer>);
        }


        return (<div style={{position: `relative`}}>
            {overlay}
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Typography variant="h6" color="inherit">
                        Hej
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <FormattedMessage id="containers.UploadFileTab.description"/>
                    </Typography>
                    <div>
                        <Dashboard
                            uppy={uppy}
                            width={'100%'}
                            proudlyDisplayPoweredByUppy={false}
                        />
                    </div>
                </Grid>
            </Grid>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({

});

const withConnect = connect(mapStateToProps);

export default compose(withConnect)(injectIntl(UploadFileTab));
