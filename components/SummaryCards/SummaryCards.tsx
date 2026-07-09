import { calculateBalance, calculateTotalExpenses, calculateTotalIncome } from "@/lib/financeCalculations"
import { TTransactionStoredWithId } from "@/lib/Transaction"
import { useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";
import { formatCurrencyToman } from "@/lib/toRial";


function SummaryCards({transactions} : { transactions: TTransactionStoredWithId[] } ) {
    const totalIncome = useMemo(() => calculateTotalIncome(transactions), [transactions] );
    const totalExpense = useMemo(() => calculateTotalExpenses(transactions), [transactions])
    const balance = useMemo(() => calculateBalance(totalIncome , totalExpense), [totalIncome , totalExpense] )
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-4">
        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">مانده کل</CardTitle>
                    <div className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Wallet className="size-4" aria-hidden="true" />
                    </div>
            </CardHeader>

            <CardContent>
                <p
                    className={`text-2xl font-semibold tracking-tight ${
                    balance < 0 ? "text-destructive" : "text-foreground"
                    }`}
                >     
                    {formatCurrencyToman(balance)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">درآمد منهای هزینه‌ها</p>
            </CardContent>
        </Card>

        <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">درآمد کل</CardTitle>
                    <div className="flex size-9 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                        <ArrowUpRight className="size-4" aria-hidden="true" />
                    </div>
                </CardHeader>
            <CardContent>
                <p className="text-2xl font-semibold tracking-tight text-emerald-600 dark:text-emerald-400">
                    {formatCurrencyToman(totalIncome)}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">همه تراکنش‌های درآمد</p>
            </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">هزینه کل</CardTitle>
          <div className="flex size-9 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <ArrowDownRight className="size-4" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold tracking-tight text-destructive">
            {formatCurrencyToman(totalExpense)}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">همه تراکنش‌های هزینه</p>
        </CardContent>
      </Card>              
    </div>
  )
}

export default SummaryCards
