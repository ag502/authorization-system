import { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";

function SnackBar(props) {
  const { autoHideDuration, open, onClose, message, severity, width } = props;

  useEffect(() => {
    let timer = null;
    if (open) {
      timer = setTimeout(() => {
        onClose();
      }, autoHideDuration * 2);
    }
    return () => clearTimeout(timer);
  }, [open]);

  return (
    open && (
      <BackDrop>
        <SnackBarContatiner
          severity={severity}
          width={width}
          autoHideDuration={autoHideDuration}
        >
          <span>{message}</span>
        </SnackBarContatiner>
      </BackDrop>
    )
  );
}

const BackDrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
`;

const alertColor = {
  background: {
    error: "#FDEDED",
    success: "#EDF7ED",
  },
  fontColor: {
    error: "#5F2120",
    success: "#1E4620",
  },
};

const slideDown = keyframes`
      0% {
          transform: translate(-50%, -80px);
      }
      100% {
          transform: translate(-50%, 0px);
      }
  `;

const snackBarAnimation = css`
  animation: ${(props) =>
    css`
      ${slideDown} ${props.autoHideDuration}ms ease-out
    `};
  animation-iteration-count: 2;
  animation-direction: alternate;
  animation-fill-mode: both;
`;

const SnackBarContatiner = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  padding: 10px;
  width: ${(props) => props.width};
  background-color: ${(props) => alertColor.background[props.severity]};
  color: ${(props) => alertColor.fontColor[props.severity]};
  border-radius: 5px;
  font-weight: bold;
  text-align: center;
  ${snackBarAnimation};
`;

SnackBar.defaultProps = {
  serverity: "success",
  width: "500px",
  autoHideDuration: "1000",
};

export default SnackBar;
