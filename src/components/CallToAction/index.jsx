import styles from './styles.module.css'
import { Link } from 'react-router-dom'

export default function Cta() {
    return (
        <div className={styles.cta__container}>
            <h1><span>Adote</span> um Amigo!</h1>
            <h2>Adote um animal e encha sua vida de alegria e amor incondicional. Ao dar um lar a um amigo peludo, você está fazendo a diferença na vida dele e criando memórias que durarão para sempre.</h2>
            <Link to={'/pets'}>
                Ver mais
            </Link>
        </div>
    )
}