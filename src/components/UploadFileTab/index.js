import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import {Dashboard} from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Danish from '@uppy/locales/lib/da_DK'
import StyledButtonLink from '../StyledButtonLink';
import UploadResultLog from "./UploadResultLog";
import config from './../../config';
import {createStructuredSelector} from "reselect";
import {makeSelectUploadResult} from "../../containers/App/selectors";
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

const uppy = new Uppy({
    locale: Danish
});

let ext = ["shp", "tab", "geojson", "gml", "kml", "kmz", "mif", "zip", "rar", "dwg", "dgn", "dxf", "csv", "mdb", "accdb", "gpkg"]

let fileArr = [];

uppy.use(XHRUpload, {
    endpoint: `${config.apiUrl}controllers/upload/vector`,
    formData: true,
    fieldName: 'file',
    withCredentials: true
})

uppy.on('files-added', (files) => {
    files.forEach((file) => {
        ext.forEach((e) => {
            if (file.extension.toLowerCase() === e && !fileArr.includes(file.name)) {
                fileArr.push(file.name)
            }
        })
    })
})


class UploadFileTab extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""}
    }

    componentWillMount() {
        uppy.on('complete', (result) => {
            fileArr.forEach(fileName => {
                this.props.onProcess({fileName: fileName});
            })
            fileArr = [];
        })

    }

    render() {
        let appBaseURL = config.homepage;
        let menuItems = [];
        if (this.props.subusers) {
            this.props.subusers.map((item, index) => {
                if (this.state.screenName !== item.screenName) {
                    menuItems.push(<MenuItem key={`option_${index}`}
                                             value={item.screenName}>{item.screenName}</MenuItem>);
                }
            });
        }
        let overlayContent = false;
        let overlay = false;
        if (overlayContent) {
            overlay = (<OverlayContainer>
                <OverlayInner>
                    {overlayContent}
                    <StyledButtonLink to={appBaseURL}>
                        <Button variant="contained" color="primary">
                            text
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
                        Upload GIS- og billedfiler
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        en anden tekst
                    </Typography>
                    <div>
                        <Dashboard
                            uppy={uppy}
                            width={'100%'}
                            proudlyDisplayPoweredByUppy={false}
                        />
                    </div>
                    <div><TextareaAutosize  defaultValue="Her bliver resultatet af seneste upload vist"
                                           value={this.props.processRequestSuccess} style={{width: '100%', marginTop: "20px"}}/>
                    </div>
                </Grid>
            </Grid>
        </div>);
    }
}
const mapStateToProps = createStructuredSelector({
    processRequestSuccess: makeSelectUploadResult(),
});

export default connect(mapStateToProps)(UploadFileTab);
