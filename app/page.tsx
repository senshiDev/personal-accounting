import Header from "@/components/header/Header";
import TransactionList from "@/components/TransactionList/TransactionList";
import Image from "next/image";

export default function Home() {
  return (
    <div dir="rtl" className="">
      <Header></Header>
      <TransactionList/>
    </div>
  );
}
