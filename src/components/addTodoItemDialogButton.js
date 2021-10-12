import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import AddIcon from '@mui/icons-material/Add';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useFormDataModel } from '../hooks/useFormDataModel';
import { useCreateNewItem } from "../hooks/useTodo";
import Alert from '@mui/material/Alert';
import Fab from '@mui/material/Fab';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';

export default function AddTodoItemDialogButton() {
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        console.log('closing dialog');
        setOpen(false);
    };
    return (
        <>
            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon />
            </Fab>
            <TodoItemDialog
                open={open}
                handleClose={handleClose}
            />
        </>
    )
}

const TodoItemDialog = ({ open, handleClose }) => {
    const [model, onChangeInputField] = useFormDataModel({
        subject: '',
        description: ''
    });

    const [alert, setAlert] = React.useState();

    const createMutation = useCreateNewItem();

    const [itemType, setItemType] = React.useState({
        work: [true, <WorkOutlineOutlinedIcon/>],
        read: [false, <ImportContactsOutlinedIcon/>],
        food: [false, <FastfoodOutlinedIcon/>],
        game: [false, <SportsEsportsOutlinedIcon/>]
    });

    const onChangeInput = (e) => {
        onChangeInputField(e);
        setAlert('');
    }

    const addItem = () => {
        if (validateInput()) {
            createMutation.mutate(model);
            clearState();
            handleClose();
        }
    }

    const clearState = () => {
        setAlert(null);
    }

    const validateInput = () => {
        if (!model.subject) {
            setAlert('Subject is required!');
            return false;
        }
        return true;
    }

    const renderItemType = () => {
        let types = Object.keys(itemType).map(type => <FormControlLabel value={type} control={<Radio checked={itemType[type][0]} />} label={itemType[type][1]} margin="dense"/>)
        return (
            <FormControl component="fieldset" margin="dense">
                <FormLabel component="legend">Type</FormLabel>
                <RadioGroup row aria-label="type" name="row-radio-buttons-group">
                    {types}
                </RadioGroup>
            </FormControl>
        )
    }

    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>Add New To Do Item</DialogTitle>
            <DialogContent>
                {alert ? <Alert severity="error">{alert}</Alert> : ''}
                <TextField id="outlined-basic" label="Subject" name="subject" value={model.subject} onChange={onChangeInput} variant="standard" margin="dense" fullWidth />
                <TextField id="outlined-basic" label="Desciption" name="description" value={model.description} onChange={onChangeInput} variant="standard" margin="dense" fullWidth />
                {renderItemType()}
            </DialogContent>
            <DialogActions>
                <Button onClick={addItem}>ADD</Button>
                <Button onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    )
}