

interface Props {
    todo : string;
    setTodo : React.Dispatch<React.SetStateAction<string>>;
    handleAdd : ()=>void
}

const InputField : React.FC<Props> = ({todo,setTodo,handleAdd}) => {
    


    return (

        <form className="input" onSubmit={handleAdd}>

            <input type="input" value={todo} onChange={(e)=>setTodo(e.target.value)} placeholder="enter a task" className="input_box"/>
            
            <button className="input_button" type="submit"  >Go</button>
        
        </form>

    )

}

export default InputField