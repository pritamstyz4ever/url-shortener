import React, { Component } from 'react';
import { connect } from "react-redux";
import { createShortUrl, getUrl } from "../../actions/action-creator";
import Form from '../../components/common/Form';
import ShortnerLink from './ShortenerLink';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import validateInput from '../../validations/linkform';
import { Redirect } from 'react-router-dom';

class ShortenerForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: this.props.link ? this.props.link._id : null,
            link: this.props.link ? this.props.link.url : '',
            errors: {},
            loading: false,
            shortLink: '',
            redirect: false
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    // componentWillReceiveProps = (nextProps) => {
    //     this.setState({
    //         _id: nextProps.link._id,
    //         link: nextProps.link.url
    //     })
    // };

    componentDidMount = () => {
        const { match } = this.props;
        if (match.params._id) {
            this.props.getUrl(match.params._id)
                .then(() => {
                    this.setState({ loading: false, redirect: true })
                })
                .catch((err) => {
                    this.setState({ errors: err, loading: false })
                });
        }
    };

    isValid() {
        const { errors, isValid } = validateInput(this.state);
        if (!isValid) {
            this.setState({ errors });
        }
        return isValid;
    }

    handleChange = (e) => {
        if (!!this.state.errors[e.target.name]) {
            const errors = Object.assign({}, this.state.errors);
            delete errors[e.target.name];
            this.setState({
                [e.target.name]: e.target.value,
                errors
            });
        } else {
            this.setState({ [e.target.name]: e.target.value });
        }
    };

    handleSubmit(e) {
        e.preventDefault();
        const { _id, link } = this.state;
        console.log(link)
        this.setState({ loading: true });

        if (this.isValid()) {
            this.props.createShortUrl({ link })
                .then(
                    () => {
                        this.setState({ link: '', loading: false })
                    })
                .catch(
                    (err) => {
                        this.setState({ errors: err, loading: false })
                    });
        }

    }
    render() {
        if (this.state.redirect && this.props.link && this.props.link.url) {
            window.location.href = this.props.link.url;
            // return (
            //     <Redirect to={`/${this.props.link.url}`} />
            //  )
        } else {
            return (

                <div className="App">
                    <Header />
                    <div className="jumbotron">
                        <h2>Paste URL to shorten:</h2>
                        {/* <Form handleSubmit={this.handleSubmit} link={this.state.link.url} /> */}
                        <form id="shortenerForm" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor='link'>Link</label>
                                <input
                                    tabIndex="1"
                                    name='link'
                                    className="form-control"
                                    type="text"
                                    placeholder="Enter your long url here!"
                                    value={this.state.link}
                                    onChange={this.handleChange}
                                    id="link" />
                                <span>{this.state.errors.link}</span>
                            </div>
                            <button type="submit" className="btn btn-default">Shorten</button>
                        </form>
                    </div>
                    <div>
                        <ShortnerLink />
                    </div>
                    <Footer />
                </div>
            )
        }
    }
}


function mapStateToProps(state, props) {
    if (state.link) {
        return {
            link: state.link
        }
    }
    return {};
}


export default connect(mapStateToProps, { createShortUrl, getUrl })(ShortenerForm);