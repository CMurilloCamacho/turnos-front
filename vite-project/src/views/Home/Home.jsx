import { Link } from "react-router-dom";
import styles from "./Home.module.css"; 

function Home() {
  return (
    <div className= {styles.mainBackground}>
      <div ></div>
      <h1>Estás en el ODONTO DENT</h1>
      <p className={styles.agendar}>
      <Link to="/agendarturno"> Agenda tu Turno acá </Link>
      </p>
    </div>
  );
}

export default Home;
