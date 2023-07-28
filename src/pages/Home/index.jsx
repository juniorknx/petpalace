import styles from './styles.module.css'
import { Container } from "../../components/Container";
import { HiSearch } from "react-icons/hi";
import { PiDogFill } from "react-icons/pi";
import { CiLocationOn } from "react-icons/ci"

export function Home() {
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
                    <h2>Animais para adoção <span>22</span></h2>
                </div>

                <div className={styles.feed__grid}>
                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>

                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>

                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>

                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>

                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>

                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>

                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>

                    <div className={styles.feed_card}>
                        <img src='https://www.caesparaadocao.com.br/themes/caesparaadocao.com.br/uploads/caes/galeria/12082019091339_WhatsApp%20Image%202019-08-12%20at%2009.03.04(1).jpeg' alt='dog' />
                        <div className={styles.card__title}>
                            <PiDogFill size={17} color='#FFBD59' />
                            <p>Bull Terrier</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>Porto Alegre - RS</p>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}