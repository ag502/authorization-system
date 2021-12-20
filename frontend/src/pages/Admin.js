import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { requestMessage } from "../common/constants";
import { requestAllUsers } from "../common/api/admin";
import { checkLogin } from "../common/api/auth";
import { removeTokenToLocalStorage } from "../common/manageToken";
import { parseDashedDate } from "../common/utilFunc";
import { SnackBar } from "../components/common";

function Admin() {
  const [accounts, setAccounts] = useState([]);
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

      if (userData.roll === "general") {
        throw requestMessage.NOT_ADMIN;
      }
      getAllUsers();
    } catch (err) {
      setSnackBarOpen(true);
      setSnackBarMsg(err);
    }
  }, []);

  const getAllUsers = useCallback(async () => {
    try {
      const { data } = await requestAllUsers();
      setAccounts(data);
    } catch (err) {}
  }, []);

  const handleLogoutClick = () => {
    removeTokenToLocalStorage();
    navigate("/");
  };

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
      />
      {!snackBarOpen && (
        <AdminPageContainer>
          <Table>
            <thead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Account</TableHeader>
                <TableHeader>가입일</TableHeader>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell>{account.id}</TableCell>
                  <TableCell>{account.name}</TableCell>
                  <TableCell>{parseDashedDate(account.createdAt)}</TableCell>
                </TableRow>
              ))}
            </tbody>
          </Table>
          <LogoutLink onClick={handleLogoutClick}>로그아웃</LogoutLink>
        </AdminPageContainer>
      )}
    </>
  );
}

const AdminPageContainer = styled.div`
  width: 90%;
  margin: 20px auto 0;
`;

const Table = styled.table`
  width: 100%;
  background-color: #ffffff;
  border-radius: 10px;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  padding: 15px;
`;

const TableRow = styled.tr`
  border-top: 0.5px solid #e0e0e0;
`;

const TableCell = styled.td`
  text-align: center;
  padding: 15px;
`;

const LogoutLink = styled.div`
  margin-top: 10px;
  text-align: right;
  color: #0aaf9e;
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
`;

export default Admin;
