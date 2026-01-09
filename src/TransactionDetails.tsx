import React from "react";
import styles from "./TransactionDetails.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import {
  dateDetails,
  getTransactionDisplay,
} from "./service/utils";

export interface Transaction {
  id: number;
  type: "Payment" | "Credit";
  amount: number;
  name: string;
  description: string;
  date: string;
  isPending: boolean;
  authorizedUser?: string;
}

interface ReceiptDetailProps extends Transaction {
  onClose: () => void;
}

export const ReceiptDetail: React.FC<ReceiptDetailProps> = (props) => {
  const { description, amountDisplay } = getTransactionDisplay(props);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <button
          className={styles.backButton}
          aria-label="Go back"
          onClick={props.onClose}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
      </header>

      <section className={styles.hero}>
        {/* Using formatted amount display for consistency */}
        <h1 className={styles.amount}>{amountDisplay}</h1>
        <p className={styles.merchant}>{props.name}</p>
        <p className={styles.timestamp}>{dateDetails(props.date)}</p>
      </section>

      <div className={styles.detailsCard}>
        <div className={styles.statusSection}>
          <div className={styles.statusLabel}>
            {/* Logic: Payments are usually 'Approved', Credits 'Pending' or vice-versa based on status */}
            <strong>Status: {props.isPending ? "Pending" : "Approved"}</strong>
          </div>
          <div className={styles.paymentMethod}>{description}</div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.totalRow}>
          <span className={styles.totalLabel}>Total</span>
          <span className={styles.totalValue}>{amountDisplay}</span>
        </div>
      </div>
    </div>
  );
};