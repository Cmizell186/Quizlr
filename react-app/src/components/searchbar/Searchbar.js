import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { search_quizzes } from "../../store/searchQuizzes";



const SearchBar = () =>{
    const [searchWord, setSearchWord] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
    const searchedQuizzes = useSelector(state => Object.values(state.searchedFor))
    console.log(searchedQuizzes)

    const handleSubmit = async(e) =>{
        e.preventDefault();

        const searchingWords = {
            searched:searchWord,
        }

        await dispatch(search_quizzes(searchingWords))
        setSearchWord("")
        history.push("/search", [searchedQuizzes])
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
