import  './style.css'

const  FavoriteItem=({title,image,id,removeFavorites})=>{
    // console.log(id,"img");

   
    
return(
 <div key={id} className="favorite-item" >
  <div  >
        <img src={image} alt="recipe" />
  </div>
  <p  >{title}</p>
  <button onClick={removeFavorites} >remove from favorite </button>
 </div>
)
}

export default FavoriteItem