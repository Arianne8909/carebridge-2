"use client";

import styles from "./Impact.module.css";
import { FaCheckCircle } from "react-icons/fa";

type GalleryItem = {
  id: number;
  title: string;
  location: string;
  description: string;
  childrenImpacted: number;
  amount: number;
  image: string;
};

const data: GalleryItem[] = [
  {
    id: 1,
    title: "Hope Children's Home",
    location: "Nairobi, Kenya",
    description:
      "Provided nutritious meals for 32 children for two weeks",
    childrenImpacted: 32,
    amount: 180,
    image: "/media/grains.jpg",
  },
  {
    id: 2,
    title: "St. Mary's Orphanage",
    location: "Kampala, Uganda",
    description:
      "Enabled 15 children to attend school for the new term",
    childrenImpacted: 15,
    amount: 220,
    image: "/media/children.jpg",
  },
  {
    id: 3,
    title: "Little Angel's Care",
    location: "Lagos, Nigeria",
    description:
      "Restocked medical clinic to treat 22 children's health needs",
    childrenImpacted: 22,
    amount: 85,
    image: "/media/grains.jpg",
  },
  {
    id: 4,
    title: "Rainbow Children's Center",
    location: "Accra, Ghana",
    description:
      "Delivered nutritious food for balanced meals for one week",
    childrenImpacted: 18,
    amount: 95,
    image: "/media/grains2.jpg",
  },
];

export default function Impact() {
  return (
    <section className={styles.gallery}>
      <h3 className={styles.title}>Impact Gallery</h3>

      <p className={styles.desc}>
        See the real impact of donations. Every contribution is tracked
        and verified with photo proof.
      </p>

      <div className={styles.container}>
        {data.map((item) => (
          <div key={item.id} className={styles.card}>
            {/* IMAGE */}
            <div className={styles.imageWrap}>
              <img src={item.image} alt={item.title} />
            </div>

            {/* DETAILS */}
            <div className={styles.details}>
              {/* HEADER */}
              <div className={styles.header}>
                <div>
                  <h4 className={styles.cardTitle}>
                    {item.title}
                    <span className={styles.verified}>
                      <FaCheckCircle />
                    </span>
                  </h4>

                  <p className={styles.location}>{item.location}</p>
                </div>
              </div>

              {/* DESC */}
              <p className={styles.cardDesc}>{item.description}</p>

              {/* META */}
              <div className={styles.meta}>
                <span>{item.childrenImpacted} children impacted</span>
                <span>${item.amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}