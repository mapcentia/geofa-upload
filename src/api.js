/**
 * Interacting with GC2 REST API
 */

import axios from 'axios';
import config from './config';

const checkAuthorizationCall = () => {
    return axios.get(`${config.apiUrl}session`, {withCredentials: true});
};

const signInCall = (action) => {
    return axios.post(`${config.apiUrl}session/start`, action.payload, {withCredentials: true});
};

const getDatabasesCall = (action) => {
    return axios.get(`${config.apiUrl}database/search?userIdentifier=${action.payload}`, {withCredentials: true});
};

const getGC2ConfigurationCall = () => {
    return axios.get(`${config.apiUrl.replace(`/api/v2/`, `/api/v1/`)}baselayerjs?format=json`, {withCredentials: true});
};

const processCall = (action) => {
    return axios.post(`${config.apiUrl}/test`, action.payload, {withCredentials: true});
};

const updateUserCall = (action) => {
    let data = {};
    if (action.payload.data && action.payload.data.oldPassword) {
        data.currentPassword = action.payload.data.oldPassword;
        data.password = action.payload.data.newPassword;
    } else {
        if (action.payload.data.password) data.password = action.payload.data.password;
        if (action.payload.data.usergroup) data.usergroup = (action.payload.data.usergroup === `null` ? `` : action.payload.data.usergroup);
    }

    return axios.put(`${config.apiUrl}user/${action.payload.screenName}`, data, {
        withCredentials: true,
        validateStatus: (status) => {
            return (status == 200 || status === 403);
        }
    });
};

const getSubusersCall = (action) => {
    return axios.get(`${config.apiUrl}user/${action.payload.screenName}/subusers`, {withCredentials: true});
}

const getSchemasCall = () => {
    return axios.get(`${config.apiUrl}database/schemas`, {withCredentials: true});
}

const getConfigurationsCall = (action) => {
    return axios.get(`${config.apiUrl}configuration/${action.payload.userId}`, {withCredentials: true});
}

const deleteConfigurationCall = (action) => {
    return axios.delete(`${config.apiUrl}configuration/${action.payload.userId}/${action.payload.configurationId}`, {withCredentials: true});
}

export {
    checkAuthorizationCall,
    signInCall,
    updateUserCall,
    getSubusersCall,
    getSchemasCall,
    getConfigurationsCall,
    getDatabasesCall,
    deleteConfigurationCall,
    getGC2ConfigurationCall,
    processCall
};
