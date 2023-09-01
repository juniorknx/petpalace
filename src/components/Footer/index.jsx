import { Container } from "../Container";
import { Link } from "react-router-dom";
import logo from '../../assets/logo.svg'
import styles from './styles.module.css'
import github from '../../assets/github.svg'

export default function Footer() {
    return (
        <footer>
            <Container>
                <div className={styles.footer_container_logo}>
                    <img src={logo} alt="Logo" />
                </div>

                <div className={styles.footer_menu}>
                    <nav>
                        <Link to={'/'}>
                            Início
                        </Link>

                        <Link to={'/'}>
                            Adote
                        </Link>

                        <Link to={'/'}>
                            Quem somos
                        </Link>
                    </nav>
                </div>
            </Container>
            <div className={styles.about_autor}>
                <div>
                    <span>Desenvolvido por: <b>Julio</b></span>
                </div>

                <div>
                    <a href="https://github.com/juniorknx" target="__blank">
                        <img src={github} alt="GitHub" />
                    </a>
                </div>
            </div>
        </footer>
    )
}