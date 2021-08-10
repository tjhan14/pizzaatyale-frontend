/* DOM Element */

const pizzaName = document.querySelector("body > main > h1")

/* Render Functions */ 

const renderPizzaDetails = pizzaObj => {
    pizzaName.textContent = pizzaObj.name
}

/* Fatch Functions */ 

// const getOnePizza = id => {
//     fetch('http://localhost:3000/api/v1/pizzas/${id}')
//         .then(r => r.json())
//         .then(console.log)
// }

const getOnePizza = async (id) => {
    const url = `http://localhost:3000/api/v1/pizzas/${id}`
    const response = await fetch(url)
    const pizzaObj = await response.json()
    renderPizzaDetails(pizzaObj)
}

/* Initialize */

getOnePizza(1)