import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import config from './../../config'

const LogoWrapper = styled.div`
  max-height: 200px;
  max-widht: 200px;
  padding-bottom: 40px;
`;

const wrapper = (props) => {
    const {children} = props;
    let prefix = config.homepage;
    return (<Card style={{maxWidth: `400px`}}>
        <CardContent>
            <LogoWrapper>
                <img src={prefix + "GeoDanmark-logo-pos.png"} style={{maxWidth: `150px`, height: `auto`}}/>
            </LogoWrapper>
            <Typography variant="h5" gutterBottom>
                GeoFA-editor
            </Typography>
            <div>
                {children}
            </div>
        </CardContent>
    </Card>);
}

export default wrapper;
