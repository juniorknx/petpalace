import styles from './styles.module.css'
import { Container } from '../../components/Container'
import { HeaderDashboard } from '../../components/DashBoardHeader'

export function Dashboard() {
    return (
        <Container>
            <HeaderDashboard />

            <div className=''>
                { /* Pets Cadastrados */}
            </div>
        </Container>
    )
}