import styles from './styles.module.css'
import { Container } from "../../components/Container";
import { HiSearch } from "react-icons/hi";
import { PiDogFill } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci"
import { db } from "../../services/firebaseConfig"
import { collection, getDocs, orderBy, query } from "firebase/firestore"
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loader'

export function Home() {
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPets() {
            const dogRef = collection(db, "pets")
            const queryRef = query(dogRef, orderBy("created", "desc"))

            getDocs(queryRef)
                .then((snapshot) => {
                    let petList = []
                    snapshot.forEach(doc => {
                        petList.push({
                            id: doc.id,
                            nome: doc.data().nome,
                            cor: doc.data().cor,
                            peso: doc.data().peso,
                            raca: doc.data().raca,
                            idade: doc.data().idade,
                            images: doc.data().images,
                            descricao: doc.data().description,
                            estado: doc.data().estado,
                            cidade: doc.data().cidade,
                            disponivel: doc.data().available,
                            criado: doc.data().created
                        })
                    })
                    setPets(petList)
                    setLoading(false)
                })
        }
        loadPets()
    }, [])

    return (
        <Container>
            <div className={styles.hero__banner}>
                <h1>Todo animal de estimação merece um lar<br></br>
                    <span>Adote</span> um pet hoje
                </h1>
                <div className={styles.subtitle__banner}>
                    <h3>
                        Navegue pelos nossos animais disponíveis e saiba mais sobre o processo de adoção. Juntos, podemos <span>resgatar, reabilitar e realojar animais de estimação necessitados.</span> Obrigado por apoiar nossa missão de levar alegria às famílias por meio da adoção de animais de estimação.
                    </h3>
                </div>

                <div className={styles.search__bar}>
                    <form>
                        <input
                            type='text'
                            placeholder='Pesquisar doguinhos, caramelos e gatos...'
                        />

                        <button type='submit' className={styles.search__button}>
                            <HiSearch size={23} color='#fff' />
                            Buscar
                        </button>
                    </form>
                </div>
                <div className={styles.search__recents}>
                    <span>Buscas recentes: <b>Husky, Golden, Caramelo</b></span>
                </div>
            </div>

            <div className={styles.feed}>
                <div>
                    <h2>Animais para adoção <span>{loading ? <Loading size={'small'} /> : pets.length}</span></h2>
                </div>

                <div className={styles.feed__grid}>
                    {loading ? (
                        <div></div>
                    ) : (
                        pets.map((item) => {
                            return (
                                <div key={item.id} className={styles.feed_card}>
                                    <img src={item.images[0].url} alt={item.raca} loading='lazy'/>
                                    <div className={styles.card__title}>
                                        <PiDogFill size={17} color='#FFBD59' />
                                        <p>{item.nome}</p>
                                    </div>
                                    <div className={styles.card__title}>
                                        <CiLocationOn size={17} color='#FFBD59' />
                                        <p>{item.cidade} - {item.estado}</p>
                                    </div>
                                </div>
                            )
                        })
                    )}
                </div>
            </div>
        </Container>
    )
}