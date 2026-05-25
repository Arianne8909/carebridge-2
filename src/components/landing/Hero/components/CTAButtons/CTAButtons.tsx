import styles from "./CTAButtons.module.css";

import Button from "@/components/ui/Button/Button";

export default function CTAButtons() {
  return (
    <div className={styles.heroBtns}>
      <Button variant="primary" size="lg">
        Browse Live Needs →
      </Button>

      <Button variant="outline" size="lg">
        Register Your Home
      </Button>
    </div>
  );
}