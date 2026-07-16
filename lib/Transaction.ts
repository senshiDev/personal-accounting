import { z } from "zod";
import DateObject from "react-date-object";

export const incomeCategories = ["حقوق", "دستمزد", "درآمد حاصل از کسب‌وکار", "اجاره", "سود سرمایه‌گذاری","سایر درآمد ها"] as const;
export const expenseCategories = ["خوراک", "حمل‌ونقل", "تفریح و سرگرمی", "مسکن","پوشاک","بهداشت و درمان","تحصیل , آموزش", "قبوض ","بدهی‌ها ","پس‌انداز و سرمایه‌گذاری","سایر هزینه‌ها"] as const; // این‌ها رو باید در فرانت‌اِند تعریف کنی

const dateObjectSchema = z.custom<DateObject>((val) => {
  // بررسی می‌کنیم که val یک شیء باشد و ویژگی‌های اصلی DateObject را داشته باشد
  return typeof val === 'object' && val !== null && 'year' in val && 'month' in val && 'day' in val;
}, { message: "تاریخ وارد نشده و یا نامعتبر است" });

const formBaseSchema = {
    amount: z.number({
        // required_error: "مبلغ تراکنش الزامی است.",
        // invalid_type_error: "مبلغ باید یک عدد باشد"
    }).min(1,{ message: "مقدار نمی‌تواند خالی باشد" }).max(999_999_999_999, { message: "مبلغ نمی‌تواند بیش از ۹۹۹ میلیارد تومان باشد" }).nonnegative({ message: "مقدار نمی‌تواند منفی باشد" }),
    Explane: z.string().optional(),
};


// تعریف Schema های مربوط به هر نوع تراکنش به صورت جداگانه
const incomeSchema = z.object({
    type: z.literal("income"),
    ...formBaseSchema,
    date :dateObjectSchema,
    category: z.enum(incomeCategories, {  message: "  دسته‌بندی درآمد نامعتبر است و یا انتخاب نشده است"  }),
});

const expenseSchema = z.object({
    type: z.literal("expense"),
    ...formBaseSchema,
    date :dateObjectSchema,
    category: z.enum(expenseCategories, { message: "دسته‌بندی هزینه نامعتبر است و یا انتخاب نشده است"}),
});

// حالا، TransactionInputSchema را به عنوان یک Discriminated Union از این دو Schema تعریف می کنیم
export const TransactionInputSchema = z.discriminatedUnion("type", [incomeSchema, expenseSchema])

const storedDateSchema = {
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "فرمت تاریخ باید YYYY-MM-DD باشد"),
};

const incomeStoredSchema = z.object({
  type: z.literal("income"),
  ...formBaseSchema,
  ...storedDateSchema,
  category: z.enum(incomeCategories),
});

const expenseStoredSchema = z.object({
  type: z.literal("expense"),
  ...formBaseSchema,
  ...storedDateSchema,
  category: z.enum(expenseCategories),
});

export const TransactionStoredSchema = z.discriminatedUnion("type", [
  incomeStoredSchema,
  expenseStoredSchema,
]);


export const TransactionWithIdSchema = z.discriminatedUnion("type", [
    incomeStoredSchema.extend({ id: z.string().uuid("شناسه نامعتبر است") }),
    expenseStoredSchema.extend({ id: z.string().uuid("شناسه نامعتبر است") })
]);


export type TTransactionSchema = z.infer<typeof TransactionInputSchema>;
export type TTransactionStored = z.infer<typeof TransactionStoredSchema>;
export type TTransactionStoredWithId = z.infer<typeof TransactionWithIdSchema>;

