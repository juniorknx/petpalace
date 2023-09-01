import styles from './styles.module.css'

export default function InfoCards({icon, text}){
    return (
        <div className={styles.card_container}>
            <img src={icon} alt="Adote!" />
            <p>{text}</p>
        </div>
    )
}