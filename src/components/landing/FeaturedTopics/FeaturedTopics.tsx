"use client";

import styles from "./FeaturedTopics.module.css";

type Topic = {
  id: number;
  title: string;
  category: string;
  readTime: string;
  description: string;
  image: string;
  link: string; // ✅ added
};

const topics: Topic[] = [
  {
    id: 1,
    title: "How Your $50 Can Feed 20 Children for a Week",
    category: "Impact Stories",
    readTime: "4 min read",
    description:
      "Learn about the real impact of small donations and how they translate into meals, education, and hope for orphaned children.",
    image: "/media/grains2.jpg",
    link: "https://medium.com/@carebridgeovc/how-your-50-can-feed-20-children-for-a-week-0ccb8645aec2",
  },
  {
    id: 2,
    title: "Why Photo Proof Matters: Transparency in Charitable Giving",
    category: "Education",
    readTime: "5 min read",
    description:
      "Discover how proof of fulfillment builds trust and ensures your donation makes a real difference in children's lives.",
    image: "/media/education.jpg",
    link: "https://medium.com/@carebridgeovc/why-photo-proof-matters-transparency-in-charitable-giving-ad5854618391",
  },
  {
    id: 3,
    title: "From Need to Hope: The Journey of a School Uniform Donation",
    category: "Success Stories",
    readTime: "6 min read",
    description:
      "Follow the complete journey of how a simple donation changed the educational future of 15 children.",
    image: "/media/education2.jpg",
    link: "https://medium.com/@carebridgeovc/from-need-to-hope-the-journey-of-a-school-uniform-donation-cc7899bc0909",
  },
];

export default function FeaturedTopics() {
  return (
    <section className={styles.featured} id="featured-topics">
      <h2 className={styles.heading}>
          Featured <span className={styles.accent}>Topics</span>
        </h2>

      <div className={styles.container}>
        {topics.map((topic) => (
          <div key={topic.id} className={styles.card}>
            {/* IMAGE */}
            <div className={styles.imageWrap}>
              <img src={topic.image} alt={topic.title} />
            </div>

            {/* DETAILS */}
            <div className={styles.details}>
              {/* HEADER */}
              <div className={styles.header}>
                <span className={styles.badge}>{topic.category}</span>
                <span className={styles.read}>
                  {topic.readTime}
                </span>
              </div>

              {/* TITLE */}
              <h3 className={styles.cardTitle}>
                {topic.title}
              </h3>

              {/* DESCRIPTION */}
              <p className={styles.meta}>
                {topic.description}
              </p>

              {/* FOOTER */}
              <div className={styles.footer}>
                <a href={topic.link}>Read More →</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}