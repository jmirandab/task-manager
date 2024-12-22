import React, { useState, useRef } from "react";
import styles from "./StatusChip.module.css";

export default function StatusChip ({ status }: { status: "pending" | "completed"}) {



  
    return (
      <div className={`${styles.statuschip} ${status=== "pending"?styles.statuschip_pending:styles.statuschip_complete }`}>
        <span aria-hidden className={styles.statuschip__icon}>
          {status=== "pending"?"!":"✓"}
        </span>
        <span className={styles.statusChip__text}>{status}</span>
      </div>
    );
  }