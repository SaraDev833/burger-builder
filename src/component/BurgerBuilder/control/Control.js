import React from 'react'
import { CardBody, CardFooter, CardHeader, Card } from 'reactstrap'


const controls = [
    { label: 'meat', type: 'meat' },
    { label: 'cheese', type: 'cheese' },
    { label: 'salad', type: 'salad' }
]
const BuildControl = props => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
            <div style={{ fontSize: 20, fontWeight: 700 }}> {props.label}</div>
            <div>
                <button className='btn btn-success' style={{ marginRight: 10, marginBottom: 10 }} onClick={props.addItem}>More</button>
                <button className='btn btn-danger' style={{ marginRight: 10, marginBottom: 10 }} onClick={props.removeItem}>Less</button>

            </div>
        </div>
    )

}

const Control = (props) => {
    
    return (
        <div style={{ marginTop: 30, }}>
            <Card >
                <CardHeader>
                    <h2 style={{ fontWeight: 700 }}>Insert Ingredients</h2>
                </CardHeader>
                <CardBody >
                    {
                        controls.map(item => {
                            return <BuildControl label={item.label} addItem={() => props.addedItem(item.type)} removeItem={() => props.removeItem(item.type)} />
                        })

                    }
                </CardBody>
                <CardFooter>
                    <p style={{ fontWeight: 700 }}>Price:{props.price} BDT</p>

                </CardFooter>
                <button disabled={!props.purchaseAble} className='btn btn-secondary' style={{ fontWeight: 700 }} onClick={props.isToggole}>Order Now</button>
            </Card>
        </div>
    )
}

export default Control