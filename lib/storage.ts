import { TTransactionStoredWithId } from "./Transaction";

const STORAGE_KEY = "Transaction"

export function getTransactions(): TTransactionStoredWithId[] {
    if (typeof window === "undefined") return [] // اگه در محیط سرور هستیم و در مرورگر نیستیم هیچ کاری نکن و برگرد

    try {
        const stored = localStorage.getItem(STORAGE_KEY)
        if (!stored) return []
        return JSON.parse(stored) as TTransactionStoredWithId[]
    } catch (error) {
        console.error("خطا در خواندن داده‌ها از localStorage:", error)
        return []
    }
}

export function saveTransactions(transactions: TTransactionStoredWithId[]): void {
  if (typeof window === "undefined") return

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions))
  } catch (error) {
    console.error("خطا در ذخیره‌سازی داده‌ها در localStorage:", error)
  }
}

export function addTransactionToStorage(newTransaction: TTransactionStoredWithId): TTransactionStoredWithId[] {
  const current = getTransactions()
  const updated = [...current, newTransaction]
  saveTransactions(updated)
  return updated
}

export function removeTransactionFromStorage(id: string): TTransactionStoredWithId[] {
  const current = getTransactions()
  const updated = current.filter(t => t.id !== id)
  saveTransactions(updated)
  return updated
}

export function updateTransactionInStorage(updatedTx: TTransactionStoredWithId): TTransactionStoredWithId[] {
  const current = getTransactions();
  const updated = current.map(tx => tx.id === updatedTx.id ? updatedTx : tx);
  saveTransactions(updated);
  return updated;
}