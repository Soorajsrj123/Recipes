

import { useEffect, useReducer, useState } from "react";
import Search from "../../components/search"
import FavoriteItem from "../../components/favorite-item";
import './style.css'
import Recipe from "../../components/recipe-item/index";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const appid="91450d2d1fff9a2c4018d5d82ed7a1db";
const aid="5ef13d0d";

const Home=()=>{
   
     let initialState={
        filteredValue:""
     }
     let reducer=(state,action)=>{
        switch (action.type) {
            case"value":
                
              return state
        
            default:
                return state
        }
     }

    const [loadingstate,setloadingState]=useState(false)
    const[recipes,setRecipe]=useState([])
    const [favorite,setFavorite]=useState([])
    const [filteredState,dispatch]=useReducer(reducer,initialState)

    const getDatafromProps=(getdata)=>{
         console.log(getdata,"serc");
      setloadingState(true)


   async function getrecipie(){
    try{
        console.log("hey");
        const apidata= await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${getdata}&app_id=${aid}&app_key=${appid}`)
        console.log("hmm");
        const result=await apidata.json()
        let {hits}=result
        console.log(hits,"hits");
        
        if(hits&&hits.length>0)
        {
            setloadingState(false)
            setRecipe(hits)
            // hits.forEach((data)=>{
            //     console.log(data.recipe.label);
            //     setRecipe(data.recipe)
            // })
        }
  
    }catch(err){
       console.log(err,"uuu ");
    } 
   }
   getrecipie()
    }
    // console.log(loadingstate,recipes,"after");

    const addtoFavorite=(getCurrentRecipeid)=>{
            //   console.log(getCurrentRecipeid,"res id");
          let res=    recipes.map((item,index)=>{
                return {...item,index}
              })
            //   console.log(res,"heeeee");

      let product=  res.filter((pro)=>{
      
      return  pro.index==getCurrentRecipeid
      })
    //   console.log(product,"final product");
    //   -----
    let cpy=[...favorite]
    // console.log(favorite,"before fav");

    var found = false;
for(var i = 0; i < favorite.length; i++) {
    if (favorite[i].index == getCurrentRecipeid) {
        found = true;
        break;
    }
}
  
     if(!found)
     {
        toast.success('Success Notification !', {
            position: toast.POSITION.BOTTOM_CENTER
        });
        // console.log("if"); 
         cpy.push(product[0])
         setFavorite(cpy)
         localStorage.setItem('favorite',JSON.stringify(cpy))
      
     }
     else{
        toast.error('item already added!', {
            position: toast.POSITION.BOTTOM_CENTER
        });
      
        console.log(favorite,"after fav2");
        console.log(favorite);
     }

    }
    const removeFavorites=(removingid)=>{
        // let res=    recipes.map((item,index)=>{
        //     return {...item,index}
        //   })
        //   let product=  res.filter((pro)=>{
      
        //     return  pro.index==id
        //     })
console.log(removingid,"rid");
            let copyfav=[...favorite]
             copyfav=copyfav.filter((item)=>item.index!==removingid)
             console.log(copyfav,"copy fav before");
             setFavorite(copyfav)
             console.log(copyfav,"copy fav after");
             localStorage.setItem('favorite',JSON.stringify(copyfav))
    }
    
    useEffect(()=>{
        
        const exportedfavfromlocal=JSON.parse(localStorage.getItem('favorite'))
        setFavorite(exportedfavfromlocal)
        
    },[])
     console.log(filteredState,"sss fav");
    return(
        <div className="home" >
    <Search  getDatafromProps={getDatafromProps}      />
    <div className="favorites-wrapper" >
    <h1 className="favorites-title">favorites</h1>
    <div className="search-favorites" >
          <input type="text"
          
          name="searchFavorites"
          placeholder="search favorites"
          
          />
    </div>
    <div className="favorites" >
          {
            favorite&&favorite.length >0? 
            favorite.map((item)=> <FavoriteItem removeFavorites={()=>removeFavorites(item.index)}  id={item.index} image={item.recipe.image} title={item.recipe.label}   />)
            :null
          }
    </div>
    </div>
    {
        loadingstate&&<div className="loading">Loading please wait!</div>
    }
    <div className="items" >
    {
        recipes&&recipes.length>0?
        recipes.map((item,index)=><Recipe id={index} addtoFavorite={()=>addtoFavorite(index)} image={item.recipe.image} title={item.recipe.label} />)
        :null
    }
    </div>
   
    <ToastContainer/>
        </div>
    )
}

export default Home