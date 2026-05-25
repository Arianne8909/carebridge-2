import RegistrationFlow from '@/components/registration/RegistrationFlow';
import styles from './Register.module.css';

export default function Page() {
  return (
    <main className={styles.mainWrapper}>
      <RegistrationFlow />
    </main>
  );
}