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
    pizzaObj.user_pizzas.forEach(user_pizza => {
        renderOneUserPizza(user_pizza, ratingCommentDiv)
    })
    
    const reviewDiv = document.createElement("div")
    reviewDiv.className = "review-form"

    const formTag = document.createElement("form")
    formTag.id = "rating-comment-form"

    const labelTag = document.createElement("label")
    labelTag.htmlFor = "rating"
    labelTag.textContent = "Rating: "
    
    const inputTag = document.createElement("input")
    inputTag.type = "number"
    inputTag.name = "rating"
    inputTag.min = "1"
    inputTag.max = "5"

    const commentLabel = document.createElement("label")
    commentLabel.htmlFor = "comment"
    commentLabel.textContent = "Comment: "

    const commentInput = document.createElement("input")
    commentInput.type = "textarea"
    commentInput.name = "comment"
    commentInput.maxlength = "300"

    const submitInput = document.createElement("input")
    submitInput.type = "submit"
    submitInput.value = "submit"

    formTag.append(labelTag, inputTag, commentLabel, commentInput, submitInput)
    formTag.addEventListener('submit', e => handleReviewSubmit(e, pizzaObj, ratingCommentDiv))
    

    reviewDiv.append(formTag)

    cardDiv.append(pizzaImg, pizzaName, pizzaDescription, pizzaPrice, ratingCommentDiv, reviewDiv)

    cardContainer.append(cardDiv)

    // const addBtn = document.createElement("review")
    // console.log(addBtn)
    // const reviewForm = document.querySelector("rating-comment-form")
}

function handleReviewSubmit(e, pizzaObj, ratingCommentDiv){
    e.preventDefault()
    console.log(e.target.children)

    const ratingInput = e.target.children[1].value
    //console.log(ratingInp)
    
    const commentInput = e.target.children[3].value
    //console.log(commentInput)

    const configObject = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'                
        }, 
        body: JSON.stringify({
            user_pizza: {
                rating: ratingInput, 
                comment: commentInput,
                pizza_id: pizzaObj.id
            }
        })
    }
    e.target.reset()

    fetch('http://localhost:3000/api/v1/user_pizzas', configObject)
    .then(r => {
        console.log(r)
        return r.json()
    })
    .then(user_pizza => {
        console.log(user_pizza)
        renderOneUserPizza(user_pizza, ratingCommentDiv)
    })
}

function renderOneUserPizza(user_pizza, ratingCommentDiv){

    const userPizzaDiv = document.createElement("div")
    userPizzaDiv.className = "pizza-rating-comment"

    const pizzaRating = document.createElement("p")
    pizzaRating.className = "pizza-rating"
    pizzaRating.textContent = "Rating: " + user_pizza.rating

    const pizzaComment = document.createElement("p")
    pizzaComment.className = "pizza-comment"
    pizzaComment.textContent = "Comment: " + user_pizza.comment

    // create button + event listender 
    const deleteButton = document.createElement("button")
    deleteButton.textContent = "Delete"
    deleteButton.addEventListener('click', e => deleteRatingComment(user_pizza, userPizzaDiv))

    const editButton = document.createElement("button")
    editButton.textContent = "Edit"
    editButton.addEventListener('click', e => editRatingComment(user_pizza, userPizzaDiv))

    userPizzaDiv.append(pizzaRating, pizzaComment, deleteButton, editButton) 
    ratingCommentDiv.append(userPizzaDiv)
}

function deleteRatingComment(user_pizza, userPizzaDiv){
    const configObject = {method: 'DELETE'}
    fetch(`http://localhost:3000/api/v1/user_pizzas/${user_pizza.id}`, configObject)
    .then(r => r.json())
    .then(response => userPizzaDiv.remove())
 }

 function editRatingComment(user_pizza, userPizzaDiv){
    userPizzaDiv.innerHTML = ""
    
    const editForm = document.createElement("form")
 
    const editRatingLabel = document.createElement("label")
    editRatingLabel.htmlFor = "rating"
    editRatingLabel.textContent = "Rating: "
    
    const editRatingInput = document.createElement("input")
    editRatingInput.name = "rating"
    editRatingInput.value = user_pizza.rating
 
    const editCommentLabel = document.createElement("label")
    editCommentLabel.htmlFor = "comment"
    editCommentLabel.textContent = "Comment: "
 
    const editCommentInput = document.createElement("input")
    editCommentInput.name = "comment"
    editCommentInput.value = user_pizza.comment
 
    const editSubmit = document.createElement("input")
    editSubmit.value = "Submit Edit"
    editSubmit.type = "submit"
    
    editForm.append(editRatingLabel, editRatingInput, editCommentLabel, editCommentInput, editSubmit)
    editForm.addEventListener("submit", (e) => handleEditSubmission(e, user_pizza, userPizzaDiv))

    userPizzaDiv.append(editForm)
 }

async function handleEditSubmission(e, user_pizza, userPizzaDiv){
    console.log(e, user_pizza, userPizzaDiv)
    e.preventDefault()
    rating = e.target[0].value
    comment = e.target[1].value 
    const url = `http://localhost:3000/api/v1/user_pizzas/${user_pizza.id}`
    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({rating: rating, comment: comment})
      });
    console.log(response)
    const userPizzaObj = await response.json()
    console.log(userPizzaObj)
    e.target.remove()
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
getAllTypes()