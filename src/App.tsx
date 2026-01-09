import { useState } from "react";
import "./App.css";
import TransactionList from "./TransactionsList";
import { ReceiptDetail } from "./TransactionDetails";
import type { Transaction } from "./TransactionDetails";

function App() {
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  return (
    <div className="app-viewport">
      {transaction ? (
        <ReceiptDetail {...transaction} onClose={() => setTransaction(null)} />
      ) : (
        <TransactionList onTransactionSelect={setTransaction} />
      )}
    </div>
  );
}

export default App;
