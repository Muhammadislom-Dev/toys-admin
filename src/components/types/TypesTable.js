import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, TableHead } from '@mui/material';
import { useSelector } from 'react-redux';
import CreateModal from './CreateModal';
import useActions from '../../hooks/useActions';
import Loader from '../layout/loader';
import EditModal from './EditModal';
import { IMAGE_URL } from '../../utils';

export default function TypesTable() {
    const [data, setData] = React.useState([]);
    const { types, typesLoading, singleTypeLoading } = useSelector(
        (state) => state.types
    );

    const { fetchTypes, deleteTypeById } = useActions();

    React.useEffect(() => {
        fetchTypes();
    }, [fetchTypes, singleTypeLoading]);

    React.useEffect(() => {
        if (Array.isArray(types?.data)) setData(types.data);
    }, [types, typesLoading]);

    const handleDelete = (id) => {
        deleteTypeById(id);
    };

    return (
        <>
            {singleTypeLoading ? (
                <Loader />
            ) : (
                <TableContainer component={Paper} variant="outlined">
                    <Table
                        sx={{ minWidth: 500 }}
                        aria-label="custom pagination table"
                    >
                        <TableHead
                            style={{
                                backgroundColor: 'rgb(220, 220, 220)',
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
                                        <i>Title EN</i>
                                    </b>
                                </TableCell>
                                <TableCell align="right">
                                    <b>
                                        <i>Company</i>
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
                                        <TableCell width={200}>
                                            <img
                                                src={`${
                                                    IMAGE_URL + company.img_src
                                                }`}
                                                alt={`${company.title}`}
                                                height={50}
                                                style={{
                                                    objectFit: 'contain',
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {company.title_uz}
                                        </TableCell>
                                        <TableCell>
                                            {company.title_ru}
                                        </TableCell>
                                        <TableCell>
                                            {company.title_en}
                                        </TableCell>
                                        <TableCell align="right">
                                            {company.company.title_uz}
                                        </TableCell>
                                        <TableCell align="right">
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'flex-end',
                                                }}
                                            >
                                                <EditModal id={company.id} />
                                                <Button
                                                    color="error"
                                                    onClick={handleDelete.bind(
                                                        null,
                                                        company.id
                                                    )}
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
