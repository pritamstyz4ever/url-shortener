import React, { Component } from 'react';
import PropTypes from "prop-types";

export default class Form extends Component {
    render() {
        return (
            <form id="shortenerForm" encType='application/json' action="/url" method="post" onSubmit={this.props.handleSumbit}>
                <div className="form-group">
                    <input id="target" tabIndex="1" className="form-control -" type="text" placeholder="Url" value={this.props.link} />
                </div>
                <button type="submit" className="btn btn-default" onClick={this.props.handleSumbit}>Shorten</button>
            </form>
        )
    }
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    }
}
