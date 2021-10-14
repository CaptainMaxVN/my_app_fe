import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import TodoItemDialog from './todoItemDialog';

export default function AddTodoItemDialogButton() {
    const [open, setOpen] = React.useState(false);
    return (
        <>
            <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
                <AddIcon />
            </Fab>
            <TodoItemDialog
                open={open}
                handleClose={() => setOpen(false)}
                action="add"
                initModel={{}}
            />
        </>
    )
}