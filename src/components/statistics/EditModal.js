import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useActions from "../../hooks/useActions";
import { useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { inputClear } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ id }) {
  const [open, setOpen] = React.useState(false);
  const { updateStatisticsById, fetchStatisticsById } = useActions();
  const { statistics, statisticsLoading } = useSelector(
    (state) => state.statistics
  );

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchStatisticsById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = {
      key: data.get("key"),
      key_ru: data.get("key_ru"),
      key_en: data.get("key_en"),
      value: data.get("value"),
      value_ru: data.get("value_ru"),
      value_en: data.get("value_en")
    };
    updateStatisticsById({
      id,
      formData
    });
    handleClose();
  };

  return (
    <div>
      <Button variant={"text"} color="primary" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Edit company"}</DialogTitle>
        {statistics?.data && !statisticsLoading && (
          <Box component={"form"} onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between"
                }}
              >
                <TextField
                  sx={{ width: 230, marginRight: "30px" }}
                  label="Title"
                  name="key"
                  required
                  defaultValue={statistics.data.key}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Title RU"
                  name="key_ru"
                  required
                  defaultValue={statistics.data.key_ru}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between"
                }}
              >
                <TextField
                  sx={{ width: 230 }}
                  label="Title EN"
                  name="key_en"
                  required
                  defaultValue={statistics.data.key_en}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Count"
                  name="value_en"
                  required
                  defaultValue={statistics.data.value_en}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between"
                }}
              >
                <TextField
                  sx={{ width: 230 }}
                  label="Title EN"
                  name="value"
                  required
                  defaultValue={statistics.data.value}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Count"
                  name="value_ru"
                  required
                  defaultValue={statistics.data.value_ru}
                />
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </div>
  );
}
