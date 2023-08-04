import { Container } from '../../../components/Container'
import { HeaderDashboard } from '../../../components/DashBoardHeader'
import styles from './styles.module.css'
import { Input } from '../../../components/Input'
import { useState } from 'react'
import PugDraw from '../../../assets/pugdrawer.png'

export function CadastrarPet() {
    const [formData, setFormData] = useState({
        nome: '',
        raca: '',
        cor: '',
        idade: '',
        peso: '',
        cidade: '',
        estado: '',
        whatsapp: '',
        email: '',
        description: '',
        owner: '',
        available: true,
        photos: []
    })

    const { raca, cor, peso, idade, nome, cidade, estado, owner, photos, available, description, whatsapp, email } = formData

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    function handleForm(e) {
        e.preventDefault()
        console.log(formData)
    }

    return (
        <Container>
            <HeaderDashboard />

            <div className={styles.header__cadastro_pet}>
                { /* CONTENT HEADER */}
                <h2>Cadastre-seu PET</h2>
                <img src={PugDraw} alt='Doguinho' />
            </div>
            <div className={styles.form__cadastro__container}>
                <form onSubmit={handleForm}>
                    <div className={styles.form__divider_flx}>
                        <Input
                            type="text"
                            placeholder="Nome"
                            id="nome"
                            value={nome}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="text"
                            placeholder="Raça"
                            id="raca"
                            value={raca}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="text"
                            placeholder="Cor"
                            id="cor"
                            value={cor}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="text"
                            placeholder="Idade"
                            id="idade"
                            value={idade}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="text"
                            placeholder="Peso"
                            id="peso"
                            value={peso}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="text"
                            placeholder="Cidade"
                            id="cidade"
                            value={cidade}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="text"
                            placeholder="Estado"
                            id="estado"
                            value={estado}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="text"
                            placeholder="WhatsApp"
                            id="whatsapp"
                            value={whatsapp}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />

                        <Input
                            type="file"
                            accept="image/*"
                            id="photos"
                            value={photos}
                            onChange={() => { }}
                            style={{ width: '340px' }}
                        />

                        <textarea name="description" id="description" value={description} onChange={onChange} cols="47" rows="5"></textarea>
                    </div>
                    <button type='submit'>
                        enviar
                    </button>
                </form>
            </div>
        </Container>
    )
}