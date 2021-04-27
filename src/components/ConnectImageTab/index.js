import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

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
                       <p>Her bliver det muligt at tilknytte uploadede billeder til objekter.</p>
                    </Typography>
                    <div><img style={{width: '100%'}} src={'https://i.imgur.com/3x3smno.png'}/></div>
                </Grid>
            </Grid>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(mapStateToProps)(ConnectImageTab);
