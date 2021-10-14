import { useTodoList } from "../../hooks/useTodo";
import React from 'react';
import { Spinner, Alert } from 'reactstrap';
import _ from 'lodash';
import TodoItem from './todoItem';
import AddTodoItemDialogButton from './addTodoItemDialogButton';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';


const Todo = () => {
    const { data, isLoading, isError } = useTodoList();

    if (isLoading) {
        return <Spinner color="primary" />
    }

    if (isError) {
        return <Alert color="danger">Fetching To Do list failed!</Alert>
    }

    const renderList = () => {
        const listItems = data.map(item => <TodoItem item={item} />);

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
                    width: '750px',
                    padding: '5px',
                    margin: 'auto',
                    marginTop: '100px',
                    height: '100%',
                    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                }}
            >
                <CssBaseline />
                {renderList()}
                <BottomNavBar/>
            </Box>
            
        </>
    )


}

const BottomNavBar = () => {
    const [value, setValue] = React.useState(0);
    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={1}>
            <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
            >
                <BottomNavigationAction icon={<AddTodoItemDialogButton />}/>
            </BottomNavigation>
        </Paper>
    )
}

export default Todo;