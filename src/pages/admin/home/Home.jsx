import styles from './Home.module.css';
import Typography from '@mui/material/Typography';

const Home = () => {
    return (

        <section>
            <Typography variant="h4" className={styles.homeTitle}> {/* Você pode usar variant para definir o estilo */}
                Seja bem-vindo
            </Typography>



        </section>

    );
};

export default Home;
