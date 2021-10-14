import { useDeleteNewItem, useUpdateItem } from "../../hooks/useTodo";
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import ListItemButton from '@mui/material/ListItemButton';
import TodoItemDialog from './todoItemDialog';
import { green, orange, lightBlue, pink } from '@mui/material/colors';
import Chip from '@mui/material/Chip';
import DoneIcon from '@mui/icons-material/Done';

const dateFormat = require('dateformat');

const TodoItem = ({ item }) => {
    const deleteMutation = useDeleteNewItem();
    const updateMutation = useUpdateItem();
    const [openItemDialog, setOpenItemDialog] = React.useState(false);

    const typeColor = () => {
        switch (item.type){
            case 'work' : return lightBlue;
            case 'food' : return orange;
            case 'read' : return green;
            case 'game' : return pink;
            default : return lightBlue;
        }
    }

    const renderItemSubject = () => {
        return (
            <>
                <h5>{item.subject} {item.completed ? <Chip label="Completed" color="primary" size="small" onDelete={() => {}} deleteIcon={<DoneIcon />} /> : '' }</h5>
            </>
        )
    }
    const renderItemDescriptionAndDate = () => {
        let createAt = dateFormat(new Date(item.createdAt), "dd/mm/yyyy HH:MM:ss");
        return (
            <>
                <span>{item.description}</span><br />
                <span>{createAt}</span>
            </>
        )
    }

    const renderItemType = () => {
        switch (item.type) {
            case 'work': return <WorkOutlineOutlinedIcon/>;
            case 'food': return <FastfoodOutlinedIcon/>;
            case 'read': return <ImportContactsOutlinedIcon/>;
            case 'game': return <SportsEsportsOutlinedIcon/>;
            default: return <WorkOutlineOutlinedIcon/>;
        }
    }

    function onComplete(e) {
        e.stopPropagation();
        updateMutation.mutate({ ...item, completed: true });
    }

    function onDelete(e) {
        e.stopPropagation();
        deleteMutation.mutate({ ...item, completed: true });
    }

    return (
        <>
            <ListItem>
                <ListItemButton onClick={()=> setOpenItemDialog(true)}>
                    <ListItemAvatar>
                        <Avatar sx={{ bgcolor: typeColor()[500] , width: 45, height: 45}}>
                            {renderItemType()}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={renderItemSubject()} secondary={renderItemDescriptionAndDate()} />
                    {!item.completed ?
                        <Button variant="outlined" size="small" color="success" onClick={onComplete}>
                            Complete
                        </Button>
                        : ''}
                    <IconButton color="error" aria-label="remove item" onClick={onDelete}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemButton>
            </ListItem>
            <TodoItemDialog
                open={openItemDialog}
                handleClose={() => setOpenItemDialog(false)}
                action="update"
                initModel={item}
            />

        </>
    )
}

export default TodoItem;