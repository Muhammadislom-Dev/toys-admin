import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import useActions from '../../hooks/useActions';
import { useSelector } from 'react-redux';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import { inputClear } from '../../utils';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditModal({ id }) {
    const [open, setOpen] = React.useState(false);
    const { updateTypeById, fetchTypeById, fetchCompanies } = useActions();
    const { types, typesLoading } = useSelector((state) => state.types);
    const {
        companies: { data },
    } = useSelector((state) => state.companies);

    React.useEffect(() => {
        fetchCompanies();
    }, [fetchCompanies]);

    const handleClickOpen = () => {
        setOpen(true);
        inputClear();
        fetchTypeById(id);
    };

    const handleClose = () => {
        setOpen(false);
        inputClear();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const formData = data.get('img_src')
            ? {
                  image: data.get('img_src'),
                  title_uz: data.get('title'),
                  title_ru: data.get('title_ru'),
                  title_en: data.get('title_en'),
                  description_uz: data.get('description'),
                  description_ru: data.get('description_ru'),
                  description_en: data.get('description_en'),
                  companyId: data.get('company_id'),
              }
            : {
                  title_uz: data.get('title'),
                  title_ru: data.get('title_ru'),
                  title_en: data.get('title_en'),
                  description_uz: data.get('description'),
                  description_ru: data.get('description_ru'),
                  description_en: data.get('description_en'),
                  companyId: data.get('company_id'),
              };
        updateTypeById({
            id,
            formData,
        });
        handleClose();
    };

    return (
        <div>
            <Button variant={'text'} color="primary" onClick={handleClickOpen}>
                Edit
            </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{'Edit company'}</DialogTitle>
                {types?.data && !typesLoading && (
                    <Box component={'form'} onSubmit={handleSubmit} noValidate>
                        <DialogContent>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginBottom: '10px',
                                }}
                            >
                                <div>
                                    <label htmlFor="company-image">
                                        For company image:
                                    </label>
                                    <input
                                        id="company-image"
                                        style={{
                                            fontSize: '1rem',
                                            marginBottom: '20px',
                                        }}
                                        name="img_src"
                                        type={'file'}
                                        required
                                    />
                                    <TextField
                                        sx={{ width: 230 }}
                                        label="Title"
                                        name="title"
                                        required
                                        defaultValue={types.data.title_uz}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        sx={{ width: 230 }}
                                        style={{ marginBottom: '10px' }}
                                        label="Title RU"
                                        name="title_ru"
                                        required
                                        defaultValue={types.data.title_ru}
                                    />
                                    <TextField
                                        sx={{ width: 230 }}
                                        label="Title EN"
                                        name="title_en"
                                        required
                                        defaultValue={types.data.title_en}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    marginBottom: '10px',
                                }}
                            >
                                <div>
                                    <TextField
                                        sx={{
                                            width: 230,
                                            marginBottom: '10px',
                                        }}
                                        label="Description"
                                        name="description"
                                        multiline
                                        maxRows={4}
                                        required
                                        defaultValue={types.data.description_uz}
                                    />
                                    <TextField
                                        sx={{ width: 230 }}
                                        label="Description RU"
                                        name="description_ru"
                                        multiline
                                        maxRows={4}
                                        required
                                        defaultValue={types.data.description_ru}
                                    />
                                </div>
                                <div>
                                    <TextField
                                        sx={{ width: 230 }}
                                        label="Description EN"
                                        name="description_en"
                                        multiline
                                        maxRows={4}
                                        required
                                        defaultValue={types.data.description_en}
                                    />
                                    <select
                                        placeholder="Company"
                                        className="form-select"
                                        required
                                        name="company_id"
                                        defaultValue={''}
                                    >
                                        <option value="" disabled>
                                            Select Company
                                        </option>
                                        s
                                        {data?.map((option) => (
                                            <option
                                                key={option.id}
                                                value={option.id}
                                            >
                                                {option.title_uz}
                                            </option>
                                        ))}
                                    </select>
                                </div>
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
