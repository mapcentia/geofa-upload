import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {makeSelectUploadResult} from "../../containers/App/selectors";

export class UploadResultLog extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <TextareaAutosize  defaultValue="Her bliver resultatet af seneste upload vist" value={this.props.processRequestSuccess} style={{width: '100%', marginTop: "20px"}}/>
    }
}

const mapStateToProps = createStructuredSelector({
    processRequestSuccess: makeSelectUploadResult(),
});

export default connect(mapStateToProps)(UploadResultLog);
