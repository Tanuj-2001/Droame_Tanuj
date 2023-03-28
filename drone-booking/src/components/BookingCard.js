import { Divider, IconButton, Paper, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function BookingCard({ booking }) {
  const date = new Date(booking.createdAt);
  return (
    <>
      <Paper
        elevation={0}
        sx={{
          m: 1,
          p: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography>
            <strong>Booking ID:</strong> {booking._id}
          </Typography>
          <Typography>
            <strong>Location: </strong> {booking.locationID}
          </Typography>
          <Typography>
            <strong>Drone-shot ID: </strong> {booking.droneShotID}
          </Typography>
          <Typography>
            <strong>Created On: </strong> {date.toDateString()}
          </Typography>
        </Box>

        <Box>
          <IconButton
            color="secondary"
            // onClick={() =>
            //   dispatch({ type: "updateEditBackdrop", payload: true })
            // }
          >
            <EditIcon />
          </IconButton>

          <IconButton
            color="error"
            // onClick={() =>
            //   dispatch({ type: "updateDeleteBackdrop", payload: true })
            // }
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Paper>
      <Divider />
    </>
  );
}