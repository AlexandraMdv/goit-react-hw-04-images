import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Searchbar.module.css';
import { FaSearch } from "react-icons/fa";

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const {value} = e.target.elements.search;

        if(value) {
            onSubmit(value);
            setQuery('');
        }
        
    }

    const handleChange = (e) => {
        e.preventDefault();
        const form = e.target;
        const searchQuery = form.value; 

        setQuery(searchQuery);  
    }
    
    return (
        <header className={styles.searchbar}>
            <form className={styles.form} onSubmit={handleSubmit}>
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
                    value={query}
                    onChange={handleChange}

                />
            </form>
        </header>
    );
}


Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};