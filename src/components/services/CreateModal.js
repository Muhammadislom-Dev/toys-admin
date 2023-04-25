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

  const { createService, fetchProducts } = useActions();
  const {
    products: { data }
  } = useSelector((state) => state.products);

  React.useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    createService({
      images: data.get("images"),
      images: data.get("images"),
      price: data.get("price"),
      title_uz: data.get("title_uz"),
      title_ru: data.get("title_ru"),
      title_en: data.get("title_en"),
      text_uz: data.get("text_uz"),
      text_ru: data.get("text_ru"),
      text_en: data.get("text_en"),
      rating: data.get("rating"),
      video_url: data.get("video_url"),
      catalog_id: data.get("catalog_id")
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
              <div>
                <label htmlFor="image-input">For Image:</label>
                <input
                  id="image-input"
                  className="form-control"
                  style={{
                    width: "250px",
                    marginRight: "20px",
                    fontSize: "1rem"
                  }}
                  name="images"
                  type="file"
                  required
                />
              </div>
              <div>
                <label htmlFor="logo-input">For Logo:</label>
                <input
                  id="logo-input"
                  className="form-control"
                  style={{
                    width: "250px",
                    marginRight: "20px",
                    fontSize: "1rem"
                  }}
                  name="images"
                  type="file"
                  required
                />
              </div>
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
                label="Title"
                name="title_uz"
                required
              />
              <TextField
                sx={{ width: 230 }}
                label="Title RU"
                name="title_ru"
                required
              />
            </div>
            <TextField
              sx={{ width: 550, marginBottom: "10px" }}
              label="Title EN"
              name="title_en"
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
                label="price"
                name="price"
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
                label="rating"
                name="rating"
                multiline
                maxRows={4}
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
              <select
                placeholder="Catalog"
                className="form-select"
                required
                name="catalog_id"
                defaultValue={""}
              >
                <option value="" disabled>
                  Select Catalog
                </option>
                {data?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name_uz}
                  </option>
                ))}
              </select>
              <TextField
                sx={{ width: 230 }}
                label="video"
                name="video_url"
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
