import styles from './styles.module.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { auth } from '../../services/firebaseConfig'
import { signOut } from 'firebase/auth'
import { IoExitOutline } from 'react-icons/io5'

export function HeaderDashboard() {

    const navigate = useNavigate()

    function handleLogout() {
        signOut(auth)
        navigate('/')
    }

    return (
        <header className={styles.dashboard__header}>
            <nav>
                <div>
                    <Link to={'/dashboard'}>
                        Dashboard
                    </Link>

                    <Link to={'/dashboard/cadastrar'}>
                        Cadastrar PET
                    </Link>
                </div>

                <div className={styles.sign__out}>
                    <button onClick={handleLogout}>
                        Logout
                        <IoExitOutline size={23} color="#000" />
                    </button>
                </div>
            </nav>
        </header>
    )
}