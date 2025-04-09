import { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import { getApihandler } from "../../Apihandler";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
export default function BookedArts() {
  const [buyarts, setBuyArts] = useState([]);

  useEffect(() => {
    getBookedArts();
  }, []);
  const getBookedArts = async () => {
    const res = await getApihandler("/getAllBuyArt");

    if (res.status === 200) {
      setBuyArts(res.data);
    }
  };
  return (
    <AdminLayout>
      <h4>Buy Arts</h4>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="booked arts table">
          <TableHead>
            <TableRow>
              <TableCell>Art Name</TableCell>
              <TableCell>Artist Name</TableCell>

              <TableCell>Price</TableCell>
              <TableCell>Buyer Name</TableCell>
              <TableCell>Card Holder Name</TableCell>

              <TableCell>Payment Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {buyarts.map((arts, index) => (
              <TableRow key={index}>
                <TableCell>{arts.art_Id?.art_name || "-"}</TableCell>
                <TableCell>{arts.art_Id?.artist_name || "-"}</TableCell>

                <TableCell>{arts.art_Id?.price || "-"}</TableCell>
                <TableCell>{arts.user_Id?.user_FullName || "-"}</TableCell>
                <TableCell>{arts.cardDetails?.cardHolderName || "-"}</TableCell>

                <TableCell>{arts.paymentStatus || "-"}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
