import styles from "./Problem.module.css";

export default function Problem() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.heading}>
          Millions Need Help. Millions Want to Help.
          <br />
          <span className={styles.accent}>Yet They Never Meet.</span>
        </h2>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.challenge}`}>
            <h3>The Challenge</h3>
            <ul>
              <li>Millions of vulnerable children across Africa lack basic necessities — food, education, healthcare, shelter.</li>
              <li>Orphanages and community centers struggle to communicate their needs effectively to potential donors.</li>
              <li>Many facilities remain invisible, unable to access the support that exists.</li>
            </ul>
          </div>

          <div className={`${styles.card} ${styles.disconnect}`}>
            <h3>The Disconnect</h3>
            <ul>
              <li>Generous donors want to help but struggle to find trustworthy, verified organizations.</li>
              <li>Lack of transparency makes donors hesitant about where their money actually goes.</li>
              <li>No clear way to track impact or verify that donations created real change.</li>
            </ul>
          </div>
        </div>

        <div className={styles.bridge}>
          <span>CareBridge OVC bridges that gap.</span>
        </div>
      </div>
    </section>
  );
}