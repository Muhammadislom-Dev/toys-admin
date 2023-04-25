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

export default function CompanyTable() {
  const [data, setData] = React.useState([]);
  const { companies, companiesLoading, singleCompanyLoading } = useSelector(
    (state) => state.companies
  );

  const { fetchCompanies, deleteCompanyById } = useActions();

  React.useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies, singleCompanyLoading]);

  React.useEffect(() => {
    if (Array.isArray(companies?.data)) setData(companies.data);
  }, [companies, companiesLoading]);

  const handleDelete = (id) => {
    deleteCompanyById(id);
  };

  return (
    <>
      {singleCompanyLoading ? (
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
                    <i>Title RU</i>
                  </b>
                </TableCell>
                <TableCell align="right">
                  <b>
                    <i>Description</i>
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
                    <TableCell>{company.name_ru}</TableCell>
                    <TableCell align="right">{company.text_uz}</TableCell>
                    <TableCell align="right">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}>
                        <EditModal id={company.id} />
                        <Button
                          color="error"
                          onClick={handleDelete.bind(null, company.id)}>
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
