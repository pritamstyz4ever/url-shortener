import React, { Component } from 'react';
import PropTypes from "prop-types";
export default class Link extends Component {
    render() {
        return (
            <div className="jumbotron">
                <h3><a href={this.props.link}>{this.props.link}</a></h3>
            </div>
        )
    }
    static propTypes = {
        link: PropTypes.string.isRequired
    }
}

