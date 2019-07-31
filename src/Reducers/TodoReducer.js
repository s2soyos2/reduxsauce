import { createReducer, createActions } from 'reduxsauce'

const initialState = {
    todoList: []
}

const addTodo = (state, { todo }) => ({
    ...state,
    todoList: [
        ...state.todoList,
        todo
    ]
})

const clearAll = (state) => ({
    ...state,
    todoList: []
})

const deleteTodo = (state, { id }) => ({
    ...state,
    todoList: state.todoList.filter((todo) => todo.id !== id)
})

const editTodo = (state, { editInfo }) => ({
    ...state,
    todoList: state.todoList.map((todo) =>
        ((todo.id === editInfo.id) ? ({ ...todo, text: editInfo.textEdit }) : todo)
    )
})

const { Types, Creators } = createActions({
    addTodo: ['todo'],
    clearAll: null,
    deleteTodo: ['id'],
    editTodo: ['editInfo']
})

const HANDLERS = {
    [Types.ADD_TODO]: addTodo,
    [Types.CLEAR_ALL]: clearAll,
    [Types.DELETE_TODO]: deleteTodo,
    [Types.EDIT_TODO]: editTodo,
}

export default {
    TodoRedux: createReducer(initialState, HANDLERS),
    Creators
}