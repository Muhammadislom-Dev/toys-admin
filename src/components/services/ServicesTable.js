import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button, TableHead } from "@mui/material";
import { useSelector } from "react-redux";
import CreateModal from "./CreateModal";
import useActions from "../../hooks/useActions";
import Loader from "../layout/loader";
import EditModal from "./EditModal";
import { IMAGE_URL } from "../../utils";

export default function ServicesTable() {
  const [data, setData] = React.useState([]);
  const { services, singleServiceLoading, servicesLoading } = useSelector(
    (state) => state.services
  );

  const { deleteServiceById, fetchServices } = useActions();

  React.useEffect(() => {
    fetchServices();
  }, [fetchServices, singleServiceLoading]);

  React.useEffect(() => {
    if (Array.isArray(services?.data)) setData(services.data);
  }, [services, servicesLoading]);

  const handleDelete = (id) => {
    deleteServiceById(id);
  };

  console.log(data);

  return (
    <>
      {singleServiceLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              style={{
                backgroundColor: "rgb(220, 220, 220)"
              }}
            >
              <TableRow>
                <TableCell>
                  <b>
                    <i>Image</i>
                  </b>
                </TableCell>

                <TableCell>
                  <b>
                    <i>Title</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>Title RU</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>Price</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <b>
                    <i>Text</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <b>
                    <i>Catalog</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <CreateModal />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map((service) => (
                  <TableRow key={service.id}>
                    <TableCell width={200}>
                      <img
                        src={`${
                          IMAGE_URL + service.product_images[0].images_src
                        }`}
                        height={50}
                        style={{
                          objectFit: "contain"
                        }}
                      />
                    </TableCell>
                    <TableCell>{service.title_uz}</TableCell>
                    <TableCell>{service.title_ru}</TableCell>
                    <TableCell>{service.price}</TableCell>
                    <TableCell align="right">{service.text_uz}</TableCell>
                    <TableCell align="right">{service.catalog.name_uz}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end"
                        }}
                      >
                        <EditModal id={service.id} />
                        <Button
                          color="error"
                          onClick={handleDelete.bind(null, service.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  );
}
