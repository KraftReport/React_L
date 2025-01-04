import { Todo } from "../model"

interface Props{
    todo : Todo,
    todos : Todo[]
    setTodos : React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoItem : React.FC<Props> = ({todo,todos,setTodos}) =>{

    const handleDone = ( id : number) => {
        setTodos(
            todos.map((todo)=>
                todo.id === id ? {...todo,isDone : !todo.isDone} : todo
            )
        )
    }

    return(
        <>
        <div className="todoitem" key={todo.id} >
            
                <li >{todo.todo}</li>
          

            <div>
                <button onClick={()=>handleDone(todo.id)}>{todo.isDone ?"Undo" : "Mark Done"}</button>
            </div>
        </div>
        </>
    )

}

export default TodoItem