import { z } from "zod";
import { v4 as uuidv4 } from 'uuid';
import { TransactionStoredSchema, TTransactionStored } from "./Transaction";
import { addTransactionToStorage } from "./storage";

export function addTransaction(formData : TTransactionStored) {
    try {
        //اعتبارسنجی داده اماده ذخیره
        const validatedData = TransactionStoredSchema.parse(formData);
        const newTransactionId = uuidv4();

        const newTransaction = {
            id: newTransactionId,
            ...validatedData,
        };

        console.log("تراکنش با موفقیت ذخیره شد:", newTransaction);
        addTransactionToStorage(newTransaction);

        return newTransaction;
    } catch(error) {
        if (error instanceof z.ZodError) {
            console.error("خطا در اعتبارسنجی داده‌های فرم:", error.issues);
            // اینجا باید به کاربر پیام خطا نشان دهید (مثلاً در UI)
            return null;
        } else {
            console.error("خطای غیرمنتظره:", error);
            return null;
        }
    }
}