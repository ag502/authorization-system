import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { requestAllUsers } from "../common/api/admin";
import { removeTokenToLocalStorage } from "../common/manageToken";
import { parseDashedDate } from "../common/utilFunc";

function Admin() {
  const [accounts, setAccounts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAllUsers();
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

  return (
    <AdminPageContainer>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Account</th>
            <th>가입일</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.id}>
              <TableCell>{account.id}</TableCell>
              <TableCell>{account.name}</TableCell>
              <TableCell>{parseDashedDate(account.createdAt)}</TableCell>
            </tr>
          ))}
        </tbody>
      </Table>
      <LogoutLink onClick={handleLogoutClick}>로그아웃</LogoutLink>
    </AdminPageContainer>
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

const TableCell = styled.td`
  text-align: center;
  border-top: 1px solid #000000;
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
