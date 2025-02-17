import styles from './Button.module.css';

const Button = ({onClick}) => {
    return <button className={styles.button} onClick={onClick}>Load More</button>
}

export default Button;