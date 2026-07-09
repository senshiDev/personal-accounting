"use client";

import { Controller, useForm, useWatch } from "react-hook-form";
import FormLable from "@/components/FormLable/FormLable";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  expenseCategories,
  incomeCategories,
  TransactionInputSchema,
  TTransactionStoredWithId,
  type TTransactionSchema,
  type TTransactionStored,
} from "@/lib/Transaction";
import FormErrorBox from "@/components/FormErrorBox/FormErrorBox";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toGregorian } from "jalaali-js";
import AmountIncomeBox from "@/components/AmountIncomeBox/AmountIncomeBox";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { miladiToDateObject } from "@/lib/miladiToDateObject";

interface TransactionFormProps {
  initialData?: TTransactionStoredWithId;   
  onSubmit: (t: TTransactionStoredWithId) => void;  
}

function TransactionFormPage({ initialData, onSubmit }: TransactionFormProps) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<TTransactionSchema>({
    resolver: zodResolver(TransactionInputSchema),
    mode: "onChange",
    defaultValues: initialData
    ? ({
      type: initialData.type,
      category: initialData.category,
      amount: initialData.amount,
      Explane: initialData.Explane ?? "",
      date: miladiToDateObject(initialData.date),
    } as TTransactionSchema)  
    : {},
  });

  const router = useRouter();

  const watchType = useWatch({
    control: control,
    name: "type",
  });

  const liveAmount = useWatch({
    control: control,
    name: "amount",
  });

  // اعداد به صورت فارسی نمایش داده می‌شوند
  const formattedAmount =
    typeof liveAmount === "number" && !isNaN(liveAmount)
      ? liveAmount.toLocaleString("fa-IR")
      : "۰";

  const onSubmitTransaction = (data: TTransactionSchema) => {
    const { year, month, day } = data.date;
    const g = toGregorian(year, month.number, day);
    const miladiString = `${g.gy}-${String(g.gm).padStart(2, "0")}-${String(g.gd).padStart(2, "0")}`;

   const storedData = {
    type: data.type,
    category: data.category,
    amount: data.amount,
    Explane: data.Explane,
    date: miladiString,
  } as TTransactionStored

  const finalTransaction: TTransactionStoredWithId = {
    id: initialData?.id ?? "",  
    ...storedData,
  };

  onSubmit(finalTransaction);
}

  //   const result = addTransaction(storedData);

  //   if (result) {
  //     toast.success("تراکنش با موفقیت ثبت شد!");
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 1500);
  //   } else {
  //     toast.error("خطا در ثبت تراکنش. لطفاً دوباره تلاش کنید.");
  //   }
  // };

  return (
    <div dir="rtl" className="flex  items-start justify-center sm:bg-muted/40 px-4 py-8 sm:py-4">
      <div className="w-full max-w-xl">
        {/* دکمه بازگشت به داشبورد */}
        <Link
          href="/"
          className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4 rotate-180" />
          <span>بازگشت به داشبورد</span>
        </Link>

        <form
          onSubmit={handleSubmit(onSubmitTransaction)}
          className="flex flex-col gap-6 rounded-2xl sm:border sm:border-border bg-card py-7 text-right sm:shadow-sm sm:px-8"
        >
          {/* هدر */}
          <div className="flex items-center  gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-foreground text-background">
              <Wallet className="size-5" />
            </span>
            <div className="">
              <h2 className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                {initialData ? "ویرایش تراکنش" : "ثبت تراکنش جدید"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {initialData ? "اطلاعات تراکنش را ویرایش کنید" : "یک درآمد یا هزینه جدید ثبت کنید"}
              </p>
            </div>
            
            
          </div>

          <div className="flex flex-col gap-5">
            {/* نوع تراکنش */}
            <div className="flex flex-col gap-2.5">
              <FormLable>نوع تراکنش</FormLable>
              <div className="grid grid-cols-2 gap-3">
                <label
                  htmlFor="income"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 py-3.5 text-center font-semibold transition-all ease-in-out ${
                    watchType === "income"
                      ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                      : "border-border bg-card text-foreground hover:border-emerald-300 hover:bg-emerald-50"
                  }`}
                >
                  <TrendingUp className="size-4" />
                  <span>درآمد</span>
                </label>
                <input type="radio" value="income" {...register("type")} name="type" id="income" className="sr-only" />

                <label
                  htmlFor="expense"
                  className={`flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 py-3.5 text-center font-semibold transition-all ease-in-out ${
                    watchType === "expense"
                      ? "border-amber-500 bg-amber-500 text-white shadow-sm"
                      : "border-border bg-card text-foreground hover:border-amber-300 hover:bg-amber-50"
                  }`}
                >
                  <TrendingDown className="size-4" />
                  <span>هزینه</span>
                </label>
                <input type="radio" value="expense" {...register("type")} name="type" id="expense" className="sr-only" />
              </div>
              <FormErrorBox fieldName="type" errors={errors} />
            </div>

            {/* دسته‌بندی */}
            <div className="flex flex-col gap-2.5">
              <FormLable>دسته‌بندی</FormLable>
              <Controller
                name="category"
                control={control}
                rules={{ required: "دسته‌بندی الزامی است" }}
                render={({ field, fieldState: { error } }) => (
                  <>
                    {watchType ? (
                      <div className="flex flex-wrap gap-2">
                        {(watchType === "income" ? incomeCategories : expenseCategories).map((item) => {
                          const isSelected = field.value === item;
                          const activeColor =
                            watchType === "income"
                              ? "border-emerald-500 bg-emerald-500 text-white"
                              : "border-amber-500 bg-amber-500 text-white";
                          const inactiveColor = "border-border bg-card text-foreground hover:bg-muted";
                          return (
                            <button
                              type="button"
                              key={item}
                              onClick={() => field.onChange(item)}
                              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                                isSelected ? activeColor : inactiveColor
                              }`}
                            >
                              {item}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="rounded-lg border border-dashed border-border bg-muted/40 px-4 py-3 text-sm text-muted-foreground">
                        لطفاً ابتدا نوع تراکنش را انتخاب کنید.
                      </div>
                    )}
                    {error && <p className="text-sm text-destructive">{error.message}</p>}
                  </>
                )}
              />
            </div>

            {/* تاریخ شمسی */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-1.5">
                
                <FormLable>تاریخ تراکنش</FormLable>
                <Calendar className="size-4 text-muted-foreground" />
              </div>
              <Controller
                name="date"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    calendar={persian}
                    locale={persian_fa}
                    value={field.value}
                    onChange={(date) => field.onChange(date)}
                    format="YYYY/MM/DD"
                    placeholder="لطفاً تاریخ را انتخاب کنید"
                    inputClass="w-full rounded-lg border-2 border-border bg-card px-4 py-2.5 text-right outline-none transition-all focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                  />
                )}
              />
              <FormErrorBox errors={errors} fieldName="date" />
            </div>

            {/* مبلغ */}
            <div className="flex flex-col gap-2.5">
              <AmountIncomeBox
                label="مبلغ"
                placeholder="۰"
                className="text-right" // راست‌چین کردن ورودی مبلغ
                {...register("amount", { valueAsNumber: true })}
                onWheel={(e) => e.currentTarget.blur()} // برای اینکه جلوگیری کنم از اینکه اگر با قلتک موس اسگرول کرد مبلغ عوض نشه باگ نخوره 
              />
              <FormErrorBox errors={errors} fieldName="amount" />
              {/* نمایش عدد مبلغ به صورت راست‌چین */}
              <div className="flex items-center  gap-1 text-sm font-medium text-muted-foreground">
                <span>مبلغ:</span>
                <span className="text-foreground">{formattedAmount}</span>
                <span>تومان</span>
              </div>
            </div>

            {/* توضیحات */}
            <div className="flex flex-col gap-2.5">
              <FormLable>توضیحات</FormLable>
              <textarea
                rows={3}
                placeholder="توضیحات (اختیاری)"
                className="resize-none rounded-lg border-2 border-border bg-card p-3 text-right outline-none transition-all focus:border-foreground focus:ring-2 focus:ring-foreground/10"
                {...register("Explane")}
              />
              <FormErrorBox errors={errors} fieldName="Explane" />
            </div>
          </div>

          {/* دکمه ثبت */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-auto w-full rounded-xl py-4 text-base font-semibold transition-all ease-in-out hover:scale-[1.01] active:scale-[.99] active:duration-75 sm:text-lg"
          >
            {isSubmitting ? "در حال ذخیره..." : initialData ? "ذخیره تغییرات" : "ثبت تراکنش"}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default TransactionFormPage;