import React, { useEffect, useState } from "react";
import AdminLayout from "../../Layout/AdminLayout";
import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  useScrollTrigger,
} from "@mui/material";
import {
  deleteApihandler,
  getApihandler,
  postApihandler,
  putApihandler,
} from "../../Apihandler";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
export default function Category() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoryname, setCategoryName] = React.useState("");
  // ******** add category **********
  const addCategory = async (e) => {
    e.preventDefault();
    const data = {
      category_name: categoryname,
    };
    const res = await postApihandler("/addCategory", data);
    console.log("add category api response is --->", res);
    if (res.message === "Category added successfully") {
      Swal.fire({
        icon: "success",
        text: "Category add successfully!",
      });
      setOpen(false);
      getCategory();
    }
  };
  // ********* get category *********
  const [data, setData] = useState([]);
  console.log("category data is --->", data);
  useEffect(() => {
    getCategory();
  }, []);
  const getCategory = async () => {
    const res = await getApihandler("/getAllCategory");
    console.log("get category api response is ---->", res);
    if (res.message === "Categories get successfully") {
      setData(res.data);
    }
  };

  // ****** delete category api *********
  const deleteCategory = async (id) => {
    const res = await deleteApihandler(`/deleteCategory/${id}`);
    console.log("delete api respons eis --->", res);
    if (res.message === "Category deleted successfully") {
      Swal.fire({
        icon: "success",
        text: "Category deleted successfully!",
      });
      getCategory();
    }
  };

  // ******** update category ********
  const [open1, setOpen1] = React.useState(false);
  const handleOpen1 = () => setOpen1(true);
  const handleClose1 = () => setOpen1(false);
  const [categoryid, setCategoryId] = useState("");
  const [index, setIndex] = useState();
  useEffect(() => {
    if (index !== null && data[index]) {
      const { category_name } = data[index] || {};
      setCategoryName(category_name || "");
    }
  }, [data, index]);
  const updateCategory = async () => {
    const data = {
      category_name: categoryname,
    };
    const res = await putApihandler(`/updateCategory/${categoryid}`, data);
    console.log("update category api response is --->", res);
    if (res.message === "Category updated successfully") {
      Swal.fire({
        icon: "success",
        text: "Category Updated successfully!",
      });
      setOpen1(false);
      getCategory();
    }
  };
  return (
    <AdminLayout>
      <div style={{ textAlign: "left" }}>
        <Button variant="outlined" onClick={handleOpen}>
          Add Category
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h6>Add Category</h6>
          <TextField
            id="outlined-basic"
            label="Add Category"
            variant="outlined"
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={addCategory}
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>

      {/* ******** get category table ****** */}
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category Name</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((category) => (
              <TableRow
                // key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {category.category_name}
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#d33",
                        cancelButtonColor: "#3085d6",
                        confirmButtonText: "Yes, delete it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                          deleteCategory(category._id);
                        }
                      });
                    }}
                    color="error"
                  >
                    <DeleteIcon sx={{ color: "black" }} />
                  </IconButton>
                  <EditIcon
                    onClick={() => {
                      setCategoryId(category._id);
                      setIndex(
                        data.findIndex((item) => item._id === category._id)
                      );
                      setOpen1(true);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* ******** update modal ****** */}
      <Modal
        open={open1}
        onClose={handleClose1}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h6>Update Category</h6>
          <TextField
            id="outlined-basic"
            label="Update Category"
            variant="outlined"
            value={categoryname}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <div>
            <Button
              variant="contained"
              sx={{ marginTop: "20px" }}
              onClick={updateCategory}
            >
              Update
            </Button>
          </div>
        </Box>
      </Modal>
    </AdminLayout>
  );
}
