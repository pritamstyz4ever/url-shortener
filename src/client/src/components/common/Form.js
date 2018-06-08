import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Form extends Component {
    render() {
        return (
            <form enctype='application/json' action="/url" method="post" onSubmit={() => this.props.handleSumbit}>
                <div class="form-group">
                    <input tabIndex="1" className="form-control -" type="text" placeholder="Url" value="https://jobs.cisco.com/jobs/SearchJobs/?3_19_3=163&3_12_3=187" />
                </div>
                <button type="submit" class="btn btn-default" onClick={() => this.props.handleSumbit}>Shorten</button>
            </form>
        )
    }
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    }
}
