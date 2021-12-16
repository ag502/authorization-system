import { useState } from "react";

function useFormik({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState({ ...initialValues });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(() =>
    Object.keys(initialValues).reduce((acc, name) => {
      return { ...acc, [name]: false };
    }, {})
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValues = { ...values, [name]: value };
    const newErrors = validate(newValues);

    setValues(newValues);
    setErrors(newErrors);
  };

  const handleBlur = (e) => {
    const { name } = e.target;

    setErrors(validate(values));
    setTouched((props) => ({ ...props, [name]: true }));
  };

  return { values, handleChange, handleBlur, errors, touched };
}

export default useFormik;
