import styles from './styles.module.css'
import { useParams } from "react-router-dom"
import { Container } from "../../components/Container"
import { db } from "../../services/firebaseConfig"
import { doc, getDoc, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { MdOutlinePets } from 'react-icons/md'
import { FaWhatsappSquare } from 'react-icons/fa';
import { GrMail } from 'react-icons/gr'

export function PetDetail() {
    const [pet, setPet] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadPetDetail() {
            const petRef = doc(db, "pets", id);
            const docSnap = await getDoc(petRef)
            try {
                setPet({
                    id: docSnap.id,
                    name: docSnap.data().nome,
                    cidade: docSnap.data().cidade,
                    cor: docSnap.data().cor,
                    created: docSnap.data().created,
                    description: docSnap.data().description,
                    email: docSnap.data().email,
                    estado: docSnap.data().estado,
                    idade: docSnap.data().idade,
                    images: docSnap.data()?.images,
                    owner: docSnap.data().owner,
                    raca: docSnap.data().raca,
                    phone: docSnap.data().whatsapp
                })
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }

        loadPetDetail()
    }, [])

    console.log('Pet detail ===> ', pet)

    const { id } = useParams()
    return (
        <Container>
            <div className={styles.pet__container}>
                <div className={styles.slider__container}>
                    {pet && (
                        <Swiper pagination={{ clickable: true }} scrollbar={{ draggable: true }}>
                            {pet.images?.map(item => {
                                return (
                                    <SwiperSlide key={item?.name}>
                                        <img src={item?.url} alt='Pet' className={styles.imageSlider} />
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    )}
                </div>

                <div className={styles.pet__profile}>
                    <div className={styles.pet_title}>
                        <h1>{pet.name?.toLowerCase()}</h1>
                        <MdOutlinePets size={23} color='#FFBD59' />
                    </div>

                    <div className={styles.profile_}>
                        <p>Cor: <b>{pet.cor}</b></p>
                        <p>Idade: <b>{pet.idade} Anos</b></p>
                    </div>
                    <div className={styles.profile_}>
                        <p><b>{pet.cidade} - {pet.estado}</b></p>
                    </div>

                    <div>
                        <dl>
                            <dd>
                                {pet?.description}
                            </dd>
                        </dl>
                    </div>

                    <div>
                        <div className={styles.owner__info}>
                            <p>Adicionado por: <span className={styles.user__badge}>{pet?.owner}</span></p>
                        </div>

                        <div className={styles.owner__contact}>
                            <a className={styles.owner__whatsapp} href={`https://api.whatsapp.com/send?phone=55${pet.phone}&text=Olá vi um anúncio na plataforma AdoteMais e estou interessado no ${pet.name} e gostaria de mais informações para adotá-lo.`} target="_blank">
                                WhatsApp
                                <FaWhatsappSquare size={30} color="#fff" />
                            </a>

                            <a className={styles.owner__mail} href={`mailto:${pet.email}`} target="_blank">
                                E-mail
                                <GrMail size={30} color="#fff" />
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}