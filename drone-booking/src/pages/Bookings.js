import { useState, useEffect } from "react";
import axios from "../utils/axios";
import { useLocation } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Avatar,
  CircularProgress,
  Button,
  TextField,
} from "@mui/material";
import BookingCard from "../components/BookingCard";
import AddIcon from "@mui/icons-material/Add";

export default function Bookings() {
  const [bookings, setBookings] = useState(null);
  const [originalBookings, setOriginalBookings] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  function searchQuery(searchTerm) {
    if (searchTerm !== "") {
      const filteredBookings = originalBookings.filter((booking) => {
        return (
          booking._id.includes(searchTerm) ||
          booking.locationID.toLowerCase().includes(searchTerm.toLowerCase())
        );
      });
      setBookings(filteredBookings);
    } else {
      setBookings(originalBookings);
    }
  }

  function stringToColor(string) {
    let hash = 0;
    let i;

    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = "#";

    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
        width: 96,
        height: 96,
        fontSize: "48px",
      },
      children:
        name.split(" ").length === 2
          ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
          : `${name.split(" ")[0][0]}`,
    };
  }

  useEffect(() => {
    axios
      .get(`/booking/${location.pathname.split("/")[2]}`)
      .then((res) => {
        setBookings(res.data);
        setOriginalBookings(res.data);
        setLoading(false);
      })
      .catch((e) => console.log(e));
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <Box
          sx={{
            position: "fixed",
            left: "45vw",
            top: "40vh",
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
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Box sx={{ minWidth: "60vw" }}>
            <Paper
              elevation={6}
              sx={{
                p: 2,
                pl: 4,
                pr: 4,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box>
                <Typography sx={{ fontSize: 30, fontWeight: 700 }}>
                  {location.state.name}
                </Typography>
                <Typography sx={{ fontSize: 20, fontWeight: 600 }}>
                  #{location.state._id}
                </Typography>
                <Typography sx={{ fontSize: 18 }}>
                  <strong>Phone no: </strong>
                  {location.state.contact}
                </Typography>
                <Typography sx={{ fontSize: 18 }}>
                  {location.state.email}
                </Typography>

                <Typography sx={{ fontSize: 22 }}>
                  <strong>No. of bookings: </strong>
                  {bookings.length}
                </Typography>
              </Box>
              <Avatar {...stringAvatar(location.state.name)} />
            </Paper>

            <Box
              sx={{
                p: 1,
                mt: 4,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography sx={{ fontSize: 25, fontWeight: 700 }}>
                Bookings:
              </Typography>

              <TextField
                name="name"
                label="Search"
                variant="outlined"
                size="small"
                sx={{ minWidth: "40%" }}
                onChange={(e) => searchQuery(e.target.value)}
              />

              <Button
                variant="contained"
                color="success"
                startIcon={<AddIcon />}
                // onClick={() => setCreateBdo(true)}
              >
                Add Booking
              </Button>
            </Box>

            {bookings.map((booking, id) => {
              return <BookingCard booking={booking} key={id} />;
            })}
          </Box>
        </Box>
      )}
    </>
  );
}