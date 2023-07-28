import { Container } from '../../components/Container'
import styles from './styles.module.css'
import PugDraw from '../../assets/pugdrawer.png'
import { Input } from '../../components/Input'

export function Register() {
    return (
        <Container>
            <div className={styles.register__container}>
                <div className={styles.page__title}>
                    <h1>Registre-se</h1>

                    <h4>Bem-vindo(a) à nossa comunidade de <b>amor</b> pelos cães!</h4>

                    <img src={PugDraw} alt="Welcome" />
                </div>

                <div className={styles.form__container}>
                    <form>
                        <Input
                            type="text"
                            placeholder="Nome e sobrenome"
                            style={{ width: '300px' }}
                        />

                        <Input
                            type="email"
                            placeholder="E-mail"
                            style={{ width: '300px' }}
                        />

                        <Input
                            type="Celular"
                            placeholder="(DDD)+ Celular"
                            style={{ width: '300px' }}
                            maxlength="11"
                        />

                        <Input
                            type="text"
                            placeholder="WhatsApp"
                            style={{ width: '300px' }}
                        />

                        <Input
                            type="text"
                            placeholder="Cidade"
                            style={{ width: '300px' }}
                        />

                        <Input
                            type="UF"
                            placeholder="UF"
                            style={{ width: '300px' }}
                            maxlength="2"
                        />

                        <Input
                            type="password"
                            placeholder="Senha"
                            style={{ width: '300px' }}
                        />

                        <div>
                            <button type='submit' className={styles.register__button}>
                                Cadastrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}