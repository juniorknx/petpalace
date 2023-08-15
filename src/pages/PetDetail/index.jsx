import { useParams } from "react-router-dom"
import { Container } from "../../components/Container"
import { db } from "../../services/firebaseConfig"
import { doc, getDoc, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"

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
                    estado:docSnap.data().estado,
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

    console.log(pet)

    const { id } = useParams()
    return (
        <Container>
            <h1>Pet page {pet?.name}</h1>
            <p>
                {pet?.description}
            </p>
        </Container>
    )
}