
type TChildren = {
    children : React.ReactNode
}

function Container({children}: TChildren) {
  return (
    <div className="container mx-auto p-2">
        {children}
    </div>
  )
}

export default Container
