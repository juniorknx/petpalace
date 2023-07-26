import styles from './styles.module.css'

export function Input({ labeltitle, ...rest }) {
    return (
        <div className={styles.form__group}>
            {labeltitle && <label>{labeltitle}</label>}
            <input
                {...rest}
            />
        </div>
    )
}