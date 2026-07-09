import FormInput from "../FormInput/FormInput";
import FormLable from "../FormLable/FormLable";



type FormEmailProps = {
  label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;


function AmountIncomeBox( { placeholder , label , ...inputProps} : FormEmailProps ) {
  return (
    <div className='email flex flex-col gap-2'>
            <FormLable> {label}</FormLable>
            <FormInput   placeholder={placeholder}   {...inputProps} type="number" />
    </div>
  )
}

export default AmountIncomeBox
