import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_subjects } from '../../store/subjects';
import { Link, NavLink } from 'react-router-dom';
import "./subjects.css"


const SubjectList = () =>{
    const dispatch = useDispatch();
    const subjects = useSelector(state => Object.values(state.subjects));

    useEffect(() =>{
        dispatch(get_all_subjects())
    }, [dispatch] )


    return (
        <>
            <h2 style={{color: "#4255ff"}} className="subject-title">Subjects</h2>
            <h4 className="subject-title h4">Select a subject to get started</h4>
            <div className='subject-list'>
                {subjects?.map((subject) =>(
                    <div key={subject?.id} className="menu-item">
                        <NavLink to={`/subject/${subject.id}`} className="menu-item">{subject?.subject}</NavLink>
                    </div>
                ))}
            </div>
        </>
    )
}

export default SubjectList;
