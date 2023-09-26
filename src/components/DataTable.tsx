import React, { useEffect, useState } from "react";
import { User, fetchUsers, UpdatedUserData, updateUser } from "../api/UserApi";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import { TablePagination } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import Alert from "@mui/material/Alert";

const rowsPerPageOptions = [5, 10, 25];

const DataTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState<UpdatedUserData>({});
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [searchQuery, setSearchQuery] = useState("");

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await fetchUsers();
        setUsers(fetchedUsers);
        setLoading(false);
        setSuccess(true);
      } catch (error) {
        console.error("Error fetching users:");
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEditDetails = (userId: number) => {
    setSelectedUserId(userId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (selectedUserId && (updatedUserData.name || updatedUserData.job)) {
      updateUser(selectedUserId, {
        name: updatedUserData.name,
        job: updatedUserData.job,
      })
        .then(() => console.log("User details updated successfully."))
        .catch((error) => console.error("Error updating user details"));
    }

    setUpdatedUserData({});
    console.log("Updated user data:", updatedUserData);
  };

  const handleUserDataChange = (field: keyof User, value: string) => {
    setUpdatedUserData((prevUserData) => ({
      ...prevUserData,
      [field]: value,
    }));
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const nameMatch = `${user.first_name} ${user.last_name}`
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const emailMatch = user.email
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return nameMatch || emailMatch;
  });

  return (
    <div>
      <h1>User Dashboard</h1>
      <div className="input">
        <TextField
          label="Search by Last name or Email"
          variant="outlined"
          margin="normal"
          value={searchQuery}
          onChange={handleSearchChange}
          fullWidth
        />
      </div>

      {loading && (
        <div>
          <Skeleton
            variant="rectangular"
            height={50}
            animation="wave"
            style={{ marginBottom: 10 }}
          />
          <Skeleton variant="rectangular" height={200} animation="wave" />
        </div>
      )}

      {success && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Avatar</TableCell>
                <TableCell>First name</TableCell>
                <TableCell>Last name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Button
                        variant="text"
                        color="primary"
                        onClick={() => handleEditDetails(user.id)}
                      >
                        Edit Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {error && <Alert severity="error">Unable to fetch user data</Alert>}

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        count={users.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>Edit User Details</DialogTitle>
        <DialogContent>
          {selectedUserId && (
            <div>
              <TextField
                label="Name"
                value={updatedUserData.name || ""}
                onChange={(e) => handleUserDataChange("name", e.target.value)}
                fullWidth
                style={{ marginBottom: "16px" }}
              />
              <TextField
                label="Job"
                value={updatedUserData.job || ""}
                onChange={(e) => handleUserDataChange("job", e.target.value)}
                fullWidth
                style={{ marginBottom: "16px" }}
              />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Save Changes
          </Button>
          <Button onClick={handleCloseModal} color="error">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DataTable;
