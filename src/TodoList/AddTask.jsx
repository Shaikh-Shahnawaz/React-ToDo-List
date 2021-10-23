import React, { useEffect, useState } from 'react'
import ShowTask from './ShowTask'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import UpdateIcon from '@mui/icons-material/Update';
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


    const [searchData, setSearchData] = useState(""); // storing serch input data

    const [state, setState] = useState([])  // storing local storage data
    
    const [task, setTask] = useState({
        id: "",
        task: "",
        date: ""
    })


    // getting the task input value

    function handleChange(event) {

        setTask({
            ...task, [event.target.name]: event.target.value
        })

        // console.log(  "value",event.target.value)
        // console.log( "name",[event.target.name])

    }
    // console.log( task)


    // This function for adding the data to state and also in localstorage

    function addData() {
 
        task.date = new Date().toLocaleString() // for date
        task.id = new Date().getTime().toString() // for id

        debugger;
        state.push(task)
        setState([...state,task])

        localStorage.setItem('data', JSON.stringify(state))
    }

    // This is  searching function

    function handleSearch(event) {
        setSearchData(event.target.value)
    }


    //  this funtion is for closing the card or removing the object from array (local storage)

    function closeCard(index) {

        state.splice(index, 1)
        setState([
            ...state
        ])
        localStorage.setItem('data', JSON.stringify(state))
    }

    //  This function for removing the all data from local storage

    function removeAll() {

        state.splice(0, state.length)
        setState([...state])
        localStorage.setItem('data', JSON.stringify(state))

    }




    // -------------------------------------------- Edit--------------------------------------------


    const [toggleIcon, settoggleIcon] = useState(true)  // this is for hide and show the update input
    const [storeTask, setStoreTask] = useState({}) // this is for storing the task and id from show task to update input
    const [storeUpdate, setStoreUpdate] = useState() // storing the update value from update input

    // console.log("=>>>>>>>>>", storeTask)


    function handleUpdate(event) {
        setStoreUpdate(event.target.value)
    }

    function updateData() {

        
        console.log('task',task)
        console.log('state',state)

        state.map((ele)=>{
            if(ele.id === storeTask.id){
                return ele.task = storeUpdate
                // return { ...ele,   task:storeUpdate}
            }
            return ele
        })

        setState(...state)
        localStorage.setItem('data', JSON.stringify(state))
      
        settoggleIcon(true)

    }


    // for toggle
    function toggleIconFunc() {
        settoggleIcon(true)
    }

   
   




    return (
        <>
            <div className="container mt-4">
                <div className="row  bg-info rounded text-center  p-2">

                    <button onClick={removeAll} className="col-lg-3 col-md-2 col-sm-4 btn btn-sm btn-light" > Remove All</button>

                    <h3 className=" col-lg-6 col-md-8 col-sm-4 " >TO-DO LIST</h3>

                    <span className="col-lg-3  col-md-2 col-sm-4" >
                        <input name="task" onChange={handleSearch} type="text" className="form-control" placeholder=" 🔎 Search here " />
                    </span>

                </div>



                {/* for Add */}   {/* For update */}

                {
                    toggleIcon ? <div class="addtask-div form-group mt-5 d-flex col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 text-center">

                        {/* value={storeTask.task} */}
                        <input name="task" onChange={handleChange} type="text" class="form-control me-2 " placeholder=" Add new task" />
                        <i title="Add Task" onClick={addData} style={{ 'cursor': 'pointer' }} className={classes.AddCircleIcon}>   < AddCircleIcon /> </i>
                    </div> : <div class="addtask-div form-group mt-5 d-flex col-lg-4 offset-lg-4 col-md-6 offset-md-3 col-sm-8 offset-sm-2 text-center">

                        <input name="task" onChange={handleUpdate} type="text" class="form-control me-2 "  placeholder={storeTask.task} />
                        <i onClick={updateData} title="Update Task" style={{ 'cursor': 'pointer' }} className={classes.AddCircleIcon}>   < UpdateIcon /> </i>
                    </div>
                }






            </div>
            {/* ===================Child Div import showTask div=================== */}
            <div>
                <ShowTask  settoggleIcon={settoggleIcon} setStoreTask={setStoreTask} removeAll={removeAll} storeUpdate={storeUpdate} searchData={searchData} addData={addData} state={state} task={task} setTask={setTask} closeCard={closeCard} />
            </div>

        </>
    )
}

export default AddTask
