"use client";
import TransactionFormPage from '@/components/transactionFormPage/transactionFormPage'
import { addTransaction } from "@/lib/addTransaction";
import { TTransactionStoredWithId } from '@/lib/Transaction';
import { useRouter } from 'next/navigation';

import { toast } from "sonner"


function transaction() {
  const router = useRouter()

  const handleSubmit = (tx : TTransactionStoredWithId) => {
    const { id, ...storedData } = tx; // ← id را نادیده می‌گیریم
    const result = addTransaction(storedData);
    if (result) {
      toast.success("تراکنش با موفقیت ثبت شد!");
      router.push("/");
    } else {
      toast.error("خطا در ثبت تراکنش. لطفاً دوباره تلاش کنید.");
    }
  }
  return (
    <div dir="rtl" className=" ">
      <TransactionFormPage onSubmit={handleSubmit}/>
      
    </div>
  )
}

export default transaction
