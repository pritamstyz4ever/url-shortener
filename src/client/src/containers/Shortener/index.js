import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { createShortUrl } from "../../actions/action-creator";
import Form from '../../components/common/Form';
import Link from '../../components/common/Link';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';


class Shortener extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shortUrl: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.showShortenerLoading();
        const shortenerForm = document.getElementById('shortenerform');
        const {
            target: originalUrl
        } = shortenerForm.elements;
        const target = originalUrl.value.trim();
        shortenerForm.reset();
        return this.props.createShortUrl({ target });
    }
    render() {
        return (
            <div className="App">
                <Header />
                <div class="jumbotron">
                    <h2>Paste URL to shorten:</h2>
                    <Form onSubmit={this.handleSubmit} />
                </div>
                <div>
                    <Link link={this.state.shortUrl} />
                </div>
                <Footer />
            </div>
        )
    }
    static propTypes = {
        url: PropTypes.shape({
            isShortened: PropTypes.bool.isRequired,
        }).isRequired,
    };
}

// const mapStateToProps = ({
//     url,
// }) => ({
//     url,
// });

function mapStateToProps(state, props) {
    return {
        link: state.links.find(item => item._id === props.id)
    }
}

const mapDispatchToProps = dispatch => ({
    createShortUrl: bindActionCreators(createShortUrl, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Shortener);