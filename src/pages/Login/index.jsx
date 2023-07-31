import { useState, useEffect } from 'react'
import { Container } from '../../components/Container'
import styles from './styles.module.css'
import PugDraw from '../../assets/pugdrawer.png'
import { Input } from '../../components/Input'
import { Link } from 'react-router-dom'
import { auth } from '../../services/firebaseConfig'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

export function Login() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [visible, setVisible] = useState(false)
    const [loading, setLoading] = useState(false)
    const { email, password } = formData

    useEffect(() => {
        async function handleLogout() {
            await signOut(auth)
        }

        handleLogout()
    }, [])

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    function handleLogin(e) {
        e.preventDefault()
        setLoading(true)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                navigate("/dashboard")
            }).catch((err) => {
                console.log(err)
            }).finally(() => {
                console.log('Log in succeced!')
                setLoading(false)
            })
    }

    return (
        <Container>
            <div className={styles.login__container}>
                <div className={styles.page__title}>
                    <h1>Entrar</h1>
                    <img src={PugDraw} alt="Welcome" />
                </div>

                <div className={styles.form__container}>
                    <form onSubmit={handleLogin}>
                        <Input
                            type="text"
                            placeholder="E-mail"
                            style={{ width: '300px' }}
                            id="email"
                            value={email}
                            onChange={onChange}
                            required
                        />

                        <Input
                            type="password"
                            placeholder="Senha"
                            style={{ width: '300px' }}
                            id="password"
                            value={password}
                            onChange={onChange}
                            required
                        />

                        <div>
                            <button type='submit' className={styles.login__button}>
                                {loading === true ? 'Entrando...' : 'Login'}
                            </button>
                        </div>

                        <div className={styles.register__link}>
                            <p>Ainda <b>não</b> possui uma conta? <Link to="/cadastre-se">Cadastre-se</Link> </p>
                        </div>
                    </form>
                </div>
            </div>
        </Container>
    )
}