import { useDeleteNewItem, useUpdateItem } from "../hooks/useTodo";
import React from 'react';
import { Button } from 'reactstrap';

const TodoItem = ({ item }) => {
    const deleteMutation = useDeleteNewItem();
    const updateMutation = useUpdateItem();
    const [completed, setCompleted] = React.useState(item.completed);
    React.useEffect(() =>{
        setCompleted(item.completed);
    }, [item]);
    const onCheck = (checked) => {
        setCompleted(checked);
        console.log('completed: ' + completed);
        updateMutation.mutate({...item, completed: checked});
    }
    return (
        <>
            {JSON.stringify(item)}
            <Button color="primary" onClick={() => deleteMutation.mutate(item._id)}><i className="fas fa-trash" /></Button>
            <input type="checkbox" id="accept" name="accept" onChange={() => onCheck(!completed)} checked={completed} />
        </>
    )
}

export default TodoItem;