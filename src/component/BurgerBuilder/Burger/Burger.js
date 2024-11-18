import Ingredient from "../Ingredient/Ingredient"

const Burger = props => {
   let ingredients = props.ingredients.map(item =>{
    if(item.amount > 0){
     let amountArr = [...Array(item.amount).keys()];

     return amountArr.map(_ =>{
      return <Ingredient type={item.type} key={Math.random()}/>
     })
    }
     
   })
   .reduce((arr , element)=>{
     return arr.concat(element)
   } , []);

  return (
    <div style={{marginTop:50}}>
        <Ingredient type="breadTop"/>
        {ingredients}
        <Ingredient type="breadBottom"/>
    </div>
  )
}

export default Burger