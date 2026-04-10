import React from "react";
import styles from "./DeepDives.module.css";

interface Dive {
  title: string;
  icon: string;
}

export default function DeepDives({ items }: { items: Dive[] }) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        // Using item.title as the key is safer and more standard than using the array index
        <div key={item.title || index} className={styles.box}>
          <span className={styles.icon}>{item.icon}</span>
          <span className={styles.title}>{item.title}</span>
        </div>
      ))}
    </div>
  );
}
