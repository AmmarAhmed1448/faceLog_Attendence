import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  IconButton,
  Typography,
  Box,
  TextField,
  Stack,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Swal from "sweetalert2";
import { db } from "../../../firebase-config";
import { collection, updateDoc, getDocs, doc, get } from "firebase/firestore";

const EditData = ({ fid, closeEvent }) => {
  console.log("edir table ki fid", fid);
  console.log(fid, "this is from the edit datatable ");
  const [rows, setRows] = useState([]);
  const [EmpId, setEmpId] = useState("");
  const [EmpName, setEmpName] = useState("");
  const [DaysPresent, setDaysPresent] = useState("");
  const [DaysAbsent, setDaysAbsent] = useState("");
  const [DaysLate, setDaysLate] = useState("");
  const [HalfDays, setHalfDays] = useState("");
  const empCollectionRef = collection(db, "EmployeeNew");
  useEffect(() => {
    console.log("FID", fid.id);
    setEmpId(fid.EmpId);
    setEmpName(fid.EmpName);
    setDaysPresent(fid.DaysPresent);
    setDaysAbsent(fid.DaysAbsent);
    setDaysLate(fid.DaysLate);
    setHalfDays(fid.HalfDays);
  }, []);
  const handleEmpIdChange = (event) => {
    setEmpId(event.target.value);
  };
  const handleEmpNameChange = (event) => {
    setEmpName(event.target.value);
  };
  const handleDaysPresentChange = (event) => {
    setDaysPresent(event.target.value);
  };
  const handleDaysAbsentChange = (event) => {
    setDaysAbsent(event.target.value);
  };
  const handleDaysLateChange = (event) => {
    setDaysLate(event.target.value);
  };
  const handleHalfDaysChange = (event) => {
    setHalfDays(event.target.value);
  };

  const CreateUser = async () => {
    const userDoc = doc(db, "EmployeeNew", fid.id);

    const newFields = {
      EmpId: EmpId,
      EmpName: EmpName,
      DaysPresent: DaysPresent,
      DaysAbsent: DaysAbsent,
      DaysLate: DaysLate,
      HalfDays: HalfDays,
    };
    await updateDoc(userDoc, newFields);
    getUsers(); // Update the list according to the data
    closeEvent(); // Correct function name
    Swal.fire("Edit successful"); // Display success message
  };

  const getUsers = async () => {
    try {
      const data = await getDocs(empCollectionRef);
      const sortedRows = data.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }))
        .sort((a, b) => a.EmpId - b.EmpId); // Sorting based on EmpId

      setRows(sortedRows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <Box sx={{ m: 2 }} />
      <Typography variant="h5" align="center">
        Edit Data
      </Typography>
      <IconButton
        style={{ position: "absolute", top: "0", right: "0" }}
        onClick={closeEvent}
      >
        <CloseIcon />
      </IconButton>
      <Box height={40} />
      <Grid continer spacing={2}>
        <Stack spacing={2} direction="row">
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="EmpId"
              type="number"
              variant="outlined"
              size="small"
              value={EmpId}
              onChange={handleEmpIdChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="Empname"
              type="text"
              variant="outlined"
              size="small"
              value={EmpName}
              onChange={handleEmpNameChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="present"
              type="number"
              variant="outlined"
              size="small"
              value={DaysPresent}
              onChange={handleDaysPresentChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="absent"
              type="number"
              variant="outlined"
              size="small"
              value={DaysAbsent}
              onChange={handleDaysAbsentChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="late"
              type="number"
              variant="outlined"
              size="small"
              value={HalfDays}
              onChange={handleHalfDaysChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
          <br />
          <Grid item xs={12}>
            <TextField
              id="outlined-basic"
              label="half"
              type="number"
              variant="outlined"
              size="small"
              value={DaysLate}
              onChange={handleDaysLateChange}
              style={{ minWidth: "100%" }}
            />
          </Grid>
        </Stack>
        <br />
        <Grid item xs={12}>
          <Typography variant="h5" align="center">
          <Button
  variant="contained"
  onClick={CreateUser}
  sx={{
    backgroundColor: "#16344F",
    color: "white",
    marginTop: "20px",
    "&:hover": {
      backgroundColor: "#16344F", // Set the hover background color to match the button's background color
    },
  }}
>
  Submit
</Button>

          </Typography>
        </Grid>
      </Grid>
      <Box sx={{ m: 4 }} />
    </>
  );
};

export default EditData;
