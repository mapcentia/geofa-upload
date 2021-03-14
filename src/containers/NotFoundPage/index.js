import React from 'react';
import StyledLink from '../../components/StyledLink';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const translationPrefix = `containers.NotFoundPage`;

export default function NotFound() {
    let appBaseURL = (process.env.WEBPACK_PUBLIC_PATH ? process.env.WEBPACK_PUBLIC_PATH : `/`);
    return (<div>
        <Typography variant="h3" gutterBottom>
           Not found
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
            Tjek
        </Typography>
        <StyledLink to={appBaseURL}>
            <Button variant="contained" color="primary">
                sds
            </Button>
        </StyledLink>
    </div>);
}
