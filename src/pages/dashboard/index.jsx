import { useState, useContext, useEffect } from 'react'
import styles from './styles.module.css'
import { Container } from '../../components/Container'
import { HeaderDashboard } from '../../components/DashBoardHeader'
import { db, storage } from '../../services/firebaseConfig'
import { doc, collection, deleteDoc, getDocs, query, where } from 'firebase/firestore'
import { deleteObject } from 'firebase/storage'
import { AuthContext } from '../../contexts/AuthContext'
import { Loading } from '../../components/Loader'
import { MdOutlinePets } from "react-icons/md";
import { CiLocationOn } from "react-icons/ci"
import { ref } from 'firebase/storage'
import { BsFillTrash3Fill } from 'react-icons/bs'

export function Dashboard() {
    const { user } = useContext(AuthContext)
    const [anuncios, setAnuncios] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadAnuncios() {
            const q = query(collection(db, "pets"), where("uid", "==", user?.uid));

            try {
                const querySnapshot = await getDocs(q);
                let pets = []
                querySnapshot.forEach((doc) => {
                    pets.push({
                        id: doc.id,
                        nome: doc.data().nome,
                        images: doc.data().images,
                        cidade: doc.data().cidade,
                        estado: doc.data().estado
                    })
                })
                setAnuncios(pets)
            } catch (error) {
                console.log('Fetch error =>', error)
            } finally {
                setLoading(false)
            }
        }

        loadAnuncios()
    }, [])

    async function handleRemove(pet) {
        const docRef = doc(db, "pets", pet.id);
        await deleteDoc(docRef);

        await Promise.all(pet.images.map(async (image) => {
            const imagePath = `images/${image.uid}/${image.name}`;
            const imageRef = ref(storage, imagePath);

            try {
                await deleteObject(imageRef);
                console.log('Imagem deletada:', imagePath);
            } catch (error) {
                console.log('Erro ao deletar imagem', error);
            }
        }));

        const updatedAnuncios = anuncios.filter(filteredPet => filteredPet.id !== pet.id);
        setAnuncios(updatedAnuncios);
    }

    return (
        <Container>
            <HeaderDashboard />
            <div className={styles.feed__grid}>
                {loading ? (
                    <Loading size={'medium'} />
                ) : (
                    anuncios.map((item) => {
                        return (
                            <div key={item.id} className={styles.feed_card}>
                                <img src={item.images[0].url} alt={item.raca} loading='lazy' />
                                <div className={styles.card__title}>
                                    <MdOutlinePets size={17} color='#FFBD59' />
                                    <p>{item.nome}</p>
                                </div>
                                <div className={styles.card__title}>
                                    <CiLocationOn size={17} color='#FFBD59' />
                                    <p>{item.cidade} - {item.estado}</p>
                                </div>
                                <div className={styles.remove__item}>
                                    <button onClick={() => handleRemove(item)}>
                                        <BsFillTrash3Fill size={20} color='#000' />
                                    </button>

                                    <button onClick={() => handleRemove(item)}>
                                        <BsFillTrash3Fill size={20} color='#000' />
                                    </button>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </Container>
    )
}