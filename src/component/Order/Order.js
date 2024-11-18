import React from 'react'
import Ingredient from './../BurgerBuilder/Ingredient/Ingredient';
import { Card, CardBody, CardFooter, CardHeader } from 'reactstrap';

const Order = ({ order }) => {
    console.log(order)
    let IngredientSummary = order.Ingredients.map(item => {

        return (
            <span style={{ border: 1 }} >
                <span> {item.amount} x {item.type}</span>
            </span>

        )
    });



    return (
        <Card style={{marginTop:20 , marginBottom:20}}>
         <CardHeader> <p style={{fontWeight: 600, fontSize: 18 }}>{order.id}</p></CardHeader>
      <CardBody>
      <p>{order.Customer.deliveryAddress}</p>

{IngredientSummary}
<hr></hr>
      </CardBody>
           <CardFooter>
           <p>{order.Customer.Price}bdt</p>
           </CardFooter>


        </Card>
    )
}

export default Order