import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { FaSearch } from "react-icons/fa";

export default class Searchbar extends Component {
    state= {
        query: '',
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {value} = e.target.elements.search;

        if(value) {
            this.props.onSubmit(value);
            this.setState({query: ''});
        }
        
    }

    handleChange = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchQuery = form.value; 

        this.setState({query: searchQuery});  
    }
    
    render() {
        return (
            <header className={styles.searchbar}>
                <form className={styles.form} onSubmit={this.handleSubmit}>
                    <button type="submit" className={styles.submitBtn}>
                    <span className={styles.buttonLabel}>
                        <FaSearch />
                    </span>
                    </button>
    
                    <input
                        className={styles.input}
                        name="search"
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        onChange={this.handleChange}
    
                    />
                </form>
            </header>
        )
    }
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};