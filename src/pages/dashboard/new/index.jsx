import { Container } from '../../../components/Container'
import { Loading } from '../../../components/Loader'
import { HeaderDashboard } from '../../../components/DashBoardHeader'
import styles from './styles.module.css'
import { Input } from '../../../components/Input'
import { FiTrash } from 'react-icons/fi'
import { useState } from 'react'
import PugDraw from '../../../assets/pugdrawer.png'
import { useContext } from 'react'
import { AuthContext } from '../../../contexts/AuthContext'
import { v4 as uuidV4 } from 'uuid'
import { storage, db } from '../../../services/firebaseConfig'
import {
    ref,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore'
import estados from './estados.json'
import cidades from './cidades.json'

export function CadastrarPet() {
    const { user } = useContext(AuthContext)
    const [dogImages, setDogImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [uploadLoading, setUploadLoading] = useState(false)
    const [listaEstados, setListaEstados] = useState(estados.UF);
    const [listaCidades, setListaCidades] = useState(cidades)
    const [formData, setFormData] = useState({
        nome: '',
        sexo: '',
        raca: '',
        idade: '',
        peso: '',
        cidade: '',
        estado: '',
        whatsapp: '',
        description: '',
        available: true,
        photos: []
    })

    const { raca, sexo, peso, idade, nome, cidade, estado, photos, available, description, whatsapp } = formData

    function onChange(e) {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
        }))
    }

    {/* Controla o estado do select */ }
    const handleEstadoChange = (event) => {
        const selectedValue = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            estado: selectedValue
        }));
    };

    const handleCidadeChange = (event) => {
        const selectedValue = event.target.value;
        setFormData((prevState) => ({
            ...prevState,
            cidade: selectedValue
        }));
    };

    {/*Upload files */ }
    async function handleFile(e) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0]
            if (image.type === 'image/jpeg' || image.type === 'image/png') {
                await handleUpload(image)
            } else {
                alert('Envie uma imagem jpeg ou png')
                return
            }
        }
    }

    async function handleUpload(images) {
        setUploadLoading(true)
        if (!user.uid) {
            return
        }

        if (dogImages.length >= 3) {
            alert('Limite máximo de 3 imagens')
            return
        }

        const currentUid = user?.uid
        const uidImage = uuidV4();
        const uploadRef = ref(storage, `images/${currentUid}/${uidImage}`)
        uploadBytes(uploadRef, images)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref).then((downloadUrl) => {
                    console.log(downloadUrl)
                    const imageItem = {
                        name: uidImage,
                        uid: currentUid,
                        previewUrl: URL.createObjectURL(images),
                        url: downloadUrl
                    }

                    setDogImages((images) => [...images, imageItem])
                    console.log('iMAGES ADDED!')
                })
            }).catch((err) => {
                console.log(err, '<=== erro ao adicionar imagem')
            }).finally(() => {
                setUploadLoading(false)
            })
    }

    async function handleDeleteImage(item) {
        const imagePath = `images/${item.uid}/${item.name}`
        const imageRef = ref(storage, imagePath)
        try {
            await deleteObject(imageRef)
            setDogImages(dogImages.filter((dog) => dog.previewUrl !== item.previewUrl))
        } catch (err) {
            console.log(err, 'Erro ao deletar imagem')
        }
    }

    function handleForm(e) {
        e.preventDefault()
        setLoading(true)
        const dogListImage = dogImages.map((dog) => {
            return {
                uid: dog.uid,
                name: dog.name,
                url: dog.url
            }
        })

        addDoc(collection(db, 'pets'), {
            nome: nome?.toUpperCase(),
            sexo: sexo?.toUpperCase(),
            raca: raca?.toUpperCase(),
            idade,
            peso,
            cidade: cidade?.toUpperCase(),
            estado,
            whatsapp,
            images: dogListImage,
            description,
            owner: user?.name,
            uid: user?.uid,
            email: user?.email,
            created: new Date(),
            available: available
        }).then(() => {
            console.log('Data addedd!')
            setFormData({
                nome: '',
                sexo: '',
                raca: '',
                idade: '',
                peso: '',
                cidade: '',
                estado: '',
                whatsapp: '',
                description: '',
                photos: [],
                available: true
            });
            setDogImages([])
        }).catch((err) => {
            console.log(err, 'DATA NOT ADDED')
        }).finally(() => {
            setLoading(false)
        })
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
                            required
                        />

                        <Input
                            type="text"
                            placeholder="Macho/Fêmea"
                            maxlength="5"
                            id="sexo"
                            value={sexo}
                            onChange={onChange}
                            style={{ width: '340px' }}
                            required
                        />

                        <Input
                            type="text"
                            placeholder="Raça"
                            id="raca"
                            value={raca}
                            onChange={onChange}
                            style={{ width: '340px' }}
                            required
                        />

                        <Input
                            type="number"
                            placeholder="Idade"
                            id="idade"
                            value={idade}
                            onChange={onChange}
                            style={{ width: '340px' }}
                            required
                        />

                        <Input
                            type="number"
                            placeholder="Peso"
                            id="peso"
                            value={peso}
                            onChange={onChange}
                            style={{ width: '340px' }}
                        />


                        <div className={styles.selectOptions}>
                            <select value={estado} id="estado" onChange={handleEstadoChange}>
                                <option value="">Selecione UF</option>
                                {listaEstados.map((state) => (
                                    <option key={state.sigla} value={state.sigla}>
                                        {state.sigla}
                                    </option>
                                ))}
                            </select>


                            <input
                                list="cidades-list"
                                value={cidade}
                                onChange={handleCidadeChange}
                                placeholder="Digite uma cidade"
                            />
                            <datalist id="cidades-list">
                                {listaCidades.map((city) => (
                                    <option key={city.id} value={city.Nome} />
                                ))}
                            </datalist>
                        </div>

                        <Input
                            type="text"
                            placeholder="WhatsApp"
                            id="whatsapp"
                            value={whatsapp}
                            onChange={onChange}
                            style={{ width: '340px' }}
                            required
                        />

                        <Input
                            type="file"
                            accept="image/*;capture=camera"
                            id="photos"
                            value={photos}
                            onChange={handleFile}
                            style={{ width: '340px' }}
                            mmultiple="true"
                        />
                        <div className={styles.imagesUploaded}>
                            {uploadLoading === true ? <Loading size={'small'} /> : (
                                dogImages.map(item => (
                                    <div key={item?.name}>
                                        <button onClick={() => handleDeleteImage(item)}>
                                            <FiTrash size={21} color="#000" />
                                        </button>
                                        <img src={item?.previewUrl} alt='Dog Image' />
                                    </div>
                                ))
                            )}
                        </div>

                        <textarea placeholder={`Escreva sobre ${nome}`} name="description" id="description" value={description} onChange={onChange} rows="4" required></textarea>
                    </div>
                    <button type='submit'>
                        {loading ? <Loading size='small' /> : 'Enviar'}
                    </button>
                </form>

            </div>
        </Container>
    )
}