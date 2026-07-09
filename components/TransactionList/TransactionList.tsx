"use client"

import { getTransactions, removeTransactionFromStorage } from "@/lib/storage"
import { TTransactionStoredWithId } from "@/lib/Transaction"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import Container from "../container/Container"
import { Badge } from "../ui/badge"
import { toPersianDate } from "@/lib/toPersianDate"
import { ArrowDown, ArrowDownLeft, ArrowDownRight, ArrowUp, ArrowUpLeft, ArrowUpRight, Pencil, Trash2 } from "lucide-react"
import { Button } from "../ui/button"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog"
import { useRouter } from "next/navigation"
import SummaryCards from "../SummaryCards/SummaryCards"




function TransactionList() {
    const [transaction, setTransaction] = useState<TTransactionStoredWithId[]>([])
    const [loading, setLoading] = useState(true)
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter();

    const sorted = transaction
      .map((tx , index ) => ({tx,index})) // برچسب زدن
      .sort((a,b) => { // مرتب سازی
        const dateComparison = b.tx.date.localeCompare(a.tx.date);
        if(dateComparison !==0 ) return dateComparison
        return b.index - a.index;
      })
      .map(({ tx }) => tx); // برچسب زدایی

    
    

    // تابع بارگذاری داده‌ها
    const loadData = () => {
        setLoading(true)
        const data = getTransactions()
        setTransaction(data)
        setLoading(false)
    }

    useEffect(()=>{
        loadData()
    },[])

    // مودال دلیت رو باز میکنه و ایدی دلیت رو تنظیم میکنه
    const handleDelete = (id: string) => {
      setDeleteId(id)
      setIsDialogOpen(true)
    }

    // تابع حذف تراکنش
    const confirmDelete = () => {
      if (!deleteId) return;
      const updated = removeTransactionFromStorage(deleteId);
      setTransaction(updated);
      setDeleteId(null);
      setIsDialogOpen(false);
    }

  // تابع ویرایش تراکنش 
  const handleEdit = (id: string) => {
    router.push(`/edit/${id}`);
  }

    if (loading) {
      return (
        <Container>
          {/* خلاصه‌ها همیشه نشان داده شوند */}
          <SummaryCards transactions={transaction} />

          {/* بقیهٔ UI (لیست یا حالت خالی/بارگذاری) */}
          {loading ? (
            <Card className="w-full shadow-sm border-0">
                <CardContent className="py-10 text-center text-gray-400">
                    <p>⏳ در حال بارگذاری تراکنش‌ها...</p>
                </CardContent>
            </Card>
          ) : transaction.length === 0 ? (
            <Card className="border-dashed border-2 border-gray-200">
                <CardContent className="py-10 text-center text-gray-400">
                    <p className="text-lg">📭 هیچ تراکنشی ثبت نشده است.</p>
                    <p className="text-sm mt-1">برای شروع، اولین تراکنش خود را ثبت کنید.</p>
                </CardContent>
            </Card>
          ) : (
            <Card className="shadow-sm border-0">
                {/* ... لیست تراکنش‌ها ... */}
            </Card>
          )}
        </Container>
      );
    }

    return(
        <Container>
          <SummaryCards transactions={transaction} />
            <Card className="shadow-sm border-0">
                <CardHeader className="pb-3">
                    <CardTitle className="text-lg font-vazir"> لیست تراکنش‌ها</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {sorted.length === 0 ? (
                        <Card className="border-dashed border-2 border-gray-200">
                            <CardContent className="py-10 text-center text-gray-400">
                                <p className="text-lg">📭 هیچ تراکنشی ثبت نشده است.</p>
                                <p className="text-sm mt-1">برای شروع، اولین تراکنش خود را ثبت کنید.</p>
                            </CardContent>
                        </Card>
                    ) : (
                      <ul className="divide-y divide-gray-100">
                        {sorted.map((t) => {
                          const isIncome = t.type === "income"
                          return (
                            <li key={t.id} className="flex items-center gap-3 px-4 py-3">
                              {/* آیکون دایره‌ای */}
                              <div
                                className={`flex size-9 shrink-0 items-center justify-center rounded-full ${
                                isIncome
                                ? "bg-emerald-50 text-emerald-500"
                                : "bg-rose-50 text-rose-500"
                                }`}
                              >
                                {isIncome ? (
                                  <ArrowUpRight className="size-4" />
                                ) : (
                                <ArrowDownRight className="size-4" />
                                )}
                              </div>

                              {/* دسته‌بندی و تاریخ */}
                              <div className="min-w-0 flex-1">
                                <p className="truncate font-medium text-gray-800">{t.category}</p>
                                <p className="text-xs text-gray-500">{toPersianDate(t.date)}</p>
                              </div>

                              {/* مبلغ */}
                              <p
                                className={`shrink-0 font-semibold tabular-nums ${
                                isIncome ? "text-emerald-600" : "text-rose-600"
                                }`}
                              >
                                
                                {t.amount.toLocaleString("fa-IR")} {isIncome ? "+" : "−"} تومان
                              </p>

                              {/* دکمه‌ها */}
                              <div className="flex shrink-0 items-center gap-1">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-gray-600 hover:text-blue-700 hover:bg-blue-50"
                                  onClick={() => handleEdit(t.id)}
                                >
                                  <Pencil className="size-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-gray-600 hover:text-rose-700 hover:bg-rose-50"
                                  onClick={() => handleDelete(t.id)}
                                >
                                  <Trash2 className="size-4" />
                                </Button>
                              </div>
                            </li>
                          )
                        })}
                      </ul>
                    )
                      
                  }
          </CardContent>
        </Card>

        {/* دیالوگ تأیید حذف */}
      <AlertDialog  open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle >آیا از حذف این تراکنش مطمئن هستید؟</AlertDialogTitle>
            <AlertDialogDescription  className="text-right">
              این عملیات قابل بازگشت نیست و تراکنش برای همیشه حذف خواهد شد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="!flex-row-reverse gap-x-2 gap-y-0">
            <AlertDialogCancel className="cursor-pointer">انصراف</AlertDialogCancel>
            <AlertDialogAction className="cursor-pointer" onClick={confirmDelete}>
              بله، حذف کن
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </Container>
        
    )
}

export default TransactionList