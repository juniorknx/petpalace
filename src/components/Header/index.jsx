import styles from './styles.module.css'
import logo from '../../assets/logo.svg'
import { Container } from '../Container'
import { Link } from 'react-router-dom'

export function Header() {
    return (
        <Container>
            <header className={styles.header__container}>
                <img src={logo} alt='logo' />

                <nav>
                    <Link to={'/'} className={styles.nav__link}>
                        Início
                    </Link>

                    <Link to={'/'} className={styles.nav__link}>
                        Adote
                    </Link>

                    <Link to={'/'} className={styles.nav__link}>
                        Ajude-me
                    </Link>
                </nav>

                <div>
                    <button>
                        <Link to="/login">
                            Login
                        </Link>
                    </button>
                </div>
            </header>
        </Container>
    )
}