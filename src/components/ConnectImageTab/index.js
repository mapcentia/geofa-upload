import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import config from "../../config";
import {makeSelectGC2Configuration, makeSelectUser} from "../../containers/App/selectors";

class ConnectImageTab extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (<div style={{position: `relative`}}>
            <Grid container spacing={24}>
                <Grid item md={12}>
                    <Typography variant="h6" color="inherit">
                       Tilknyt billeder
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                       <p>Her kan du tilknytte billeder til GeoFA objekter. Start med at tænde laget, som du vil tilknyte billeder til. Derefter klik på et objekt og tilknyt billeder.</p>
                    </Typography>
                    <div><iframe allowFullScreen style={{width: '100%', height: '600px'}} src={`${this.props.gc2Configuration.gc2Options.vidiUrl}${config.vidiUriPhoto}`}/></div>
                </Grid>
            </Grid>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser(),
    gc2Configuration: makeSelectGC2Configuration(),
});

export default connect(mapStateToProps)(ConnectImageTab);
