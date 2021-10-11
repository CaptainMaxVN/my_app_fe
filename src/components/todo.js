import { useTodoList, useCreateNewItem } from "../hooks/useTodo";
import React from 'react';
import { Spinner, Alert, Button } from 'reactstrap';
import _ from 'lodash';
import TodoItem from './todoItem';

const Todo = () => {
    const { data, isLoading, isError } = useTodoList();
    const createMutation = useCreateNewItem();

    if (isLoading) {
        return <Spinner color="primary" />
    }

    if (isError) {
        return <Alert color="danger">Fetching To Do list failed!</Alert>
    }

    const addNewItem = () => {
        createMutation.mutate();
    }

    const renderList = () => {
        const listItems = data.map((item, key) =>
            <li key={key} className="list-group-item">
                <TodoItem item={item}/>
            </li>);

        if (!_.isEmpty(listItems)) {
            return (
                <>
                    <ul className="list-group">
                        {listItems}
                    </ul>
                </>

            )
        }
        else {
            return <h3>There is no task!</h3>;
        }
    }

    return (
        <>
            <div className="mb-3">
                {renderList()}
            </div>
            <Button color="primary" onClick={addNewItem}><i className="fas fa-plus" /></Button>
        </>
    )


}

export default Todo;