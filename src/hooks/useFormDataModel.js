import React from "react";

const reducer = (state, action) => {
    return {...state, ...action.payload};
}

export const useFormDataModel = (initialState) => {
    const [model, modelDispatcher] = React.useReducer(reducer, initialState);

    const updateModelProperty = (key, value) => {
        modelDispatcher({payload: {[key]: value}})
    }

    const onChangeInputField = (e) => {
        let { name, value } = e.target;
        console.log(`${name} changed to ${value}`);
        updateModelProperty(name, value);
    }

    return [model, onChangeInputField, updateModelProperty];
}
