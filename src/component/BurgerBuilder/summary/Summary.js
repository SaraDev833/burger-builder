

const Summary = ({ ingredients }) => {

    const ingredientList = ingredients.map(item => (
        <li key={item.type}>
            <span>{item.type}</span>: {item.amount}
        </li>
    ))
    return (
        <div>
            <ul>
                {ingredientList}
            </ul>
        </div>
    )
}

export default Summary