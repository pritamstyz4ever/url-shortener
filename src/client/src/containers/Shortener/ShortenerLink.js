import React, { Component } from 'react';
import { connect } from "react-redux";
import { BASE_URL } from "../../helpers/constants";

class ShortenerLink extends Component {
    render() {
        if (this.props.link) {
            let url = `${BASE_URL}/${this.props.link}`
            return (
                <div className="jumbotron">
                    <h3><a href={url}>{url}</a></h3>
                </div>
            )
        }
        return (
            <div> </div>
        );
    }
}

function mapStateToProps(state) {
    console.log(state.shortLink)
    return {
        link: state.shortLink.shortHash
    };
}

export default connect(mapStateToProps)(ShortenerLink);