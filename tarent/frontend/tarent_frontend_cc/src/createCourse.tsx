import React, {useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import axios from 'axios';

interface classForm {
    id: string;
    courseName: string;
    startTime:  string;
    endTime: string;
    date: string;

    [key: string]: string 
}

const CreateCourseWidget = () => {
    
    const [newCourseName ,setNewCourseName] =  useState<string>('')
    const [newStartTime, setNewStartTime] = useState<string>('')
    const [newEndTime,setNewEndTime] = useState<string>('')
    const [newDate, setNewDate] = useState<string>('')
    const [id, setId] = useState<string>('')
    const [arrayOfIds, setArrayOfIds ] = useState<classForm[]>([])
    const [dataSent, setDataSent ] = useState<boolean>(false)
    const [createCourseEnable, setCreateCourseEnable ] = useState<boolean>(false)
    const [modifyCourseEnable, setModifyCourseEnable ] = useState<boolean>(true)

    

    useEffect( () => {
        axios.get(`http://127.0.0.1:8000/test/sendIds/`).then(res => { 
              return res.data.data
            }
        ).then(
        setArrayOfIds
        ).catch( function (error){
            console.log("There is a problem ", error)
        })
        setDataSent(false)
    },[dataSent])

    const updateId = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const thisEvent = event.target
        setId(thisEvent.value)
    }

    const updateCorseName = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        const thisEvent = event.target
        setNewCourseName(thisEvent.value)
    }

    const updateStartTime = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewStartTime(event.target.value)
    }

    const updateEndTime = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewEndTime(event.target.value)
    }

    const updateDate = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        setNewDate(event.target.value)
    }

    const handleCreateCourse = (event: MouseEvent) => {
        event.preventDefault()
            const newId = (Math.random()+1).toString(36).substring(7)
        const newForm: classForm = {
            id: newId ,
            courseName: newCourseName,
            startTime: newStartTime,
            endTime: newEndTime,
            date: newDate,
        };

        axios.post(`http://127.0.0.1:8000/test/`, { 
            data: newForm 
        }).then(res => {
            setDataSent(!dataSent)
            if(res.status === 201 ){
                setNewCourseName("")
                setNewStartTime("")
                setNewEndTime("")
                setNewDate("")
          }
        }).catch( function (error){
            console.log("There is an error: ", error )
        })
    }

    const handleModifyCourse = (event: MouseEvent) => {
        event.preventDefault()
        const newForm: classForm = {
            id:id ,
            courseName: newCourseName,
            startTime: newStartTime,
            endTime: newEndTime,
            date: newDate,
        };

        axios.put(`http://127.0.0.1:8000/test/modifyCourse/`, { 
            data: newForm 
        }).then(res => {
          setDataSent(!dataSent)
          if(res.status === 201 ){
            setNewCourseName("")
            setNewStartTime("")
            setNewEndTime("")
            setNewDate("")
          }
        }).catch( function (error ){
            console.log("There is an error", error )
        })
    }

    const handleLoadData = (event: MouseEvent<HTMLElement >) => {
        const result  = event.target as HTMLElement
        const attr = result.getAttribute("value")
        const dataToLoad = arrayOfIds.filter(item => item.courseId === attr)
        const classData = dataToLoad[0]
        setId(classData.courseId)
        setNewCourseName(classData.courseName)
        setNewStartTime(classData.startTime)
        setNewEndTime(classData.endTime)
        setNewDate(classData.date)
        setCreateCourseEnable(true)
        setModifyCourseEnable(false)
    }

    const handleRemoveData = () => {
        setId("")
        setNewCourseName("")
        setNewStartTime("")
        setNewEndTime("")
        setNewDate("")
        setCreateCourseEnable(false)
        setModifyCourseEnable(true)
    }

    return (   
        <div>
            <p> Erstellen oder ändern ein neue Kurs: </p>
            <form>
                <div>
                    ID  |  Kurs Name  |  Kurs Startzeit  |  Kurs EndZeit  |  Kurs Datum 
                </div>
                 <div>
                    {arrayOfIds?.map(item => {
                        return (<div key={item.courseId}> 
                                <button type="button" value={item.courseId} onClick={handleLoadData}>{item.courseId} </button> &nbsp;
                                {item.courseName} &nbsp;
                                {item.startTime} &nbsp;
                                {item.endTime} &nbsp;
                                {item.date}
                            </div>)
                    })} 
                     <button type="button"  onClick={handleRemoveData}> Reset </button> &nbsp;          
                 </div>
                 <br/>
                 <label>
                    Id zu ändern: &nbsp;&nbsp;&nbsp; 
                    <input type="text" disabled name="id" value={id} onChange={updateId} />
                </label>
                <br/>
                <label>
                    Kurs Name: &nbsp;&nbsp;&nbsp; 
                    <input type="text" name="courseName" value={newCourseName} onChange={updateCorseName} />
                </label>
                <br/>
                <label>
                    Kurs Startzeit: &nbsp;&nbsp;&nbsp; 
                    <input type="text" name="startTime" value={newStartTime} onChange={updateStartTime} />
                </label>
                <br/>
                <label>
                    Kurs Endzeit: &nbsp;&nbsp;&nbsp; 
                    <input type="text" name="endTime" value={newEndTime} onChange={updateEndTime}/>
                </label>
                <br/>
                <label>
                    Kurs Datum: &nbsp;&nbsp;&nbsp; 
                    <input type="text" name="date" value={newDate}  onChange={updateDate} />
                </label>
                <br/>
            <input type="submit" disabled={createCourseEnable} value="create new course" onClick={handleCreateCourse} />
            <input type="submit" disabled={modifyCourseEnable} value="modify course" onClick={handleModifyCourse} />
            </form>
        </div>
    )
};


export default CreateCourseWidget