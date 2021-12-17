import styled from "styled-components";

function Button(props) {
  const { height, children, color, fontColor, fullWidth, type } = props;
  return (
    <CustomButton
      height={height}
      color={color}
      fontColor={fontColor}
      fullWidth={fullWidth}
      type={type}
    >
      {children}
    </CustomButton>
  );
}

const CustomButton = styled.button`
  height: ${(props) => props.height};
  width: ${(props) => (props.fullWidth ? "100%" : "fit-content")};
  padding: 10px;
  border-radius: 5px;
  background-color: ${(props) => props.color};
  color: ${(props) => props.fontColor};
  cursor: pointer;
`;

Button.defaultProps = {
  height: "44px",
  disabled: false,
  color: "#0AAF9E",
  fontColor: "#000000",
  fullWidth: false,
  type: "button",
};

export default Button;
