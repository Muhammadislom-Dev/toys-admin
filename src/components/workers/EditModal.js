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
  const { updateWorkerById, fetchWorkerById, fetchCompanies } = useActions();
  const { workers, workersLoading } = useSelector((state) => state.workers);
  const {
    companies: { data },
  } = useSelector((state) => state.companies);

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchWorkerById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    updateWorkerById({
      file: data.get("file"),
      title_en: data.get("title_en"),
      title_ru: data.get("title_ru"),
      id,
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
        aria-describedby="alert-dialog-slide-description">
        <DialogTitle>{"Edit company"}</DialogTitle>
        {workers?.data && !workersLoading && (
          <Box component={"form"} onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <input
                  className="form-control"
                  style={{
                    width: "250px",
                    marginRight: "20px",
                    fontSize: "1rem",
                  }}
                  name="img_src"
                  type="file"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <TextField
                  sx={{ width: 230 }}
                  label="full_name_uz"
                  name="full_name_uz"
                  required
                  defaultValue={workers.data.full_name_uz}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="full_name_ru"
                  name="full_name_ru"
                  required
                  defaultValue={workers.data.full_name_ru}
                />
              </div>
              <TextField
                sx={{ width: 230 }}
                label="full_name_en"
                name="full_name_en"
                required
                defaultValue={workers.data.full_name_en}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <TextField
                  sx={{ width: 230 }}
                  label="job_uz"
                  name="job_uz"
                  required
                  defaultValue={workers.data.job_uz}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="job_ru"
                  name="job_ru"
                  multiline
                  required
                  defaultValue={workers.data.job_ru}
                />
              </div>
              <TextField
                sx={{ width: 230 }}
                label="job_en"
                name="job_en"
                required
                defaultValue={workers.data.job_en}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <TextField
                  sx={{ width: 230 }}
                  label="instagram"
                  name="instagram"
                  multiline
                  required
                  defaultValue={workers.data.instagram}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="phone_number"
                  name="phone_number"
                  required
                  defaultValue={workers.data.phone_number}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <TextField
                  sx={{ width: 230 }}
                  label="telegram"
                  name="telegram"
                  required
                  defaultValue={workers.data.telegram}
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
