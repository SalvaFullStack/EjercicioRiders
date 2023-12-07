import React, { useState, useEffect } from "react";
import { useCustomers } from "hooks";
import customerService from "src/services/customer-service";
import { Link } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Add from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { CircularProgress } from "@mui/material";

const baseURL = "http://localhost:4040/api/customers";

export default function CustomersPage() {
  const [viewMode, setViewMode] = useState(false);
  const { customers, loading, errors } = useCustomers();

  if (loading) return <CircularProgress />;

  const handleViewMode = () => {
    setViewMode(!viewMode);
  };
  const handleAddCustomer = () => {
    console.log("apiticaun");
  };
  const renderList = () => (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" component="h2">
          Entity
        </Typography>
        <Stack direction="row">
          <Button
            onClick={handleAddCustomer}
            variant="contained"
            color="primary"
          >
            Vista mosaico
          </Button>
          <Button
            onClick={handleViewMode}
            variant="contained"
            color="secondary"
            component={Link}
            to="/customer/new"
          >
            Añadir cliente
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.name}>
                <TableCell component="th" scope="row">
                  {customer.name}
                </TableCell>
                <TableCell align="right">{customer.latitude}</TableCell>
                <TableCell align="right">{customer.longitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <p>Entity List</p>
    </Stack>
  );

  const renderMosaic = () => (
    <Stack spacing={3}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h2" component="h2">
          Entity
        </Typography>
        <Stack direction="row">
          <Button
            onClick={handleAddCustomer}
            variant="contained"
            color="primary"
          >
            Añadir Cliente
          </Button>
          <Button
            onClick={handleViewMode}
            variant="contained"
            color="primary"
            component={Link}
            to="/customer/new"
          >
            Mosaico
          </Button>
        </Stack>
      </Stack>

      <Grid container spacing={3}>
        {customers.map((customer, index) => (
          <Grid item key={customer.name} xs={6} sm={3}>
            <Paper>
              <Typography>{customer.name}</Typography>
              <Typography variant="body2">{customer.latitude}</Typography>
              <Typography variant="body2">{customer.longitude}</Typography>
            </Paper>
            {index % 2 === 1 && <br />}
          </Grid>
        ))}
      </Grid>
      <p>Entity Mosaic</p>
    </Stack>
  );

  return viewMode ? renderMosaic() : renderList();
}
