import { axiosInstance } from "../axios";
import { delay } from "../utils/FakeDelay";

export async function getTodoList(username) {
    await delay(1000);
    return axiosInstance.post(process.env.REACT_APP_TODO_LIST_API, {createdBy: username});
}

export async function createNewTodoItem(item) {
    // await delay(1000);
    return axiosInstance.post(process.env.REACT_APP_TODO_CREATE_API, item);
}

export async function deleteTodoItem(id) {
    // await delay(1000);
    return axiosInstance.post(process.env.REACT_APP_TODO_REMOVE_API, {_id : id});
}

export async function updateTodoItem(item) {
    // await delay(1000);
    return axiosInstance.post(process.env.REACT_APP_TODO_UPDATE_API, item);
}