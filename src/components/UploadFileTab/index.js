import React from 'react';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import Checkbox from "@material-ui/core/Checkbox"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Uppy from '@uppy/core'
import XHRUpload from '@uppy/xhr-upload'
import {Dashboard} from '@uppy/react'
import '@uppy/core/dist/style.css'
import '@uppy/dashboard/dist/style.css'
import Danish from '@uppy/locales/lib/da_DK'
import StyledButtonLink from '../StyledButtonLink';
import config from './../../config';
import {createStructuredSelector} from "reselect";
import {makeSelectUploadResult} from "../../containers/App/selectors";
import Alert from "@material-ui/lab/Alert";
import MainContentWrapper from "../MainContentWrapper";
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

let ext = ["shp", "tab", "geojson", "gml", "kml", "kmz", "mif", "zip", "rar", "dwg", "dgn", "dxf", "csv", "mdb", "accdb", "gpkg", "png", "jpg", "jpeg"]

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
        this.state = {delete: false}
    }

    componentWillMount() {
        uppy.on('complete', (result) => {
            fileArr.forEach(fileName => {
                this.props.onProcess({fileName: fileName, delete: this.state.delete});
            })
            fileArr = [];
        })

    }

    handleChangeDelete = (event) => {
        this.setState({delete: event.target.checked});
    };

    render() {
        return (<div style={{position: `relative`}}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Typography variant="h6" color="inherit">
                        Indlæs og ajourfør data/billeder
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <p>Det er her muligt at uploade GIS- og billedfiler.</p>
                        <p>Skal du i gang med et nyt tema, kan du kan hente skabelon-filer her. [Kommer snart]</p>
                        <p>Værd opmærksom på:</p>
                        <ul>
                            <li>At hvis feltet objekt_id er tomt, så vil det blive betragtet som et nyt objekt og
                                indlæst.
                            </li>
                            <li>At hvis feltet objekt_id er udfyldt, så vil objektet blive betragtet som et eksisterende
                                objekt og blive ajourført (hvis objekt_id ikke findes i databasen, vil objektet ikke
                                blive indlæst).
                            </li>
                            <li>At sættes der flueben i "Slet objekter som ikke er i uploadede data", så bliver
                                eksisterende objekter med objekt_id'er, der ikke er i de uploadede data, slettet (pas
                                på, og overvej at hente backup af de data, som er i databasen under fanen "Hent data")
                            </li>
                        </ul>
                        <p>Nederst kan loggen ses for uploadede filer. Her vil evt. fejl også blive vist.</p>
                    </Typography>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.delete}
                                onChange={this.handleChangeDelete}
                                name="delete"
                                color="primary"
                            />
                        }
                        label="Slet objekter som ikke er i uploadede data"
                    />
                    <Alert style={{marginBottom: "10px"}} severity="warning">Ved sletning, så pas på, og overvej at
                        hente backup af de data, som er i databasen under fanen "Hent data"</Alert>
                    <div>
                        <Dashboard
                            uppy={uppy}
                            width={'100%'}
                            proudlyDisplayPoweredByUppy={false}
                            note="Der kan uploades jpg, shp, gml, tab, geojson, gpkg og zip filer"
                        />
                    </div>
                    <Button onClick={() => {
                        this.props.onReset();
                    }}>Nulstil log</Button>
                    <div><TextareaAutosize defaultValue="Her bliver resultatet af seneste upload vist"
                                           value={this.props.processRequestSuccess}
                                           style={{width: '100%', marginTop: "20px"}}/>
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
