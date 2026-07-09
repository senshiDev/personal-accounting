type FormLableProps = {
    children : React.ReactNode
}

function FormLable({children} : FormLableProps ) {
  return (
    <label  className='text-lg text-right font-medium text-gray-700' >{children}</label>
  )
}

export default FormLable