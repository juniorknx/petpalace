import styles from './styles.module.css';

export function Loading({ size }) {
    const combinedClass = `${styles[size]}`;
    return <span className={combinedClass}></span>;
}