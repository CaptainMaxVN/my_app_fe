import React from 'react';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { useFormDataModel } from '../../hooks/useFormDataModel';
import { useCreateNewItem, useUpdateItem } from "../../hooks/useTodo";
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import Snackbar from '@mui/material/Snackbar';

const TodoItemDialog = ({ open, handleClose, action, initModel }) => {
    const [model, onChangeInputField, updateModelProperty] = useFormDataModel(initModel);

    const [alert, setAlert] = React.useState();

    const createMutation = useCreateNewItem();
    const updateMutation = useUpdateItem();

    const initialItemType = {
        work: [false, <WorkOutlineOutlinedIcon />],
        read: [false, <ImportContactsOutlinedIcon />],
        food: [false, <FastfoodOutlinedIcon />],
        game: [false, <SportsEsportsOutlinedIcon />]
    }

    const [itemType, setItemType] = React.useState(() => {
        console.log(initModel.type + ' ' + JSON.stringify(initModel) + ' ' + action)
        if(action == 'add') {
            initialItemType.work[0] = true;
        }
        else {
            initialItemType[initModel.type][0] = true;
        }
        return initialItemType;
    });

    const [popupNoti, setPopupNoti] = React.useState(false);

    const onChangeInput = (e) => {
        onChangeInputField(e);
        setAlert('');
    }

    const onClose = () => {
        if (action === 'add') {
            Object.keys(model).map(key => updateModelProperty(key, ''));
            initialItemType.work[0] = true;
            setItemType(initialItemType);
        }
        handleClose();
    }


    const addItem = () => {
        if (validateInput()) {
            createMutation.mutate(model);
            onClose();
            setPopupNoti(true);
        }
    }

    const updateItem = () => {
        if (validateInput()) {
            updateMutation.mutate(model);
            handleClose();
            setPopupNoti(true);
        }
    }

    const validateInput = () => {
        if (!model.subject) {
            setAlert('Subject is required!');
            return false;
        }
        return true;
    }

    const updateItemType = type => {
        var newItemType = {};
        Object.keys(itemType).map(t => {
            var newValue = [...itemType[t]];
            if (t === type) {
                newValue[0] = true;
            }
            else {
                newValue[0] = false;
            }
            newItemType[t] = newValue;
        });
        console.log(newItemType);
        setItemType(newItemType);
        updateModelProperty('type', type);
    }

    const renderItemType = () => {
        let types = Object.keys(itemType).map(type => <FormControlLabel value={type} control={<Radio checked={itemType[type][0]} onClick={() => updateItemType(type)} />} label={itemType[type][1]} margin="dense" />)
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
        <>
            <Dialog onClose={onClose} open={open}>
                <DialogTitle>{action === 'add' ? 'Add New To Do Item' : 'Update To Do Item'}</DialogTitle>
                <DialogContent>
                    {alert ? <Alert severity="error">{alert}</Alert> : ''}
                    <TextField id="outlined-basic" label="Subject" name="subject" value={model.subject} onChange={onChangeInput} variant="standard" margin="dense" fullWidth />
                    <TextField id="outlined-basic" label="Desciption" name="description" value={model.description} onChange={onChangeInput} variant="standard" margin="dense" fullWidth />
                    {renderItemType()}
                </DialogContent>
                <DialogActions>
                    {action === 'add' ? <Button onClick={addItem}>ADD</Button> : <Button onClick={updateItem}>UPDATE</Button>}
                    <Button onClick={onClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={popupNoti}
                autoHideDuration={3000}
                onClose={() => setPopupNoti(false)}
            >
                <Alert onClose={() => setPopupNoti(false)} severity="success" sx={{ width: '100%' }}>
                    {action === 'add' ? 'New Todo Item just be added successfully!' : 'Todo Item just be updated successfully!'}
                </Alert>
            </Snackbar>
        </>
    )
}

export default TodoItemDialog;