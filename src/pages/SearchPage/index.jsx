import { useParams } from "react-router-dom"
import { collection, addDoc, getDocs, orderBy, query, where, limit } from "firebase/firestore"
import { MdOutlinePets } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci"
import { Link } from "react-router-dom"
import { db } from "../../services/firebaseConfig"
import { useEffect, useState } from "react"
import { Container } from "../../components/Container"
import notFound from '../../assets/notfound.png'
import styles from './styles.module.css'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { IoBackspaceOutline } from 'react-icons/io5'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export function SearchPage() {
    const { id } = useParams()
    const [NoResultsFound, setNoResultsFound] = useState(false)
    const [loading, setLoading] = useState(true)
    const [pets, setPets] = useState([])

    useEffect(() => {
        handleSearch()
    }, [id])

    const handleSearch = async () => {
        setLoading(true)
        const q = query(collection(db, "pets"),
            where("cidade", ">=", id.toUpperCase()),
            where("cidade", "<=", id.toUpperCase() + "\uf8ff")
        );

        const querySnapshot = await getDocs(q)

        let dogList = []
        querySnapshot.forEach((doc) => {
            dogList.push({
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

        if (dogList.length === 0) {
            setNoResultsFound(true);
        }
        setPets(dogList)
        setLoading(false)
    }

    console.log(pets)
    return (
        <Container>
            {!NoResultsFound && <div className={styles.header}>
                <h1>Mostrando resultados de:  <span>{id.toUpperCase()}</span></h1>
                <FaMapMarkerAlt size={20} color="#000" />
            </div>}

            <div className={styles.feed__grid}>
                {loading ? (
                    <Skeleton count={5} />
                ) : (
                    pets.map((item) => {
                        return (
                            loading ? (
                                <Skeleton count={5} />
                            ) : (
                                <Link key={item.id} to={`/pet/${item.id}`} style={{ textDecoration: 'none' }}>
                                    <div key={item.id} className={styles.feed_card}>
                                        <span className={item.disponivel ? styles.adopt_green : styles.adopt_red}>{item.disponivel ? 'Disponível para adoção' : 'Felizmente esse peludo foi adotado!'}</span>
                                        <img src={item.images[0].url} alt={item.raca} loading='lazy' />
                                        <div className={styles.card__title}>
                                            <MdOutlinePets size={17} color='#FFBD59' />
                                            <p>{item.nome}</p>
                                        </div>
                                        <div className={styles.card__title}>
                                            <CiLocationOn size={17} color='#FFBD59' />
                                            <p>{item.cidade} - {item.estado}</p>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )
                    })
                )}
            </div>
            {NoResultsFound &&
                <div className={styles.notfound_container}>
                    <h1>Nenhum resultado encontrado.</h1>
                    <img src={notFound} alt="Não encontrado" />
                    <Link to={'/'}>
                        <IoBackspaceOutline size={21} color="#FFBD59" />
                        Voltar
                    </Link>
                </div>
            }
        </Container>
    )
}