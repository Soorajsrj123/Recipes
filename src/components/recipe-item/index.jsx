import  './style.css'

const  Recipe=({title,image,id,addtoFavorite})=>{
    // console.log(id,"img");
    const addtofav=(id)=>
    {
              addtoFavorite(id)
    }
return(
 <div key={id} className="recipe-item" >
  <div  >
        <img src={image} alt="recipe" />
  </div>
  <p  >{title}</p>
  <button onClick={addtofav} >add to favorite </button>
 </div>
)
}

export default Recipe