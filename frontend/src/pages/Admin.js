import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";

import { requestAllUsers } from "../common/api/admin";
import { parseDashedDate } from "../common/utilFunc";

function Admin() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = useCallback(async () => {
    try {
      const { data } = await requestAllUsers();
      setAccounts(data);
    } catch (err) {}
  }, []);

  return (
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
  );
}

const Table = styled.table`
  width: 90%;
  margin: 20px auto 0;
  background-color: #ffffff;
  border-radius: 10px;
  border-collapse: collapse;
`;

const TableCell = styled.td`
  text-align: center;
  border-top: 1px solid #000000;
`;

export default Admin;
