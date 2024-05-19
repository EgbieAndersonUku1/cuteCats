import Cat from "./models.js";


const mainCatContainer      = document.querySelector(".main-cat__img-container");
const mainDescription       = document.querySelector(".main-cat__p_description");
const sideBarImageContainer = document.querySelector(".main-cat__sidebar-div");
const attributesContainer   = document.querySelector(".main-cat__description__cat-attributes");
const likeButton            = document.querySelector(".like-btn");
const resetButton           = document.querySelector(".reset-btn");
const fireWorkDisplay       = document.querySelector(".img-fireworks");
const spinner               = document.querySelector(".spinner");
const message               = document.querySelector(".message");




likeButton.addEventListener("click", handleLikeButtonClick);
resetButton.addEventListener("click", handleButtonReset);


/**
 * Builds and displays the Cat UI by creating elements for each cat not currently on display,
 * and updating the main image and sidebar with these elements.
 */
function buildCatUI() {

    const fragment  = document.createDocumentFragment();
    const catsArray = Cat.getAllCats();

    view.reset();

    catsArray.forEach(cat => {
        if (!cat.isOnDisplay) {

            const catDiv     = document.createElement("div");
            catDiv.className = "cat";
            const catImg     = createCatImage(cat);

            catDiv.appendChild(catImg);
            fragment.appendChild(catDiv);
        }
    });

    displayMainImageCatAttributes();    
    sideBarImageContainer.appendChild(fragment);
}



/**
 * Creates an image element for a given cat with specified CSS classes and event listeners.
 * 
 * @param {Object} cat - The cat object containing the cat's details.
 * @param {string} [className="sidebar_cat_img"] - The CSS class to apply to the image element.
 *      Defaults to "sidebar_cat_img".
 * @returns {HTMLImageElement} The created image element.
 */
function createCatImage(cat, className="sidebar_cat_img") {

    const img      = document.createElement("img");
    img.alt        = `Cat image ${cat.id}`;
    img.src        = `static/img/cat${cat.id}.png`;
    img.dataset.id = cat.id;

    img.classList.add(className, `cat${cat.id}`);    
    img.addEventListener("click", handleImageClick);
    return img;
}



/**
 * Event handler function for clicking on a cat image. 
 * Retrieves the clicked cat's ID from the dataset, updates the display status of the current cat, 
 * and renders the UI to reflect the change.
 * 
 * @param {Event} event - The click event object.
 */
function handleImageClick(event) {
  
    const img   = event.target;
    const catId = img.dataset.id;

    if (catId) {
     
        const currentCat       = Cat.getCurrentCatOnDisplay();
        currentCat.isOnDisplay = false;
       
        const cat              = Cat.getCatByID(catId);
        cat.isOnDisplay        = true;

        currentCat.save();
        cat.save();
    }
    view.render();
}


/**
 * Handles the reset button click event.  
 * Resets the cat data to its inital state.
 */
function handleButtonReset() {

    spinner.style.display = "block";
    const TIME_IN_MILLISECONDS = 3000;

    message.classList.add("show");
    
    resetButton.disabled    = true;
    resetButton.textContent = "Resetting...";
    resetButton.classList.add("opacity");

    setTimeout(() => {
    
        Cat.reset();
        spinner.style.display = "none";
        view.updateDisplay(false);

        resetButton.textContent = "Reset";
        resetButton.disabled = false;
        resetButton.classList.remove("opacity");

        message.classList.remove("show");

       
    }, TIME_IN_MILLISECONDS)
  
}


/**
 * Displays the main image and cat attributes in the UI.
 * 
 * @param {boolean} updateImage - If true, updates the main image. If false, only updates the attributes.
 * @throws {Error} If the current cat item to display is not found.
 */
function displayMainImageCatAttributes(updateImage=true) {

    const fragment = document.createDocumentFragment();
    const catItem  = Cat.getCurrentCatOnDisplay();
   
    // Clear the existing content in the attributes container
    attributesContainer.innerHTML = "";

    if (!catItem) {
        throw new Error("The item to display couldn't be found!!");
    }

    for (let i = 0; i < Object.keys(catItem).length; i++) {
        if (i > 0) { // skip the first propery because 0 is an id
            const pElement = createCatAttributeElement(i, catItem);
            if (pElement) {
                fragment.appendChild(pElement);
            }
        }
    }

    // Prevents the main image from rendering when a user hits the like button
    // Only the text should be updated not the images
    if (updateImage) {
        const className = "main-cat__img";
        const mainImage = createCatImage(catItem, className);
        mainCatContainer.appendChild(mainImage);
    }

    attributesContainer.appendChild(fragment);
    mainDescription.textContent = catItem.description;
}



/**
 * Creates elements representing a cat attribute, such as name, age, etc.
 * 
 * @param {number} index - The index of the attribute within the catObject.
 * @param {Object} catObject - The object containing the cat's attributes.
 * @returns {HTMLParagraphElement} The created paragraph element representing the cat attribute.
 */
function createCatAttributeElement(index, catObject) {
    
    const pElement          = document.createElement("p");
    const spanKeyElement    = document.createElement("span");
    const spanValueElement  = document.createElement("span");

    const catAttributeKey   = Object.keys(catObject)[index]; // e.g., name, home, age, gender, etc.
    const catAttributeValue = Object.values(catObject)[index]; // e.g., Mittens, UK, 2, Female, etc.
    
    const excludeList = ["description", "isOnDisplay"];

    // Check if the cat attribute should be displayed
    if (catAttributeKey && !excludeList.includes(catAttributeKey)) {
        pElement.classList.add("attribute", catAttributeKey.toLowerCase());
        spanKeyElement.classList.add("bold", "text-upper");

        spanKeyElement.textContent = `${catAttributeKey.toUpperCase()}: `;
        
        spanValueElement.className = "answer";
        spanValueElement.textContent = catAttributeValue;
        
        pElement.appendChild(spanKeyElement);
        pElement.appendChild(spanValueElement);
        
        return pElement;
    }
}


/**
 * Event handler function for clicking the like button. 
 * Updates the like status of the currently displayed cat, 
 * and updates the UI afterwards.
 * 
 * @param {Event} e - The click event object.
 */
function handleLikeButtonClick(e) {

    if (fireWorkDisplay instanceof HTMLElement) {

        fireWorkDisplay.style.display = "block";        
        const TIME_IN_MILLISECONDS    = 2000;

        // Disable the like button, add opacity class, and change text content
        likeButton.disabled    = true;
        likeButton.textContent = "Please wait...";
        likeButton.classList.add("opacity");
     

        // Retrieve the currently displayed cat and update its like status
        const cat = Cat.getCurrentCatOnDisplay();
        cat.updateLike();
        cat.save();

        // Set a timeout to revert changes after the fireworks display duration
        setTimeout(() => {

            fireWorkDisplay.style.display = "none";
            likeButton.disabled           = false;
            likeButton.textContent        = "Like";
            likeButton.classList.remove("opacity");

            // Update the UI
            view.updateDisplay(false);

        }, TIME_IN_MILLISECONDS);
    }
}





/**
 * The view object encapsulates functions related to updating and resetting the UI display.
 */
const view = {
    /**
     * Renders the Cat UI by invoking the buildCatUI function.
     */
    render: buildCatUI,

    /**
     * Updates the display by invoking the displayMainImageCatAttributes function.
     * @param {boolean} updateImage - If true, updates the main image. 
     * If false, only updates the attributes.
     */
    updateDisplay: function(updateImage) {
        displayMainImageCatAttributes(updateImage);
    },
    
    /**
     * Resets the UI by clearing the content of the mainCatContainer, 
     * sideBarImageContainer, and attributesContainer.
     */
    reset: function() {
        mainCatContainer.innerHTML      = "";
        sideBarImageContainer.innerHTML = "";
        attributesContainer.innerHTML   = "";
    }
};



document.addEventListener("DOMContentLoaded", () => {
    view.render();
})


