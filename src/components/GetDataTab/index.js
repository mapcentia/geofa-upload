import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import LaunchIcon from '@material-ui/icons/Launch';
import StyledExternalLink from './../../components/StyledExternalLink';
import GetData from "./GetData";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {makeSelectUser, makeSelectGC2Configuration} from "../../containers/App/selectors";
import config from "../../config";

class GetDataTab extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div style={{position: `relative`}}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Typography variant="h5" color="inherit">
                        Hent data
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <p>Her er oplysninger om, hvordan data kan hentes og editeres i GeoFA-databasen.</p>
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        GeoFA-webkortet
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <p>GeoFA-webkortet giver dig mulighed for at se og editere data.</p>
                        <StyledExternalLink href={`${this.props.gc2Configuration.gc2Options.vidiUrl}${config.vidiUri}`}
                                            target="_blank" style={{marginRight: `10px`}}>
                            <Button color="primary" variant="contained" size="small">
                                <LaunchIcon/> Start kortet
                            </Button>
                        </StyledExternalLink>
                    </Typography>
                    <Typography variant="h5" color="inherit" style={{"marginTop": "40px"}}>
                        WFS og WFS-T
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <p>WFS 2.0:<br/>{config.apiUrl}ows/fkg/fkg</p>
                        <p>WFS-t 1.1:<br/>{config.apiUrl}wfs/{this.props.user.screenName}@fkg/fkg/25832</p>
                        <p>Brugernavn til WFS-T er:<br/>{this.props.user.screenName}@fkg</p>
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        Download af datafiler
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <p>Her kan du downloade data.</p>
                        <GetData/>
                    </Typography>

                </Grid>
            </Grid>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    gc2Configuration: makeSelectGC2Configuration(),
});

export default connect(mapStateToProps)(GetDataTab);
