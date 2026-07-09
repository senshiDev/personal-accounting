import Link from "next/link"
import Container from "../container/Container"
import { Button } from "../ui/button"


function Header() {
  return (
    <div className="py-5 ">
        <Container>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground text-balance"> 
                        حسابداری من
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        درآمد و هزینه‌های خود را در یک نگاه پیگیری کنید.
                    </p>
                </div>
                <Button className="p-5  text-md font-semibold cursor-pointer" asChild>
                    <Link href="/transaction">ثبت تراکنش</Link>
                </Button>
                
            </div>
            
        </Container>
      
    </div>
  )
}

export default Header
