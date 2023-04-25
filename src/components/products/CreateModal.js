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

  const { createProduct, fetchCompanies } = useActions();
  const {
    companies: { data }
  } = useSelector((state) => state.companies);

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createProduct({
      image: data.get("image"),
      name_uz: data.get("name_uz"),
      name_ru: data.get("name_ru"),
      name_en: data.get("name_en"),
      text_uz: data.get("text_uz"),
      text_ru: data.get("text_ru"),
      text_en: data.get("text_en"),
      category_id: data.get("category_id")
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
                className="form-control"
                style={{
                  width: "250px",
                  marginRight: "20px",
                  fontSize: "1rem"
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
                label="Name RU"
                name="name_ru"
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="Name EN"
                name="name_en"
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
                label="text_uz"
                name="text_uz"
                multiline
                maxRows={4}
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="text_ru"
                name="text_ru"
                multiline
                maxRows={4}
                required
              />
            </div>
            <TextField
              sx={{ width: 550, marginBottom: "10px" }}
              label="text_en"
              name="text_en"
              multiline
              maxRows={4}
              required
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
                justifyContent: "space-between"
              }}
            >
              <select
                placeholder="Company"
                className="form-select"
                required
                name="category_id"
                defaultValue={""}
              >
                <option value="" disabled>
                  Select Category
                </option>
                {data?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name_uz}
                  </option>
                ))}
              </select>
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
