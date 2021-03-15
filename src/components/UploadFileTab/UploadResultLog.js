import React from "react";
import TextareaAutosize from "@material-ui/core/TextareaAutosize"
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {makeSelectUploadResult} from "../../containers/App/selectors";

export class UploadResultLog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""}
    }

    onChange = (e) => {
        alert(e.target.value)
        this.setState({value: e.target.value + this.props.processRequestSuccess()})
    }

    render() {
        return <TextareaAutosize ref="upload_ref" defaultValue="Her bliver resultatet af seneste upload vist"
                                 onChange={this.onChange}
                                 value={this.state.value} style={{width: '100%', marginTop: "20px"}}/>
    }
}

const mapStateToProps = createStructuredSelector({
    processRequestSuccess: makeSelectUploadResult(),
});

export default connect(mapStateToProps)(UploadResultLog);
