import styles from './styles.module.css'
import { Container } from "../../components/Container";
import { HiSearch } from "react-icons/hi";
import { PiDogFill } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci"
import { db } from "../../services/firebaseConfig"
import { collection, addDoc, getDocs, orderBy, query, where, limit } from "firebase/firestore"
import { useEffect, useState } from 'react';
import { Loading } from '../../components/Loader'

export function Home() {
    const [pets, setPets] = useState([])
    const [loading, setLoading] = useState(true)
    const [input, setInput] = useState('')
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [recentSearch, setRecentSearch] = useState([])

    useEffect(() => {
        loadPets()
    }, [])

    useEffect(() => {
        loadRecents()
    }, [])

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
                setNoResultsFound(false);
            })
    }

    async function handleSearchInput(e) {
        e.preventDefault()

        if (input === '') {
            loadPets()
            return
        }

        setPets([])

        const q = query(collection(db, "pets"),
            where("raca", ">=", input.toUpperCase()),
            where("raca", "<=", input.toUpperCase() + "\uf8ff")
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
    }

    {/* Add recent searches */ }
    async function handleRecentSearch() {
        const docRef = addDoc(collection(db, "recent"), {
            recent: input
        }).then(() => {
            console.log('Documento added', docRef.id)
        }).catch((err) => {
            console.log('Erro ao inserir busca recente', err)
        })
    }

    async function loadRecents() {
        const recentRef = collection(db, "recent");
        const q = query(recentRef, orderBy("recent", "desc"), limit(4));
    
        try {
            const querySnap = await getDocs(q);
            const recentList = [];
    
            querySnap.forEach(doc => {
                recentList.push({
                    id: doc.id,
                    recentes: doc.data().recent
                });
            });
    
            setLoading(false);
            setRecentSearch(recentList)
        } catch (error) {
            console.error("Error fetching recent documents:", error);
        }
    }

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
                    <form onSubmit={handleSearchInput}>
                        <input
                            type='text'
                            placeholder='Pesquisar doguinhos, caramelos e gatos...'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />

                        <button type='submit' className={styles.search__button} onClick={handleRecentSearch}>
                            <HiSearch size={23} color='#fff' />
                            Buscar
                        </button>
                    </form>
                </div>
                <div className={styles.search__recents}>
                    <span>Buscas recentes:{loading ? (
                        <div></div>
                    ) : (
                        recentSearch.map(item => {
                            return (
                                <div key={item.id}>
                                    <b className={styles.recentItens}>{item.recentes}</b>
                                </div>
                            )
                        })
                    )}</span>
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
                                    <img src={item.images[0].url} alt={item.raca} loading='lazy' />
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
                    {noResultsFound && <p>Nenhum resultado encontrado.</p>}
                </div>
            </div>
        </Container>
    )
}