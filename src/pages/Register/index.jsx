import { Container } from '../../components/Container'
import styles from './styles.module.css'
import PugDraw from '../../assets/pugdrawer.png'
import { Input } from '../../components/Input'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AiOutlineEye } from 'react-icons/ai'
import { AiOutlineEyeInvisible } from 'react-icons/ai'

export function Register() {
    const [visible, setVisible] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        whatsapp: '',
        city: '',
        uf: '',
        password: ''
    });

    const { name, email, phone, whatsapp, city, uf, password } = formData

    const navigate = useNavigate()

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    function handleSubmitForm(e) {
        e.preventDefault()
        console.log(name, email)
    }

    return (
        <Container>
            <div className={styles.register__container}>
                <div className={styles.page__title}>
                    <h1>Registre-se</h1>

                    <h4>Bem-vindo(a) à nossa comunidade de <b>amor</b> pelos cães!</h4>

                    <img src={PugDraw} alt="Welcome" />
                </div>

                <div className={styles.form__container}>
                    <form onSubmit={handleSubmitForm}>
                        <Input
                            type="text"
                            placeholder="Nome e sobrenome"
                            style={{ width: '300px' }}
                            id="name"
                            value={name}
                            onChange={onChange}
                        />

                        <Input
                            type="email"
                            placeholder="E-mail"
                            style={{ width: '300px' }}
                            id="email"
                            value={email}
                            onChange={onChange}
                        />

                        <Input
                            type="Celular"
                            placeholder="(DDD)+Celular"
                            style={{ width: '300px' }}
                            maxLength="11"
                            id="phone"
                            value={phone}
                            onChange={onChange}
                        />

                        <Input
                            type="text"
                            placeholder="WhatsApp"
                            style={{ width: '300px' }}
                            id="whatsapp"
                            value={whatsapp}
                            onChange={onChange}
                        />

                        <Input
                            type="text"
                            placeholder="Cidade"
                            style={{ width: '300px' }}
                            id="city"
                            value={city}
                            onChange={onChange}
                        />

                        <Input
                            type="UF"
                            placeholder="UF"
                            style={{ width: '300px' }}
                            maxLength="2"
                            id="uf"
                            value={uf}
                            onChange={onChange}
                        />

                        <div className={styles.password__input}>
                            <Input
                                type={visible === false ? 'password' : 'text'}
                                placeholder="Senha"
                                style={{ width: '300px' }}
                                id="password"
                                value={password}
                                onChange={onChange}
                            />
                            {visible === false ?  <AiOutlineEye size={20} color='#000' onClick={() => setVisible(!visible)} /> : <AiOutlineEyeInvisible size={20} color='#000' onClick={() => setVisible(!visible)} />}
                        </div>

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