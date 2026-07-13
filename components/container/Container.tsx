
type TChildren = {
    children : React.ReactNode
}

function Container({children}: TChildren) {
  return (
    <div className="container mx-auto px-5 md:px-10 lg:px-15 xl:px-20">
        {children}
    </div>
  )
}

export default Container
