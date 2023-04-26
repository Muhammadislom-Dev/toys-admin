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

export default function WorkersTable() {
  const [data, setData] = React.useState([]);
  const { workers, singleWorkerLoading, workersLoading } = useSelector(
    (state) => state.workers
  );

  const { deleteWorkerById, fetchWorkers } = useActions();

  React.useEffect(() => {
    fetchWorkers();
  }, [fetchWorkers, singleWorkerLoading]);

  React.useEffect(() => {
    if (Array.isArray(workers?.data)) setData(workers.data);
  }, [workers, workersLoading]);

  const handleDelete = (id) => {
    deleteWorkerById(id);
  };

  return (
    <>
      {singleWorkerLoading ? (
        <Loader />
      ) : (
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
            <TableHead
              style={{
                backgroundColor: "rgb(220, 220, 220)",
              }}>
              <TableRow>
                <TableCell>
                  <b>
                    <i>Image</i>
                  </b>
                </TableCell>
                <TableCell>
                  <b>
                    <i>full_name_uz</i>
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
                    <TableCell width={200}>
                      <img
                        src={`${IMAGE_URL + worker.src}`}
                        height={50}
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </TableCell>
                    <TableCell>{worker.title_ru}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}>
                        <EditModal id={worker.id} />
                        <Button
                          color="error"
                          onClick={handleDelete.bind(null, worker?.id)}>
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
