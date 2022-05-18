import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { get_all_subjects } from '../../store/subjects';
import { Link } from 'react-router-dom';

const SubjectList = () =>{
    const dispatch = useDispatch();
    const subjects = useSelector(state => Object.values(state.subjects));

    useEffect(() =>{
        dispatch(get_all_subjects())
    }, [dispatch] )

    return (
        <>
            <div className='subject-list'>
                <h2>Subjects</h2>
                {subjects?.map((subject) =>(
                    <div key={subject?.id}>
                        <Link to={`/subject/${subject.id}`}>{subject?.subject}</Link>
                    </div>
                ))}

            </div>
        </>
    )
}

export default SubjectList;
