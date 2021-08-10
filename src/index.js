/* DOM Element */

const pizzaName = document.querySelector("#pizza-name")
const pizzaRestaurant = document.querySelector("#restaurant-name")
const pizzaDescription = document.querySelector("#pizza-description")
const pizzaPrice = document.querySelector("#pizza-price")
const pizzaImg = document.querySelector("img")

const typeName = document.querySelector("#type-name")

/* Render Functions */ 

const renderPizzaDetails = pizzaObj => {
    pizzaImg.src = pizzaObj.image_url
    pizzaName.textContent = pizzaObj.name
    pizzaRestaurant.textContent = pizzaObj.restaurant.name
    pizzaDescription.textContent = pizzaObj.description
    pizzaPrice.textContent = pizzaObj.price
}

const renderType = allTypes => {
    const li = document.createElement("li")
    li.textContent = `${allTypes.name}`
    typeName.append(li)
}

/* Fatch Functions */ 

const getOnePizza = async (id) => {
    const url = `http://localhost:3000/api/v1/pizzas/${id}`
    const response = await fetch(url)
    const pizzaObj = await response.json()
    renderPizzaDetails(pizzaObj)
}

const getAllTypes = async (all) => {
    const url = `http://localhost:3000/api/v1/types`
    const response = await fetch(url)
    const typeAllObj = await response.json()
    const allTypes = await resp.json()
    allTypes.forEach(type => renderType(type))
}

/* Initialize */
getAllTypes()
getOnePizza(31)