import { compose, withHandlers, withState } from 'recompose'
import FormAddV from './FormAddV'
import { connect } from 'react-redux'
import TodoRedux from '../Reducers/TodoReducer'

export default compose(
  connect(
    (state) => ({
      todoList: state.todoList
    }),
    (dispatch) => ({
      onAddTodo: (todo) => dispatch(TodoRedux.Creators.addTodo(todo)),
      onClearAll: () => dispatch(TodoRedux.Creators.clearAll()),
      onDeleteTodo: (index) => dispatch(TodoRedux.Creators.deleteTodo(index)),
      onEditTodo: (editInfor) => dispatch(TodoRedux.Creators.editTodo(editInfor))
    })
  ),
  withState('text', 'setText', ''),
  withState('isEdit', 'setIsEdit', false),
  withState('textEdit', 'setTextEdit', ''),
  withState('todoEdit', 'setTodoEdit', {}),

  withHandlers({
    onChangeText: ({ setText }) => event => setText(event.target.value),

    addTodo: ({ onAddTodo, todoList, text }) => () => 
      onAddTodo({
        text: text,
        id: todoList.length + 1 + Math.random()
      }),
    clearAll: ({ onClearAll }) => () => onClearAll(),

    deleteTodo: ({ onDeleteTodo }) => index => onDeleteTodo(index),

    edit: ({ setIsEdit, setTodoEdit, isEdit, setTextEdit }) => (boolean,todoEdit) =>
      {
        setIsEdit(!isEdit)
        setTodoEdit(todoEdit)
        setTextEdit(todoEdit.text)
      },
    onChangeTextEdit: ({setTextEdit}) => event => setTextEdit(event.target.value),

    cancelEdit: ({setIsEdit}) => () => setIsEdit(false),

    saveEdit: ({onEditTodo, todoEdit, textEdit, setIsEdit}) => () => 
      {
        const editInfor = {
          id: todoEdit.id,
          textEdit
        }
        onEditTodo(editInfor)
        setIsEdit(false)
      }
  }),
  
)(FormAddV)
