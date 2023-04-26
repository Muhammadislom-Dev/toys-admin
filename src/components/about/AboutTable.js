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

export default function AboutTable() {
  const [data, setData] = React.useState([]);
  const { about, singleAboutLoading, aboutLoading } = useSelector(
    (state) => state.about
  );

  const { deleteAboutById, fetchAbout } = useActions();

  React.useEffect(() => {
    fetchAbout();
  }, [fetchAbout, singleAboutLoading]);

  React.useEffect(() => {
    if (Array.isArray(about?.data)) setData(about.data);
  }, [about, aboutLoading]);

  const handleDelete = (id) => {
    deleteAboutById(id);
  };

  return (
    <>
      {singleAboutLoading ? (
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
                <TableCell align="center">
                  <b>
                    <i>Image</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <CreateModal />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map((worker) => (
                  <TableRow key={worker.id}>
                    <TableCell width={200} align="center">
                      <img
                        src={`${IMAGE_URL + worker.image_src}`}
                        alt=""
                        height={50}
                        style={{
                          objectFit: "contain"
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end"
                        }}
                      >
                        <EditModal id={worker.id} />
                        <Button
                          color="error"
                          onClick={handleDelete.bind(null, worker.id)}
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
