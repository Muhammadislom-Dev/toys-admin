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

export default function StatisticsTable() {
  const [data, setData] = React.useState([]);
  const { statistics, statisticsLoading, singleStatisticsLoading } =
    useSelector((state) => state.statistics);

  const { fetchStatistics, deleteStatisticsById } = useActions();

  React.useEffect(() => {
    fetchStatistics();
  }, [fetchStatistics, singleStatisticsLoading]);

  React.useEffect(() => {
    if (Array.isArray(statistics?.data)) setData(statistics.data);
  }, [statistics, statisticsLoading]);

  const handleDelete = (id) => {
    deleteStatisticsById(id);
  };

  return (
    <>
      {singleStatisticsLoading ? (
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
                    <i>Count</i>
                  </b>
                </TableCell>
                <TableCell align="center">
                  <b>
                    <i>Count</i>
                  </b>
                </TableCell>
                <TableCell align="center">
                  <b>
                    <i>Title</i>
                  </b>
                </TableCell>
                <TableCell align="center">
                  <b>
                    <i>Title RU</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <CreateModal />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.length > 0 &&
                data.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell align="center">{company.key}</TableCell>
                    <TableCell align="center">{company.key_ru}</TableCell>
                    <TableCell align="center">{company.value}</TableCell>
                    <TableCell align="center">{company.value_ru}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end"
                        }}
                      >
                        <EditModal id={company.id} />
                        <Button
                          color="error"
                          onClick={handleDelete.bind(null, company.id)}
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
