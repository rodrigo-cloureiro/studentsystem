import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Icon, Box, Typography } from "@mui/material";
import styles from "../components/Students.module.css";
import { Delete, Edit } from "@mui/icons-material";

export default function Student() {
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [searchStudent, setSearchStudent] = useState([]);

  const clear = () => {
    setIsEditing(false);
    setName("");
    setAddress("");
    setStudent(null);
  };

  const handleAddStudent = (e) => {
    e.preventDefault();
    const student = { name, address };
    console.log(student);
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("New Student added");
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        setStudents(result);
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      });
  }, [students]);

  const handleDeleteStudent = (student) => {
    console.log(student);
    fetch("http://localhost:8080/student/delete", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then(() => {
      console.log("Student is deleted");
    });
  };

  const handleConfirmEditStudent = () => {
    console.log(student);
    const std = { id: `${student.id}`, name, address };
    console.log(std);
    fetch("http://localhost:8080/student/edit/" + student.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(std),
    }).then(() => {
      console.log("Student was edited");
    });
    clear();
  };

  const handleEditStudent = (student) => {
    setName(student.name);
    setAddress(student.address);
    setStudent(student);
    setIsEditing(true);
  };

  const handleSearchStudent = () => {
    fetch("http://localhost:8080/student/search?name=" + name)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSearchStudent(result.length == 0 ? null : result);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Container>
      <Paper elevation={3} style={paperStyle}>
        <h1 className={styles.title}>Add Student</h1>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Student Adress"
            variant="outlined"
            margin="dense"
            fullWidth
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          {isEditing ? (
            <Button
              variant="contained"
              className={styles.btn_submit}
              onClick={handleConfirmEditStudent}
              fullWidth
            >
              Confirm Edit
            </Button>
          ) : (
            <Button
              variant="contained"
              className={styles.btn_submit}
              onClick={handleAddStudent}
              fullWidth
            >
              Submit
            </Button>
          )}
        </form>
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1 className={styles.subtitle}>Students</h1>
        {students.length == 0 ? (
          <>
            {error == null ? (
              <Typography color="#1876d2" fontSize="1.25rem">
                Loading...
              </Typography>
            ) : (
              <Typography color="error" fontWeight="bold" fontSize="1.25rem">
                Error: {error}
              </Typography>
            )}
          </>
        ) : (
          students.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              className={styles.students}
              key={student.id}
            >
              Id: {student.id}
              <br />
              Name: {student.name}
              <br />
              Address: {student.address}
              <Box display={"flex"} gap={"10px"}>
                <Button
                  variant="contained"
                  onClick={() => handleDeleteStudent(student)}
                  fullWidth
                >
                  <Icon>
                    <Delete />
                  </Icon>
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleEditStudent(student)}
                  fullWidth
                >
                  <Icon>
                    <Edit />
                  </Icon>
                </Button>
              </Box>
            </Paper>
          ))
        )}
      </Paper>

      <Paper elevation={3} style={paperStyle}>
        <h1 className={styles.title}>Search Student</h1>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Student Name"
            variant="outlined"
            margin="dense"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Button variant="contained" onClick={handleSearchStudent} fullWidth>
            Search
          </Button>
        </form>
        {searchStudent == null ? (
          <Typography color="error" fontWeight="bold" margin="4px 0 0 0">
            Student not found...
          </Typography>
        ) : (
          searchStudent.map((student) => (
            <Paper
              elevation={6}
              style={{ margin: "10px", padding: "15px", textAlign: "left" }}
              className={styles.students}
              key={student.id}
            >
              Id: {student.id}
              <br />
              Name: {student.name}
              <br />
              Address: {student.address}
            </Paper>
          ))
        )}
      </Paper>
    </Container>
  );
}
