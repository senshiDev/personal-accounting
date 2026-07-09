import { forwardRef } from "react";

type FormInputProp = React.ComponentPropsWithoutRef<"input">;

const FormInput = forwardRef<HTMLInputElement, FormInputProp>(
  ({ className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={`text-right w-full border-2 border-gray-100 
                   outline-none rounded-xl p-3 mt-1 
                   bg-transparent ${className || ""}`}
        {...rest}
        
      />
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;