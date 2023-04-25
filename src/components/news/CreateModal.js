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

  const { createNews } = useActions();
  const {
    workers: { data }
  } = useSelector((state) => state.workers);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createNews({
      image: data.get("image"),
      title_uz: data.get("title_uz"),
      title_en: data.get("title_en"),
      title_ru: data.get("title_ru"),
      text_uz: data.get("text_uz"),
      text_en: data.get("text_en"),
      text_ru: data.get("text_ru")
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
              <input
                id="image-input"
                className="form-control"
                style={{
                  width: "250px",
                  marginRight: "20px",
                  fontSize: "1rem"
                }}
                name="image"
                type="file"
                // required
              />
              <TextField
                sx={{ width: 230 }}
                label="Title"
                name="title_uz"
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
                label="Title RU"
                name="title_ru"
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="Title EN"
                name="title_en"
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
                fullWidth
                label="Text"
                name="text_uz"
                multiline
                maxRows={4}
                required
              />
            </div>
            <div
              style={{
                marginBottom: "10px"
              }}
            >
              <TextField
                fullWidth
                label="Text RU"
                name="text_ru"
                multiline
                maxRows={4}
                required
              />
            </div>
            <div
              style={{
                marginBottom: "10px"
              }}
            >
              <TextField
                fullWidth
                label="Text EN"
                name="text_en"
                multiline
                maxRows={4}
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
