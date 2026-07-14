import Header from "@/components/header/Header";
import TransactionList from "@/components/TransactionList/TransactionList";


export default function Home() {
  return (
    <div dir="rtl" className="">
      <Header></Header>
      <TransactionList/>
    </div>
  );
}
