import { useDeleteNewItem, useUpdateItem } from "../hooks/useTodo";
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import Button from '@mui/material/Button';
const dateFormat = require('dateformat');

const TodoItem = ({ item }) => {
    const deleteMutation = useDeleteNewItem();
    const updateMutation = useUpdateItem();
    const renderItemSubject = () => {
        return (
            <>
                <h5>{item.subject} {item.completed ? <CheckCircleRoundedIcon color="primary" /> : ''}</h5>
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
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon color="primary" />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={renderItemSubject()} secondary={renderItemDescriptionAndDate()} />
                {!item.completed ?
                    <Button variant="outlined" size="small" color="success" onClick={() => updateMutation.mutate({ ...item, completed: true })}>
                        Complete
                    </Button>
                    : ''}
                <IconButton color="error" aria-label="remove item" onClick={() => deleteMutation.mutate(item._id)}>
                    <DeleteIcon />
                </IconButton>
            </ListItem>

        </>
    )
}

export default TodoItem;