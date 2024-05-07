import React from "react";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import config from "../../config";
import {makeSelectGC2Configuration, makeSelectUser} from "../../containers/App/selectors";
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import {Button, FormControl, InputLabel, Select} from "@material-ui/core";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';


class TemplateDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: null,
            format: 'ESRI Shapefile'
        }
    }

    handleThemeChange = (event) => {
        this.setState({theme: event.target.value})
    }

    handleFormatChange = (event) => {
        this.setState({format: event.target.value})
    }
    getUrl = () => {
        return `${config.apiUrl}extensions/fkgupload/api/template/${this.state.theme}/${this.state.format}`;
    }

    render() {
        return (<Dialog aria-labelledby="simple-dialog-title" open={this.props.open}>
            <DialogTitle id="simple-dialog-title">Hent skabelon-fil</DialogTitle>
            <DialogContent>

                <FormControl required variant="filled">
                    <InputLabel htmlFor="filled-age-native-simple">Tema</InputLabel>
                    <Select
                        native
                        value={this.state.theme}
                        onChange={this.handleThemeChange}
                        inputProps={{
                            name: 'Tema',
                            id: 'theme',
                        }}
                    >
                        <option aria-label="None" value=""/>
                        <option value={'t_5710_born_skole_dis'}>t_5710_born_skole_dis</option>
                        <option value={'t_5711_and_dis'}>t_5711_and_dis</option>
                        <option value={'t_5712_plej_aeldr_dis'}>t_5712_plej_aeldr_dis</option>
                        <option value={'t_5713_prog_stat_dis'}>t_5713_prog_stat_dis</option>
                        <option value={'t_5800_fac_pkt'}>t_5800_fac_pkt</option>
                        <option value={'t_5801_fac_fl'}>t_5801_fac_fl</option>
                        <option value={'t_5802_fac_li'}>t_5802_fac_li</option>
                        <option value={'t_5607_ladefacilitet'}>t_5607_ladefacilitet</option>
                        <option value={'t_5608_cykelknudepunkter'}>t_5608_cykelknudepunkter</option>
                        <option value={'t_5609_cykelknudepunktsstraekninger'}>t_5609_cykelknudepunktsstraekninger
                        </option>
                        <option value={'t_5610_cykelplanlaegning'}>t_5610_cykelplanlaegning</option>
                        <option value={'t_5700_grundej'}>t_5700_grundej</option>
                        <option value={'t_5701_lok_omr'}>t_5701_lok_omr</option>
                    </Select>
                </FormControl>
                <FormControl required variant="filled" style={{marginLeft: '10px'}}>
                <InputLabel htmlFor="filled-age-native-simple">Format</InputLabel>
                    <Select
                        native
                        value={this.state.format}
                        onChange={this.handleFormatChange}
                        inputProps={{
                            name: 'Format',
                            id: 'format',
                        }}
                    >
                        <option value={'ESRI Shapefile'}>ESRI Shapefile</option>
                        <option value={'MapInfo File'}>MapInfo File</option>
                        <option value={'GPKG'}>GeoPackage</option>
                        <option value={'GML'}>GML</option>
                        <option value={'geojson'}>GeoJSON</option>
                        <option value={'ESRI Xml Workspace'}>ESRI Xml Workspace</option>
                    </Select>
                </FormControl>
                <DialogActions>
                    <Button onClick={this.props.close} color="primary">
                        Afbryd
                    </Button>
                    <Button disabled={!this.state.theme} href={this.getUrl()} onClick={this.props.close}
                            target={"_blank"}>
                        Hent skabelon
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    gc2Configuration: makeSelectGC2Configuration(),
});

export default connect(mapStateToProps)(TemplateDialog);
