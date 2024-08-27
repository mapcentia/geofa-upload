import React from "react";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {makeSelectUser} from "../../containers/App/selectors";
import config from "../../config";
import {
    Select,
    InputLabel,
    FormControl,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Tooltip
} from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileCopy from '@material-ui/icons/FileCopy';


class GetData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            theme: null,
            format: 'excel'
        }
    }

    handleThemeChange = (event) => {
        this.setState({theme: event.target.value})
    }

    handleFormatChange = (event) => {
        this.setState({format: event.target.value})
    }

    getUrl = () => {
        return `${config.apiUrl}api/v2/sql/${this.props.user.screenName}@fkg?srs=25832&format=${this.state.format}&q=select * from
            fkg.${this.state.theme} where
        cvr_kode=${this.props.user.properties?.cvr_kode}`
    }

    render() {
        return (<div style={{position: `relative`}}>
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
                    <option value={'t_5607_ladefacilitet'}>t_5607_ladefacilitet</option>
                    <option value={'t_5608_cykelknudepunkter'}>t_5608_cykelknudepunkter</option>
                    <option value={'t_5609_cykelknudepunktsstraekninger'}>t_5609_cykelknudepunktsstraekninger</option>
                    <option value={'t_5610_cykelplanlaegning'}>t_5610_cykelplanlaegning</option>
                    <option value={'t_5700_grundej'}>t_5700_grundej</option>
                    <option value={'t_5701_lok_omr'}>t_5701_lok_omr</option>
                    <option value={'t_5702_skorst_fej'}>t_5702_skorst_fej</option>
                    <option value={'t_5705_forp_are'}>t_5705_forp_are</option>
                    <option value={'t_5706_havn_are'}>t_5706_havn_are</option>
                    <option value={'t_5707_grunds'}>t_5707_grunds</option>
                    <option value={'t_5710_born_skole_dis'}>t_5710_born_skole_dis</option>
                    <option value={'t_5711_and_dis'}>t_5711_and_dis</option>
                    <option value={'t_5712_plej_aeldr_dis'}>t_5712_plej_aeldr_dis</option>
                    <option value={'t_5713_prog_stat_dis'}>t_5713_prog_stat_dis</option>
                    <option value={'t_5715_botilbud'}>t_5715_botilbud</option>
                    <option value={'t_5716_servicetilbud'}>t_5716_servicetilbud</option>
                    <option value={'t_5717_hoeringspart'}>t_5717_hoeringspart</option>
                    <option value={'t_5800_fac_pkt'}>t_5800_fac_pkt</option>
                    <option value={'t_5801_fac_fl'}>t_5801_fac_fl</option>
                    <option value={'t_5802_fac_li'}>t_5802_fac_li</option>
                    <option value={'t_6800_parl_fl'}>t_6800_parl_fl</option>
                    <option value={'t_6801_parl_li'}>t_6801_parl_li</option>
                    <option value={'t_6802_parl_pkt'}>t_6802_parl_pkt</option>
                    <option value={'t_6803_parl_omr'}>t_6803_parl_omr</option>
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
                    <option value={'excel'}>Excel</option>
                    <option value={'csv'}>Csv</option>
                    <option value={'geojson'}>GeoJSON</option>
                    <option value={'ogr/ESRI Shapefile'}>ESRI Shapefile</option>
                    <option value={'ogr/GPKG'}>GeoPackage</option>
                    <option value={'ogr/GML'}>GML</option>
                </Select>
            </FormControl>

            <div style={{visibility: this.state.theme ? "visible" : "hidden", marginTop: "15px"}}>
                <Button variant="contained" color="primary" href={this.getUrl()} target={"_blank"}>
                    Hent data som {this.state.format}
                </Button>
                <div style={{marginTop: "20px"}}>
                    <Accordion square>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon/>}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Url til data</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Tooltip title="Kopier til udklipsholderen" placement="left">
                                <Button onClick={() => {
                                    navigator.clipboard.writeText(this.getUrl()).then()
                                }}
                                ><FileCopy/>
                                </Button>
                            </Tooltip>
                            <div>
                                {this.getUrl()}
                            </div>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </div>
        </div>)
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});

export default connect(mapStateToProps)(GetData);
