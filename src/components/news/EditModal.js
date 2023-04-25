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
  const { updateNewsById, fetchNewsById, fetchWorkers } = useActions();
  const { news, newsLoading } = useSelector((state) => state.news);
  const {
    workers: { data },
  } = useSelector((state) => state.workers);

  React.useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers]);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchNewsById(id);
  };

  const handleClose = () => {
    setOpen(false);
    inputClear();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const formData = data.get("img_src")
      ? {
          file: data.get("file"),
          title_en: data.get("title_en"),
          title_ru: data.get("title_ru"),
        }
      : {
          file: data.get("file"),
          title_en: data.get("title_en"),
          title_ru: data.get("title_ru"),
        };
    updateNewsById({
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
        {news?.data && !newsLoading && (
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
                  id="image-input"
                  className="form-control"
                  style={{
                    width: "250px",
                    marginRight: "20px",
                    fontSize: "1rem",
                  }}
                  name="img_src"
                  type={"file"}
                  required
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Title"
                  name="title"
                  required
                  defaultValue={news.data.title_uz}
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
                  label="Title RU"
                  name="title_ru"
                  required
                  defaultValue={news.data.title_ru}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Title EN"
                  name="title_en"
                  required
                  defaultValue={news.data.title_en}
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
                  fullWidth
                  label="Text"
                  name="text"
                  multiline
                  maxRows={4}
                  required
                  defaultValue={news.data.text_uz}
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}>
                <TextField
                  fullWidth
                  label="Text RU"
                  name="text_ru"
                  multiline
                  maxRows={4}
                  required
                  defaultValue={news.data.text_ru}
                />
              </div>
              <div
                style={{
                  marginBottom: "10px",
                }}>
                <TextField
                  fullWidth
                  label="Text EN"
                  name="text_en"
                  multiline
                  maxRows={4}
                  required
                  defaultValue={news.data.text_en}
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
