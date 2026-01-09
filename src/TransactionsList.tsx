import React, { useEffect, useState } from "react";
import styles from "./TransactionsList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faCheck,
  faAppleAlt,
} from "@fortawesome/free-solid-svg-icons";
import { 
  getRandomBalance, 
  getTransactionDisplay, 
  calculateDailyPoints, // Import the formula helper
  LIMIT 
} from "./service/utils";
import { getProductLists } from "./service/api";
import type { Transaction } from "./TransactionDetails"; // Ensure this path is correct

interface TransactionListProps {
  onTransactionSelect: (transaction: Transaction) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ onTransactionSelect }) => {
  const [info, setInfo] = useState({ balance: 0, available: 0 });
  // Typed as an array of Transactions
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [points, setPoints] = useState<string>("0");

  useEffect(() => {
    const start = async () => {
      // Calculate Card Balance Block
      const balance = getRandomBalance();
      const available = LIMIT - balance;
      setInfo({ balance, available });

      // Calculate Daily Points Block based on season day
      setPoints(calculateDailyPoints());

      // Fetch Latest Transactions Block (limit 10)
      const resp = await getProductLists();
      setTransactions(resp.slice(0, 10)); 
    };
    start();
  }, []);

  return (
    <div className={styles.container}>
      {/* Top Grid */}
      <div className={styles.topGrid}>
        <div className={styles.cardInfo}>
          <div className={styles.label}>Card Balance</div>
          <div className={styles.balance}>${info.balance.toFixed(2)}</div>
          <div className={styles.available}>
            ${info.available.toFixed(2)} Available
          </div>
        </div>
        <div className={styles.paymentStatus}>
          <div className={styles.label}>No Payment Due</div>
          <div className={styles.subtext}>
            You've paid your balance.
          </div>
          <div className={styles.checkIcon}>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        </div>
        <div className={styles.dailyPoints}>
          <div className={styles.label}>Daily Points</div>
          <div className={styles.points}>{points}</div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>Latest Transactions</h2>
      <div className={styles.transactionList}>
        {transactions.map((t) => {
          const { detail, description, amountDisplay } = getTransactionDisplay(t);
          const isPayment = t.type === "Payment";

          return (
            <div
              key={t.id}
              className={styles.transactionItem}
              onClick={() => onTransactionSelect(t)}
            >
              {/* Icon logic: Random dark background + standard icon */}
              <div className={`${styles.iconBox} ${isPayment ? styles.paymentIcon : styles.merchantIcon}`}>
                <FontAwesomeIcon icon={faAppleAlt} />
              </div>
              
              <div className={styles.txDetails}>
                <div className={styles.txRow}>
                  <span className={styles.merchantName}>{t.name}</span>
                </div>
                <div className={styles.txRow}>
                  <span className={styles.subtitle}>{description}</span>
                </div>
                <div className={styles.detailText}>{detail}</div>
              </div>

              <div className={styles.percentWrapper}>
                <span className={`${styles.amount} ${isPayment ? styles.green : ""}`}>
                  {amountDisplay}
                </span>
                {/* Specific 3% display for Credits as seen in screenshot */}
                {!isPayment && <span className={styles.percentage}>3%</span>}
              </div>

              <FontAwesomeIcon icon={faChevronRight} className={styles.chevron} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TransactionList