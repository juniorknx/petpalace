import { Container } from '../../components/Container'
import styles from './styles.module.css'
import PugDraw from '../../assets/pugdrawer.png'

export function Register() {
    return (
        <Container>
            <div className={styles.register__container}>
                <div className={styles.page__title}>
                    <h1>Registre-se</h1>

                    <h4>Bem-vindo(a) à nossa comunidade de <b>amor</b> pelos cães!</h4>

                    <img src={PugDraw} alt="Welcome" />
                </div>
            </div>
        </Container>
    )
}