import { TTransactionStoredWithId } from "./Transaction";

export function calculateTotalIncome(transactions: TTransactionStoredWithId[]) : number {
   const incomeTransactions = transactions.filter(tx => tx.type === "income")
   const sum = incomeTransactions.reduce((total, tx) => total + tx.amount,0)
   return sum
}

export function calculateTotalExpenses(transactions: TTransactionStoredWithId[]) : number {
    const expensesTransactions = transactions.filter(tx => tx.type === "expense")
    const sum = expensesTransactions.reduce((total,tx) => total + tx.amount ,0)
    return sum
}

export function calculateBalance(totalIncome: number, totalExpenses: number): number {
    return totalIncome - totalExpenses
}