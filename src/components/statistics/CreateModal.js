import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import useActions from "../../hooks/useActions";
import { TextField } from "@mui/material";
import { inputClear } from "../../utils";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CreateModal() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const { createStatistics } = useActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createStatistics({
      key: data.get("key"),
      key_ru: data.get("key_ru"),
      key_en: data.get("key_en"),
      value: data.get("value"),
      value_ru: data.get("value_ru"),
      value_en: data.get("value_en")
    });
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Add company"}</DialogTitle>
        <form onSubmit={handleSubmit}>
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
              />
              <TextField
                sx={{ width: 230 }}
                label="Title RU"
                name="key_ru"
                required
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
              />
              <TextField
                sx={{ width: 230 }}
                label="Count"
                name="value_en"
                required
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
                label="Count"
                name="value"
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="Count"
                name="value_ru"
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Add</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
