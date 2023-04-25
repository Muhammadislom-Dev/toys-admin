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

  const { createWorker, fetchCompanies } = useActions();
  const {
    companies: { data }
  } = useSelector((state) => state.companies);

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createWorker({
      image: data.get("img_src"),
      full_name_uz: data.get("full_name_uz"),
      full_name_ru: data.get("full_name_ru"),
      full_name_en: data.get("full_name_en"),
      job_uz: data.get("job_uz"),
      job_ru: data.get("job_ru"),
      job_en: data.get("job_en"),
      phone_number: data.get("phone_number"),
      instagram: data.get("instagram"),
      telegram: data.get("telegram")
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
                name="img_src"
                type="file"
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
                label="full_name_uz"
                name="full_name_uz"
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="full_name_ru"
                name="full_name_ru"
                required
              />
            </div>
            <TextField
              sx={{ width: 550 }}
              label="full_name_en"
              name="full_name_en"
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
              <TextField
                sx={{ width: 230 }}
                label="Instagram Link"
                name="instagram"
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="job_uz"
                name="job_uz"
                multiline
                maxRows={4}
                required
              />
            </div>
            <TextField
              sx={{ width: 550 }}
              label="job_en"
              name="job_en"
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
              <TextField
                sx={{ width: 230 }}
                label="job_ru"
                name="job_ru"
                multiline
                maxRows={4}
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="telegram"
                name="telegram"
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
                label="Phone"
                name="phone_number"
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
