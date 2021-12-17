import { useEffect, useCallback, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { SnackBar } from "../components/common";

import { checkLogin } from "../common/api/auth";

function Main() {
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
      const userData = await checkLogin();
      console.log(userData);
    } catch (err) {
      setSnackBarOpen(true);
      setSnackBarMsg(err);
    }
  }, []);

  const handleSnackBarClose = () => {
    setSnackBarOpen(false);
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
    </>
  );
}

export default Main;
