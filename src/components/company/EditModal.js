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
  const { updateCompanyById, fetchCompanyById } = useActions();
  const { singleCompany, companiesLoading } = useSelector(
    (state) => state.companies
  );

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchCompanyById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = data.get("image")
      ? {
          name_ru: data.get("name_ru"),
          name_en: data.get("name_en"),
          text_ru: data.get("text_ru"),
          text_en: data.get("text_en"),
        }
      : {
          name_ru: data.get("name_ru"),
          name_en: data.get("name_en"),
          text_ru: data.get("text_ru"),
          text_en: data.get("text_en"),
        };
    updateCompanyById({
      id,
      formData,
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
        {singleCompany?.data && !companiesLoading && (
          <Box component={"form"} onSubmit={handleSubmit} noValidate>
            <DialogContent>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}>
                <div>
                  <label htmlFor="company-image">For company image:</label>
                  <input
                    id="company-image"
                    style={{
                      fontSize: "1rem",
                      marginBottom: "20px",
                    }}
                    name="image"
                    type="file"
                    required
                  />
                  <TextField
                    sx={{ width: 230 }}
                    label="Title"
                    name="name_uz"
                    required
                    defaultValue={singleCompany.data.name_uz}
                  />
                </div>
                <div>
                  <TextField
                    sx={{ width: 230 }}
                    style={{ marginBottom: "10px" }}
                    label="Title RU"
                    name="name_ru"
                    required
                    defaultValue={singleCompany.data.name_ru}
                  />
                  <TextField
                    sx={{ width: 230 }}
                    style={{ marginBottom: "10px" }}
                    label="Title EN"
                    name="name_en"
                    required
                    defaultValue={singleCompany.data.name_en}
                  />
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  marginBottom: "10px",
                }}>
                <div>
                  <TextField
                    sx={{
                      width: 230,
                      marginBottom: "10px",
                    }}
                    label="Description"
                    name="text_uz"
                    multiline
                    maxRows={4}
                    required
                    defaultValue={singleCompany.data.text_uz}
                  />
                  <TextField
                    sx={{ width: 230 }}
                    label="Description RU"
                    name="text_ru"
                    multiline
                    maxRows={4}
                    required
                    defaultValue={singleCompany.data.text_ru}
                  />
                </div>
                <TextField
                  sx={{ width: 230 }}
                  label="Description EN"
                  name="text_en"
                  multiline
                  maxRows={4}
                  required
                  defaultValue={singleCompany.data.text_en}
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
