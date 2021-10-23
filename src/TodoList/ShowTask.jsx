import React, { useEffect } from 'react'
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useState } from 'react';
function ShowTask(props) {

    const [taskDone, setTaskDone] = useState({
        line:'',
        bg:''
    }); // for adding css line-through

    const [checkLine, setCheckLine] = useState({}); 

    const [state, setState] = useState([]) // storing local storage data

    let myData = []
    let Data = localStorage.getItem('data')

    useEffect(() => {

        if (Data) {
            myData = JSON.parse(Data)
        
            const filtered = myData.filter((ele) => {
                if(ele.task.toLowerCase().includes(props.searchData.toLowerCase())){
                    return ele.task
                }
            })

            if (filtered.length > 0) {
                setState(filtered)
            }
            else{
                setState(myData)
            }


        }

    }, [props.searchData,props.addData,props.removeAll])

    function closeTask(index) {

        props.closeCard(index)

    }

    // This is done task (chekLine) function
    
    function doneTask(index) {

        taskDone.line = 'line-through'
        taskDone.bg = 'lightPink'
        setTaskDone(taskDone)
        setCheckLine({ ...checkLine, [index]: !checkLine[index] })

        // console.log('[index]',[index])
        // console.log('!chekline[index]',!checkLine[index])
    }

    // console.log('chekline',checkLine,)

    // ---------------- Function get called when we click on Edit Btn ----------------------------

    const [edit,setEdit] = useState(false)
    function editTask(id) {

        let editItem = state.find((ele)=>{
            return ele.id === id
        })

        props.setStoreTask(editItem) //this is for storing the task, Id from show task to update input

        props.settoggleIcon(false) // toggle add btn to update btn

        
    }


   

   
    return (
        <div className="container  mt-5">

            <div className="row ms-1">

                {

                    state.map((ele, index) => (


                        <div key={ele.id} class="card mb-4  mx-3" style={{ 'max-width': ' 18rem' }}>
                            <div class="card-header d-flex justify-content-between">
                                <strong> Task {index + 1}</strong>
                                {/* <strong> Task {ele.id}</strong> */}
                                <div>
                                    <span title="Edit" onClick={()=>editTask(ele.id)} style={{ 'cursor': 'pointer', 'color': '#3f00ff ' }} className=""> <ModeEditIcon />  </span>
                                    <span title="Done" onClick={() => doneTask(index)} style={{ 'cursor': 'pointer', 'color': '#32CD32	 ' }} className="ms-2"> <CheckCircleOutlineIcon />  </span>
                                    <span title="Close" onClick={() => closeTask(index)} style={{ 'cursor': 'pointer', 'color': '#ff0000' }} className="ms-2"> <HighlightOffIcon /> </span>
                                </div>
                            </div>
                            <div class="card-body" >
                                {

                                    checkLine[index] ? <h5 class="card-title"> ✔ <span style={{ 'text-decoration': taskDone.line , 'backgroundColor': taskDone.bg, 'padding': '0 15px 0 15px', 'borderRadius':'6px' }}> {ele.task} </span>  </h5> : <h5 contenteditable={edit} class="card-title">{ele.task}</h5>
                                }
                                <p class="card-text text-primary">{ele.date}</p>

                            </div>
                        </div>
 

                    ))


                }

            </div>

        </div>
    )
}

export default ShowTask
