import { useTodoList } from "../hooks/useTodo";
import React from 'react';
import { Spinner, Alert } from 'reactstrap';
import _ from 'lodash';
import TodoItem from './todoItem';
import AddTodoItemDialogButton from './addTodoItemDialogButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';


const Todo = () => {
    const { data, isLoading, isError } = useTodoList();

    if (isLoading) {
        return <Spinner color="primary" />
    }

    if (isError) {
        return <Alert color="danger">Fetching To Do list failed!</Alert>
    }

    const renderList = () => {
        const listItems = data.map(item => <TodoItem item={item}/>);

        if (!_.isEmpty(listItems)) {
            return (
                <>
                    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                        {listItems}
                    </List>
                </>

            )
        }
        else {
            return <h3>There is no task!</h3>;
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: '50%',
                    padding: '5px',
                    margin: 'auto',
                    marginTop: '100px',
                    height: '100%',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
            >
                {renderList()}
            </Box>
            <AddTodoItemDialogButton/>
        </>
    )


}

export default Todo;