import {
    Box,
    CircularProgress,
    Typography,
    Button,
    Backdrop,
    Snackbar,
    Alert,
    TextField,
  } from "@mui/material";
  import axios from "../utils/axios";
  import { useEffect, useState } from "react";
  import CustomerCard from "../components/CustomerCard";
  import AddIcon from "@mui/icons-material/Add";
  import CreateCustomer from "../components/CreateCustomer";
  
  export default function ListCustomers() {
    const [customers, setCustomers] = useState(null);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(false);
    const [originalCustomers, setOriginalCustomers] = useState(null);
  
    const [createBdo, setCreateBdo] = useState(false);
  
    useEffect(() => {
      axios
        .get("/customer")
        .then((res) => {
          setCustomers(res.data);
          setOriginalCustomers(res.data);
          setLoading(false);
        })
        .catch((e) => {
          setAlert(true);
          console.log(e);
        });
    }, []);
  
    function searchQuery(searchTerm) {
      if (searchTerm !== "") {
        const filteredCustomers = originalCustomers.filter((customer) => {
          return (
            customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            customer.email.includes(searchTerm)
          );
        });
        setCustomers(filteredCustomers);
      } else {
        setCustomers(originalCustomers);
      }
  
    }
  
  
  
    return (
      <>
        <Snackbar
          open={alert}
          autoHideDuration={5000}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          onClose={() => setAlert(false)}
        >
          <Alert severity="error" variant="filled">
            Cannot connect to server!
          </Alert>
        </Snackbar>
  
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={createBdo}
        >
          <CreateCustomer
            setCreateBdo={setCreateBdo}
            setCustomers={setCustomers}
            setOriginalCustomers={setOriginalCustomers}
          />
        </Backdrop>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box
            sx={{
              p: 1,
              minWidth: "50vw",
              position: "relative",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pl: 1,
                mb: 3,
                pr: 1,
                position: "relative",
              }}
            >
              <Typography variant="h4">Customers</Typography>
  
              <TextField
                name="name"
                label="Search"
                variant="outlined"
                size="small"
                onChange={(e) => searchQuery(e.target.value)}
              />
  
              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                onClick={() => setCreateBdo(true)}
              >
                Add Customer
              </Button>
            </Box>
  
            {loading ? (
              <Box
                sx={{
                  position: "absolute",
                  left: "20vw",
                  top: "20vh",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <CircularProgress size={70} />
                <Typography variant="h4" sx={{ mt: 2 }}>
                  Loading...
                </Typography>
              </Box>
            ) : (
              <>
                {customers.map((customer, id) => {
                  return (
                    <CustomerCard
                      customer={customer}
                      key={id}
                      setCustomers={setCustomers}
                      setOriginalCustomers={setOriginalCustomers}
                    />
                  );
                })}
              </>
            )}
          </Box>
        </Box>
      </>
    );
  }