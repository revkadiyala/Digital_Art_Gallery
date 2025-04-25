import { useEffect, useState } from "react";
import { getApihandler } from "../../Apihandler";
import AdminLayout from "../../Layout/AdminLayout";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    getReviews();
  }, []);
  const getReviews = async () => {
    const res = await getApihandler("/getAllReviews");
    if (res.status === 200) {
      setReviews(res.data);
    }
  };
  return (
    <AdminLayout>
      <h1>Reviews</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Art Name</TableCell>
              <TableCell>User Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Review Text</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reviews.map((review) => (
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{review.artId?.art_name}</TableCell>

                <TableCell component="th" scope="row">
                  {review.userId?.user_FullName}
                </TableCell>
                <TableCell>{review.rating}</TableCell>
                <TableCell>{review.reviewText}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </AdminLayout>
  );
}
