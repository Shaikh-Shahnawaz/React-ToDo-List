import React, { useState } from 'react'
import ShowTask from './ShowTask'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import './AddTask.css';

// ---------- material ui styling ------------
const useStyles = makeStyles((theme) => ({
    AddCircleIcon: {
        '& svg': {
            fontSize: 40,
            color: 'aqua'
        }
    },
    
}));
// ---------- material ui styling end ------------

function AddTask() {

    const classes = useStyles();


    const [searchData,setSearchData] = useState(""); // storing serch input data
    
    const [state, setState] = useState([])  // storing local storage data

    const [task, setTask] = useState({

        task: "",
        date: ""
    })


    // getting the task input value

    function handleChange(event) {

        setTask({
            ...task, [event.target.name]: event.target.value
        })

        console.log(  "value",event.target.value)
        console.log( "name",[event.target.name])
        
    }
    console.log( task)


// This function for adding the data to state and also in localstorage

    function addData() {

        task.date = new Date().toLocaleString()
        state.push(task)
        setState([...state])

        localStorage.setItem('data',JSON.stringify(state))
    }

    // This is  searching function
    
    function handleSearch(event){
        setSearchData(event.target.value)
    }


//  this funtion is for closing the card or removing the object from array (local storage)

    function closeCard(index) {

        state.splice(index, 1)
        setState([
            ...state
        ])
        localStorage.setItem('data',JSON.stringify(state))
    }

    // This function is for edit

    function editCard(index){

    //    task.task.replace(task.task,'shanu')

        // console.log( state.task(index))

    }


    



    return (
        <>
            <div className="container mt-4">
                <div className="row  bg-info rounded text-center  p-2">

                    <h3 className=" col-lg-9 col-md-10 col-sm-6 " >TO-DO LIST</h3> 

                    <span className="col-lg-3  col-md-2 col-sm-6" >
                    <input name="task" onChange={handleSearch} type="text" className="form-control" placeholder=" 🔎 Search here " />
                    </span>

                </div>
                


              
                <div class="addtask-div form-group mt-5 d-flex col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 text-center">

                    <input name="task" onChange={handleChange} type="text" class="form-control me-2 " placeholder=" Add new task" />
                     <i title="Add Task" onClick={addData} style={{ 'cursor': 'pointer' }}  className={classes.AddCircleIcon}>   < AddCircleIcon  /> </i>
                   
                </div>
               

            </div>
          {/* ===================Child Div import showTask div=================== */}
            <div>
                <ShowTask editCard={editCard} searchData={searchData} addData={addData}  state={state} task={task}  closeCard={closeCard} />
            </div>

        </>
    )
}

export default AddTask
