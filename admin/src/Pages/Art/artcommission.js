import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

export default function ArtCommission() {
  const [commissions, setCommission] = useState([]);

  useEffect(() => {
    getArtCommissions();
  }, []);
  const getArtCommissions = async () => {
    const res = await getApihandler("/getAdminCommissions");

    if (res.status === 200) {
      setCommission(res.data);
    }
  };
  return (
    <AdminLayout>
      <h1>Art Commission</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Price</TableCell>
              <TableCell>Commission</TableCell>
              <TableCell>User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {commissions.map((commission) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {commission.price}
                </TableCell>
                <TableCell>{commission.commission}</TableCell>
                <TableCell>{commission.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
