
import { toast } from "react-toastify"
import "./style.css"
import {useState}from "react"

const Search=({getDatafromProps})=>{
  
    const [inputval,setState]=useState('')
    
    const handler=(e)=>{
        console.log(e.target.value,"sss");
        setState(e.target.value)
    }
    const handleSub=(e)=>{
        e.preventDefault()
        if(inputval=="")
        {
            toast.error("no data")
        }
        else{
            getDatafromProps(inputval)
            setState("")
        }
        
    }
    return(
       <form onSubmit={handleSub} className="search" >
  <input onChange={handler} name="search"value={inputval} placeholder="Search Recipies" id="search" />
  <button className="search button" type="submit" >search</button>
       </form>
    )
}

export default Search