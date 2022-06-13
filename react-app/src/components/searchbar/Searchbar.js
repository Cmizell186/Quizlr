import React, {useState} from "react";
import { useDispatch } from "react-redux";
import {search_quizzes} from "../../store/quizzes";

const SearchBar = () =>{
    const [searchWord, setSearchWord] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const searchingWords = {
            searched:searchWord,
        }

        await dispatch(search_quizzes(searchingWords))
        setSearchWord("")
    }


    return(
        <>
            <form onSubmit={e => handleSubmit(e)}>
                <input
                   type='text'
                   name='searched'
                   placeholder="Search For Quizzes!"
                   value={searchWord}
                   onChange={e => setSearchWord(e.target.value)}
                />
            </form>
        </>
    )
}

export default SearchBar;
