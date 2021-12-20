import { useEffect, useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { SnackBar, UserProfile } from "../components/common";
import { checkLogin } from "../common/api/auth";
import { removeTokenToLocalStorage } from "../common/manageToken";

function Main() {
  const [userName, setUserName] = useState("");
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const isMounted = useRef(false);

  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isMounted.current && !snackBarOpen) {
      navigate("/");
    }
    isMounted.current = true;
  }, [snackBarOpen]);

  const checkAuth = useCallback(async () => {
    try {
      const { userData } = await checkLogin();
      setUserName(userData.data);
    } catch (err) {
      setSnackBarOpen(true);
      setSnackBarMsg(err);
    }
  }, []);

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
  };

  const handleLogoutClick = () => {
    removeTokenToLocalStorage();
    navigate("/");
  };

  return (
    <>
      <SnackBar
        open={snackBarOpen}
        message={snackBarMsg}
        onClose={handleSnackBarClose}
        autoHideDuration={700}
        severity='error'
      >
        {snackBarMsg}
      </SnackBar>
      {userName && (
        <UserInfoContainer>
          <UserProfile userName={userName} />
          <LogoutLink onClick={handleLogoutClick}>LogOut</LogoutLink>
        </UserInfoContainer>
      )}
    </>
  );
}

const UserInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 500px;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
`;

const LogoutLink = styled.div`
  color: #0aaf9e;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

export default Main;
