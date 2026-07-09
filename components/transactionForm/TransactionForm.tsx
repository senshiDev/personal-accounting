"use client"

import { Controller, useForm, useWatch } from "react-hook-form"
import FormLable from "../FormLable/FormLable"
import { zodResolver } from "@hookform/resolvers/zod"
import { expenseCategories, incomeCategories, TransactionInputSchema, TTransactionSchema, TTransactionStored } from "@/lib/Transaction"
import FormErrorBox from "../FormErrorBox/FormErrorBox"

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { toGregorian } from "jalaali-js";
import AmountIncomeBox from "../AmountIncomeBox/AmountIncomeBox"
import { Button } from "../ui/button"
import { addTransaction } from "@/lib/addTransaction"

import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


function TransactionForm() {

  const {
    register,
    handleSubmit,
    control,
    formState : {errors ,isSubmitting},

  } = useForm<TTransactionSchema>({
    resolver : zodResolver(TransactionInputSchema),
    mode : "onChange",
  })

  const router = useRouter()

  const watchType = useWatch({
    control : control,
    name : "type"
  })

  const liveAmount = useWatch({
            control : control ,
            name : "amount"
  })

  const formattedAmount = typeof liveAmount === 'number' && !isNaN(liveAmount)
    ? liveAmount.toLocaleString('fa-IR')
    : '0';

  const onSubmitTransaction = (data  :TTransactionSchema) => {
    const { year, month, day } = data.date;
    const g = toGregorian(year, month.number, day);
    const miladiString = `${g.gy}-${String(g.gm).padStart(2, '0')}-${String(g.gd).padStart(2, '0')}`;
    
    
    // تبدیل به نوع ذخیره
    const storedData: TTransactionStored = data.type === "income"
    ? {
      type: "income",
      category: data.category as typeof incomeCategories[number],
      amount: data.amount,
      Explane: data.Explane,
      date: miladiString,
      }
    : {
      type: "expense",
      category: data.category as typeof expenseCategories[number],
      amount: data.amount,
      Explane: data.Explane,
      date: miladiString,
    };

    
    const result = addTransaction(storedData)

    if (result) {
      toast.success("تراکنش با موفقیت ثبت شد!", {className: 'bg-emerald-500 text-white border-2 border-emerald-700',})
      setTimeout(() => {
        router.push("/") // مسیر صفحه اصلی را تنظیم کنید
      }, 1500)
    } else {
      toast.error("خطا در ثبت تراکنش. لطفاً دوباره تلاش کنید.")
    }
  }

  return (
    <div className="flex justify-center items-center ">
      <form onSubmit={handleSubmit(onSubmitTransaction)} className="Form text-right flex flex-col  min-h-[80vh] gap-5 bg-white px-5 md:px-7 py-7 my-2 rounded-xl md:border-2 border-gray-100 w-full sm:w-8/12 lg:w-10/12 ">
        <h2 className="text-xl md:text-2xl font-semibold">+ افزودن تراکنش جدید</h2>
        <div className="mt-10 flex flex-col gap-5 h-full">
          <FormLable children={"نوع تراکنش"}  />
          <div dir="rtl" className="flex gap-4 justify-between w-full">
            <div className="flex gap-2 w-3/6 ">
                    <label htmlFor="income" className={`border-2 border-emerald-100 py-4 px-8 rounded-xl cursor-pointer w-full text-center font-semibold hover:shadow-sm hover:bg-green-100 hover:text-black hover:border-green-100 shadow-green-100 transition-all  ease-in-out ${watchType === "income" ? "bg-emerald-500 border-emerald-500 text-white" : "" } `} >درآمد</label>
                    <input type="radio" value={"income"} {...register("type")} name="type" id="income" className="sr-only"  />
            </div>
            <div className="flex gap-2 w-3/6">
              <label htmlFor="expense" className={`border-2 border-yellow-100 py-4 px-8 rounded-xl cursor-pointer w-full text-center font-semibold  hover:shadow-sm hover:bg-yellow-100 hover:text-black hover:border-yellow-100 shadow-yellow-100 transition-all  ease-in-out ${watchType === "expense" ? "bg-yellow-500 border-yellow-500 text-white" : "" }`}>هزینه</label>
              <input type="radio" value={"expense"} {...register("type")}   name="type" id="expense" className="sr-only"  />
            </div>   
          </div>
          <FormErrorBox fieldName={"type"} errors={errors}></FormErrorBox>

          <FormLable children={" دسته بندی"}  />

          <Controller
            name="category"
            control={control}
            rules={{ required: "دسته‌بندی الزامی است" }}
            render={({ field, fieldState: { error } }) => (
              <>
              {/* فقط اگر نوع انتخاب شده بود، لیست را نشان بده */}
              {watchType ? (
                <div className="flex gap-2 w-full flex-wrap p-2">
                {(watchType === "income" ? incomeCategories : expenseCategories).map((item) => {
                  const isSelected = field.value === item;
            
                  // تعیین رنگ بر اساس نوع (سبز برای درآمد، قرمز/نارنجی برای هزینه)
                  const activeColor = watchType === "income" 
                  ? "bg-emerald-500 text-white" 
                  : "bg-yellow-500 text-white";
                          
                  const inactiveColor = watchType === "income" 
                  ? "bg-emerald-100 text-black" 
                  : "bg-yellow-100 text-gray-800";

                  return (
                    <div
                      key={item}
                      onClick={() => field.onChange(item)}
                      className={`px-4 py-2 rounded-md cursor-pointer transition-all ${
                        isSelected ? activeColor : inactiveColor
                      }`}
                    >
                      {item}
                    </div>
                  );
                })}
                </div>
              ) : (
              <p className="text-gray-400 text-sm italic">لطفاً ابتدا نوع تراکنش را انتخاب کنید.</p>
            )}
            {error && <p className="text-red-500 text-sm">{error.message}</p>}
              </>
            )}
          />

          {/* فیلد تاریخ شمسی */}
                <FormLable children={"تاریخ تراکنش"} />
                <Controller
                  name="date"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <>
                      <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        value={field.value}
                        onChange={(date) => field.onChange(date)}
                        format="YYYY/MM/DD"
                        placeholder="لطفاً تاریخ را انتخاب کنید"
                   
                   
                  inputClass="w-full px-4 py-2 text-right border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"

                />
                    </>
                  )}
                />
                <FormErrorBox errors={errors} fieldName={"date"} />

                <AmountIncomeBox label="مقدار " {...register("amount" , { valueAsNumber: true })}   />
                <FormErrorBox errors={errors} fieldName={"amount"}></FormErrorBox>

                <div className="showNumInBox mt-0 text-gray-400  font-semibold">
                  <span>مقدار : </span>
                  <span>{formattedAmount}</span>
                  <span> تومان </span>
                </div>

                <div className="flex flex-col gap-4">
                    {/* tozihat */}
                    <FormLable children={"توضیحات"} />
                    <textarea dir="rtl" className="p-2 outline-none border-2 border-gray-100  rounded-md " {...register("Explane")}></textarea>
                    <FormErrorBox errors={errors} fieldName={"Explane"}></FormErrorBox>
                </div>
        </div>
        <div className="flex gap-2 mt-5 ">
          <Button className="flex justify-center  font-vazir items-center text-center gap-2 py-6 border-2 border-gray-200 rounded-xl active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out cursor-pointer bg-purple-600  text-white  font-semibold text-md md:text-xl  w-full">
            ثبت تراکنش
          </Button>
        </div>
      </form>
    </div>
  )
}

export default TransactionForm
