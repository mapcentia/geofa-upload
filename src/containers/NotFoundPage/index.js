import React from 'react';
import StyledLink from '../../components/StyledLink';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import config from './../../config'

export default function NotFound() {
    let appBaseURL = config.homepage;
    return (<div>
        <Typography variant="h3" gutterBottom>
           Ikke fundet
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            Tjek adressen eller kontakt supporten
        </Typography>
        <StyledLink to={appBaseURL}>
            <Button variant="contained" color="primary">
                Til forside
            </Button>
        </StyledLink>
    </div>);
}
