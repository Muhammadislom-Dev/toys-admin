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

  const { createCompany } = useActions();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createCompany({
      image: data.get("image"),
      name_uz: data.get("name_uz"),
      name_ru: data.get("name_ru"),
      name_en: data.get("name_en"),
      text_ru: data.get("text_ru"),
      text_uz: data.get("text_uz"),
      text_en: data.get("text_en")
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
        <DialogTitle>{"Add categories"}</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px"
              }}
            >
              <div>
                <label htmlFor="company-image">For company image:</label>
                <input
                  id="company-image"
                  style={{
                    fontSize: "1rem",
                    marginBottom: "20px"
                  }}
                  name="image"
                  type="file"
                  required
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Name"
                  name="name_uz"
                  required
                />
              </div>
              <div>
                <TextField
                  sx={{ width: 230 }}
                  style={{ marginBottom: "10px" }}
                  label="Name RU"
                  name="name_ru"
                  required
                />
                <TextField
                  sx={{ width: 230 }}
                  style={{ marginBottom: "10px" }}
                  label="Name EN"
                  name="name_en"
                  required
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                marginBottom: "10px"
              }}
            >
              <div>
                <TextField
                  sx={{ width: 230, marginBottom: "10px" }}
                  label="text_ru"
                  name="text_ru"
                  required
                />
                <TextField
                  sx={{ width: 230 }}
                  label="text_uz"
                  name="text_uz"
                  required
                />
              </div>
              <TextField
                sx={{ width: 550 }}
                label="text_en"
                name="text_en"
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
