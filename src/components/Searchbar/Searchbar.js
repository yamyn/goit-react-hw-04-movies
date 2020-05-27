import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { section, form, wrap, icon, input } from './Searchbar.module.css';

export default class SearchBar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = { query: '' };

    handleChange = event => {
        this.setState({ query: event.target.value });
    };

    handleSubmit = event => {
        event.preventDefault();

        this.props.onSubmit(this.state.query);

        this.setState({
            query: '',
        });
    };

    render() {
        const { query } = this.state;
        return (
            <section className={section}>
                <div className="container">
                    <form className={form} onSubmit={this.handleSubmit}>
                        <div className={wrap}>
                            <div>
                                <label htmlFor="form_input">
                                    <i className={`${icon} material-icons`}>
                                        search
                                    </i>
                                </label>
                            </div>
                            <div>
                                <input
                                    id="form_input"
                                    type="text"
                                    placeholder="Write movie name and click Enter"
                                    className={input}
                                    value={query}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </section>
        );
    }
}
