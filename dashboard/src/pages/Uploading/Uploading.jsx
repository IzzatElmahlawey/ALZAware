import { useState } from "react";
import Form from "../Form/Form";
import styles from "./uploading.module.css";
import Container from "../Container/Container";
function Analysis() {
  const [data, setData] = useState("");

  return (
    <section className={styles.analysis} id="work">
      <Container>
        <h3 className={styles.title}>Analysis</h3>
        <div className={styles.analysisBox}>
          <div>
            <h3>Choose an image:</h3>
            <Form setData={setData} />
          </div>
          <div className={styles.desc}>
            <h3>Description:</h3>
            <p>{data.message}</p>
            <p>{data.shape}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Analysis;
