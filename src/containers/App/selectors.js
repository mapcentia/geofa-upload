import {createSelector} from 'reselect';

const selectGlobal = state => state.get('global');

const makeSelectGC2Configuration = () => createSelector(selectGlobal, globalState => globalState.gc2Configuration);
const makeSelectGC2ConfigurationLoading = () => createSelector(selectGlobal, globalState => globalState.gc2ConfigurationLoading);

const makeSelectIsAuthenticating = () => createSelector(selectGlobal, globalState => globalState.isAuthenticating);
const makeSelectIsAuthenticated = () => createSelector(selectGlobal, globalState => globalState.isAuthenticated);
const makeSelectUser = () => createSelector(selectGlobal, globalState => globalState.user);

const makeSelectSigningIn = () => createSelector(selectGlobal, globalState => globalState.signingIn);
const makeSelectSigningInError = () => createSelector(selectGlobal, globalState => globalState.signingInError);

const makeSelectProcessing = () => createSelector(selectGlobal, globalState => globalState.processing);
const makeSelectProcessingError = () => createSelector(selectGlobal, globalState => globalState.processingError);

const makeSelectAvailableDatabasesList = () => createSelector(selectGlobal, globalState => globalState.availableDatabasesList);
const makeSelectAvailableDatabasesUserName = () => createSelector(selectGlobal, globalState => globalState.availableDatabasesUserName);

const makeSelectCreateUser = () => createSelector(selectGlobal, globalState => globalState.createUser);
const makeSelectCreateUserError = () => createSelector(selectGlobal, globalState => globalState.createUserError);

const makeSelectUpdateUserError = () => createSelector(selectGlobal, globalState => globalState.updateUserError);

const makeSelectIsRequesting = () => createSelector(selectGlobal, globalState => globalState.isRequesting);
const makeSelectSubusers = () => createSelector(selectGlobal, globalState => globalState.subusers);
const makeSelectSchemas = () => createSelector(selectGlobal, globalState => globalState.schemas);
const makeSelectConfigurations = () => createSelector(selectGlobal, globalState => globalState.configurations);

const makeSelectCreateConfigurationLoading = () => createSelector(selectGlobal, globalState => globalState.createConfiguration);
const makeSelectCreateConfigurationError = () => createSelector(selectGlobal, globalState => globalState.createConfigurationError);

const makeSelectUpdateConfigurationLoading = () => createSelector(selectGlobal, globalState => globalState.updateConfiguration);
const makeSelectUpdateConfigurationError = () => createSelector(selectGlobal, globalState => globalState.updateConfigurationError);

const makeSelectUploadResult = () => createSelector(selectGlobal, globalState => {
        if (typeof globalState.track === "undefined") {
            globalState.track = "";
        }
        if (typeof globalState.uploadResult !== "undefined") {
            globalState.track = globalState.uploadResult + "\n" + globalState.track;
            return globalState.track;
        }
    }
);


export {
    selectGlobal,

    makeSelectGC2Configuration,
    makeSelectGC2ConfigurationLoading,

    makeSelectIsAuthenticating,
    makeSelectIsAuthenticated,
    makeSelectUser,
    makeSelectSigningIn,
    makeSelectSigningInError,

    makeSelectProcessing,
    makeSelectProcessingError,

    makeSelectCreateUser,

    makeSelectAvailableDatabasesList,
    makeSelectAvailableDatabasesUserName,

    makeSelectCreateUserError,

    makeSelectUpdateUserError,
    makeSelectIsRequesting,
    makeSelectSubusers,
    makeSelectSchemas,
    makeSelectConfigurations,

    makeSelectCreateConfigurationLoading,
    makeSelectCreateConfigurationError,

    makeSelectUpdateConfigurationLoading,
    makeSelectUpdateConfigurationError,

    makeSelectUploadResult,
};
