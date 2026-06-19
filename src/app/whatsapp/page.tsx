import Footer from "@/components/landing/Footer/Footer";
import SimpleNav from "@/components/ui/SimpleNav/SimpleNav";
import styles from "../static-pages.module.css";

export default function WhatsAppRegistrationPage() {
  return (
    <>
      <SimpleNav />
      <main className={styles.page}>
       <section className={styles.hero}>
  <div className={styles.heroInner}>
    <div className={styles.eyebrow}>Orphanage Registration</div>

    <h1>Register your orphanage and connect with verified donors.</h1>

    <p>
      Complete your registration to join the CareBridge network. Share
      information about your orphanage, the children you support, and your
      current needs so donors can discover and assist your organisation.
    </p>
  </div>
</section>

        <section className={styles.content}>
          <div className={styles.panel}>
            <h2>Registration form</h2>
            <p>
              Submit the details of your orphanage!
            </p>

            <form className={styles.formGrid}>
              <div className={styles.field}>
                <label htmlFor="facilityName">Orphanage name</label>
                <input
                  id="facilityName"
                  name="facilityName"
                  placeholder="Hope Haven Children Home"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="representativeName">Representative name</label>
                <input
                  id="representativeName"
                  name="representativeName"
                  placeholder="Full name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="phone">WhatsApp phone number</label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="+234 800 000 0000"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="location">Location</label>
                <input
                  id="location"
                  name="location"
                  placeholder="City, state"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="childrenCount">Number of children in care</label>
                <input
                  id="childrenCount"
                  name="childrenCount"
                  min="0"
                  placeholder="42"
                  type="number"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="priorityNeed">Primary support needed</label>
                <select
                  id="priorityNeed"
                  name="priorityNeed"
                  className={styles.select}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a category
                  </option>
                  <option value="food">Food and nutrition</option>
                  <option value="education">Education supplies</option>
                  <option value="health">Healthcare support</option>
                  <option value="clothing">Clothing and hygiene</option>
                  <option value="shelter">Shelter and facility repairs</option>
                </select>
              </div>

              <div className={styles.field}>
                <label htmlFor="details">Additional details</label>
                <textarea
                  id="details"
                  name="details"
                  placeholder="Tell us about your organization and the most urgent needs."
                  rows={5}
                />
              </div>

              <button className={styles.button} type="button">
                Submit
              </button>
            </form>

            <p className={styles.note}>
              You will be contacted regarding your submission within 48 hours.
            </p>
          </div>
        </section>

<section className={styles.content}>
          <div className={styles.split}>
            <div className={styles.card}>
              <h2>WhatsApp Registration (Coming Soon!)</h2>
              <h3>How the flow will work</h3>
              <ul className={styles.list}>
                <li>CareBridge verifies the representative and facility location.</li>
                <li>The orphanage shares child count, priority needs, and documents.</li>
                <li>Our team reviews the submission before publishing verified needs.</li>
                <li>The orphanage receives status updates directly in WhatsApp.</li>
              </ul>
            </div>

            <div className={styles.chat} aria-label="WhatsApp registration mockup">
              <div className={styles.chatHeader}>
                <span className={styles.avatar}>CB</span>
                <div>
                  <strong>CareBridge OVC</strong>
                  <p>Registration assistant</p>
                </div>
              </div>
              <div className={styles.messages}>
                <div className={styles.bubble}>
                  Welcome to CareBridge. What is the name of your orphanage?
                </div>
                <div className={styles.bubbleAlt}>Hope Haven Children Home</div>
                <div className={styles.bubble}>
                  Great. Please share your location, contact person, and current
                  number of children in your care.
                </div>
                <div className={styles.bubbleAlt}>
                  Lagos. Amaka Okorie. 42 children.
                </div>
                <div className={styles.bubble}>
                  Thank you. Our verification team will review your registration
                  before needs can be listed.
                </div>
              </div>
              <div className={styles.inputBar}>Coming soon</div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
