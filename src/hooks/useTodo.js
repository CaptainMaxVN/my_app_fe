import { useMutation, useQuery, useQueryClient } from 'react-query';
import {getTodoList, createNewTodoItem, deleteTodoItem, updateTodoItem} from '../service/todo.service';
import React from 'react';
import { UserContext } from '../context/UserContext';

export function useTodoList() {
    const { user } = React.useContext(UserContext);
    const { data, isLoading, isError } = useQuery('todo-list', ()=> getTodoList(user.username));
    return { data: data?.data, isLoading, isError };
}

export function useCreateNewItem(){
    const { user } = React.useContext(UserContext);
    return useChangeTodoList(item=> {
        item.createdBy = user.username;
        console.log('add new item: ' + JSON.stringify(item));
        createNewTodoItem(item)
    });
}

export function useDeleteNewItem(){
    return useChangeTodoList(id => {
        console.log('delete item: ' + id);
        deleteTodoItem(id);
    });
}

export function useUpdateItem(){
    return useChangeTodoList(item => {
        console.log('update item: ' + JSON.stringify(item));
        updateTodoItem(item);
    });
}


function useChangeTodoList(action) {
    const client = useQueryClient();
    return useMutation(action,{
        onSuccess: () => {
          client.invalidateQueries('todo-list');
        }
      });
}