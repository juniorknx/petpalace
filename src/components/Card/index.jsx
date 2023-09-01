import React from 'react';
import styles from './styles.module.css';
import { Link } from 'react-router-dom';
import { MdOutlinePets } from 'react-icons/md';
import { CiLocationOn } from 'react-icons/ci';

const Card = React.memo(({ data }) => {
    return (
        <div className={styles.feed__grid}>
            {data.map((item) => (
                <Link key={item.id} to={`/pet/${item.id}`} style={{ textDecoration: 'none' }}>
                    <div key={item.id} className={styles.feed_card}>
                        <span className={item.disponivel ? styles.adopt_green : styles.adopt_red}>
                            {item.disponivel ? 'Disponível' : 'Adotado!'}
                        </span>
                        <img src={item.images[0].url} alt={item.raca} loading='lazy' />
                        <div className={styles.card__title}>
                            <MdOutlinePets size={17} color='#FFBD59' />
                            <p>{item.nome.toLowerCase()}</p>
                        </div>
                        <div className={styles.card__title}>
                            <CiLocationOn size={17} color='#FFBD59' />
                            <p>{item.cidade.toLowerCase()} - {item.estado}</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
});

export default Card;
