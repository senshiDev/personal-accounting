"use client"
import TransactionFormPage from '@/components/transactionFormPage/transactionFormPage';
import { getTransactions, updateTransactionInStorage } from '@/lib/storage';
import { TTransactionStoredWithId } from '@/lib/Transaction';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';

function editTransaction() {

    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [transaction, setTransaction] = useState<TTransactionStoredWithId | null>(null);

    useEffect(() => {
    const all = getTransactions();
    const found = all.find(tx => tx.id === id);
    if (found) {
      setTransaction(found);
    } else {
      // اگر تراکنش پیدا نشد، برگرد به صفحه اصلی
      router.push("/");
    }
  }, [id, router]);

  const handleUpdate = (updatedTx: TTransactionStoredWithId) => {
    updateTransactionInStorage(updatedTx);
    toast.success("تراکنش با موفقیت ویرایش شد!");
    router.push("/");
  };

  if (!transaction) {
    return <p className="p-8 text-center">در حال بارگذاری...</p>;
  }
  return (
    <div>
      <TransactionFormPage onSubmit={handleUpdate} initialData={transaction} />
    </div>
  )
}

export default editTransaction
