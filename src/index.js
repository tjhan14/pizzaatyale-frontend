/* DOM Element */

const typeName = document.querySelector("#type-name")

const cardContainer = document.querySelector("#card-container")

/* Render Functions */ 

const renderPizzaDetails = pizzaObj => {
    console.log(pizzaObj)

    const cardDiv = document.createElement("div")
    cardDiv.id = "card"

    const pizzaImg = document.createElement("img")
    pizzaImg.src = pizzaObj.image_url 
    pizzaImg.alt = pizzaObj.name

    const pizzaName = document.createElement("h1")
    pizzaName.id = "pizza-name"
    pizzaName.textContent = pizzaObj.name

    const restaurantName = document.createElement("h3")
    restaurantName.id = "restaurant-name" 
    restaurantName.textContent = pizzaObj.restaurant.name

    const pizzaDescription = document.createElement("p")
    pizzaDescription.id = "pizza-description"
    pizzaDescription.textContent = pizzaObj.description

    const pizzaPrice = document.createElement("p")
    pizzaPrice.id = "pizza-price"
    pizzaPrice.textContent = "Price: $" + pizzaObj.price

    const ratingCommentDiv = document.createElement("div")
    pizzaObj.user_pizzas.forEach(userPizza => {
        const userPizzaDiv = document.createElement("div")
        userPizzaDiv.className = "pizza-rating-comment"

        const pizzaRating = document.createElement("p")
        pizzaRating.className = "pizza-rating"
        pizzaRating.textContent = "Rating: " + userPizza.rating
    
        const pizzaComment = document.createElement("p")
        pizzaComment.className = "pizza-comment"
        pizzaComment.textContent = "Comment: " + userPizza.comment

        userPizzaDiv.append(pizzaRating, pizzaComment) 
        ratingCommentDiv.append(userPizzaDiv)
    })
    // create button -> event listener -> bring a form -> append the form to ->  


    cardDiv.append(pizzaImg, pizzaName, pizzaDescription, pizzaPrice, ratingCommentDiv)

    cardContainer.append(cardDiv)

}

function handleTypeClick(type) {
    console.log(type)
    cardContainer.innerHTML = ""
    type.pizzas.forEach(getOnePizza)
}

const renderType = type => {
    const li = document.createElement("li")
    li.textContent = `${type.name}`
    li.addEventListener('click', e => handleTypeClick(type)) 
    typeName.append(li)
}



/* Fatch Functions */ 

const getOnePizza = async (pizza) => {
    const url = `http://localhost:3000/api/v1/pizzas/${pizza.id}`
    const response = await fetch(url)
    const pizzaObj = await response.json()
    console.log(pizzaObj)
    renderPizzaDetails(pizzaObj)
}

const getAllTypes = async (all) => {
    const url = `http://localhost:3000/api/v1/types`
    const response = await fetch(url)
    const allTypes = await response.json()
    // allTypes.forEach(type => renderType(type))
    let i = 0
    while(i < 5){ 
        let max = allTypes.length - 1
        let num = Math.floor(Math.random() * max)
        renderType(allTypes[num]) 
        allTypes.splice(num, 1)
        i++ 
    }
}

/* Initialize */
// getAllTypes()