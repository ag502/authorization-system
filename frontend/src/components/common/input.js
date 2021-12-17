import styled from "styled-components";

function Input(props) {
  return (
    <CustomInput
      className={props.className}
      name={props.name}
      type={props.type}
      fullWidth={props.fullWidth}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      value={props.value}
    />
  );
}

const CustomInput = styled.input`
  display: inline-block;
  width: ${(props) => (props.fullWidth ? "100%" : "fit-content")};
  border-radius: 5px;
  border: 1px solid;
  padding: 10px;
`;

Input.defaultProps = {
  type: "text",
  fullWidth: false,
};

export default Input;
