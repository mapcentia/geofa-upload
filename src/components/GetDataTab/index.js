import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

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
                        <p>Her er oplysninger på, hvordan data kan hentes og editeres fra
                            GeoFA databasen.</p>
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        Se og editer data
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <p>Her kan du se og editere enkelt-objekter i webkort-løsning.</p>
                        <p>Vejledning</p>
                    </Typography>
                    <Typography variant="h6" color="inherit">
                        WFS og WFS-T
                    </Typography>
                    <Typography variant="body1" color="inherit" style={{paddingTop: `10px`}}>
                        <p>WFS 2.0: ....</p>
                        <p>WFS-t 1.1: ....</p>
                    </Typography>

                </Grid>
            </Grid>
        </div>);
    }
}

const mapStateToProps = createStructuredSelector({});

export default connect(mapStateToProps)(GetDataTab);
