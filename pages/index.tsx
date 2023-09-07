import Layout from "../components/layout";
import styles from "../styles/Home.module.css";
import Authentication from "./authentication";
import PubSub from "./pub-sub";
import Presence from "./presence";
import History from "./history";

export default function Home() {
  return (
    <Layout metaDescription={""}>
      {" "}
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Token Authentication &rarr;</h2>
          <Authentication /> {/* Render the Authentication component here */}
        </div>
        <div className={styles.card}>
          <h2>Pub/Sub &rarr;</h2>
          <PubSub /> {/* Render the PubSub component here */}
        </div>
        <div className={styles.card}>
          <h2>Presence &rarr;</h2>
          <Presence /> {/* Render the Presence component here */}
        </div>
        <div className={styles.card}>
          <h2>History &rarr;</h2>
          <History /> {/* Render the History component here */}
        </div>
      </div>
    </Layout>
  );
}
