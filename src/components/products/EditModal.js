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
  const { updateProductById, fetchProductById, fetchCompanies } = useActions();
  const { products, productsLoading } = useSelector((state) => state.products);
  const {
    companies: { data },
  } = useSelector((state) => state.companies);

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const handleClickOpen = () => {
    setOpen(true);
    inputClear();
    fetchProductById(id);
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
          images: data.get("images"),
          images: data.get("images"),
          name_ru: data.get("name_ru"),
          name_en: data.get("name_en"),
          text_ru: data.get("text_ru"),
          text_en: data.get("text_en"),
          multipack_type: data.get("multipack_type"),
          package_size: data.get("package_size"),
          package_quantity: data.get("package_quantity"),
          type_of_packaging: data.get("type_of_packaging"),
          toy_size: data.get("toy_size"),
          articul: data.get("articul"),
          category_id: data.get("category_id"),
        }
      : {
          images: data.get("images"),
          images: data.get("images"),
          name_ru: data.get("name_ru"),
          name_en: data.get("name_en"),
          text_ru: data.get("text_ru"),
          text_en: data.get("text_en"),
          multipack_type: data.get("multipack_type"),
          package_size: data.get("package_size"),
          package_quantity: data.get("package_quantity"),
          type_of_packaging: data.get("type_of_packaging"),
          toy_size: data.get("toy_size"),
          articul: data.get("articul"),
          category_id: data.get("category_id"),
        };
    updateProductById({
      id: products.data.id,
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
        {products?.data && !productsLoading && (
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
                  style={{
                    fontSize: "1rem",
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
                  defaultValue={products.data.name_uz}
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
                  label="Name RU"
                  name="name_ru"
                  required
                  defaultValue={products.data.name_ru}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Name EN"
                  name="name_en"
                  required
                  defaultValue={products.data.name_en}
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
                  sx={{
                    width: 230,
                  }}
                  label="text_uz"
                  name="text_uz"
                  multiline
                  maxRows={4}
                  required
                  defaultValue={products.data.text_uz}
                />
                <TextField
                  sx={{ width: 230 }}
                  label="Description RU"
                  name="text_ru"
                  multiline
                  maxRows={4}
                  required
                  defaultValue={products.data.text_ru}
                />
              </div>
              <TextField
                sx={{ width: 230 }}
                label="Description EN"
                name="text_en"
                multiline
                maxRows={4}
                required
                defaultValue={products.data.text_en}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                  justifyContent: "space-between",
                }}>
                <select
                  className="form-select"
                  placeholder="Company"
                  required
                  name="category_id"
                  defaultValue={products.data.category_id}>
                  <option value="" disabled>
                    Select Company
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
              <Button type="submit">Edit</Button>
            </DialogActions>
          </Box>
        )}
      </Dialog>
    </div>
  );
}
