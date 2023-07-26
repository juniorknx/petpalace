import styles from './styles.module.css'
import logo from '../../assets/logo.svg'
import { Container } from '../Container'

export function Header() {
    return (
        <Container>
            <img src={logo} alt='logo' />
        </Container>
    )
}