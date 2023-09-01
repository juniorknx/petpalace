import styles from './styles.module.css'
import logo from '../../assets/logo.svg'
import { Container } from '../Container'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { FaRegUserCircle } from 'react-icons/fa'

export function Header() {

    const { signed, user } = useContext(AuthContext)

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
                </nav>

                <div>
                    {!signed && <button>
                        <Link to="/login">
                            Login
                        </Link>
                    </button>}

                    {signed &&
                        <div className={styles.profile__container}>
                            <div className={styles.avatar}>
                                <FaRegUserCircle size={25} color='#000' />
                            </div>
                            <div className={styles.username__container}>
                                <Link to="/dashboard">
                                    <span>Olá {user.name}</span>
                                    <p>Minha Conta</p>
                                </Link>
                            </div>
                        </div>
                    }
                </div>
            </header>
        </Container>
    )
}