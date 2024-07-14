const toggleBtn = document.querySelector(`i.toggle-btn`);
const listItems = document.querySelectorAll(`li.cursor-pointer`);
const toggled = document.querySelector(`div.toggled`);
const toggledBar = document.querySelector(`div.toggled-bar`);
const closeDetails = document.querySelector(`i.fa-x`);
const details = document.querySelector(`div.details`);
const foodList = document.querySelector(`div.food-list`);
const search = document.querySelector(`li.search`);
const categories = document.querySelector(`li.categories`);
const area = document.querySelector(`li.area`);
const ingredients = document.querySelector(`li.ingredients`);
const contact = document.querySelector(`li.contact`);




search.addEventListener(`click` , _ => {
    foodList.classList.add(`hidden`);
    document.querySelector(`.searchContainer`).classList.remove(`hidden`);
    openClose();
})

function openClose() {
    toggleBtn.classList.toggle(`fa-close`);
    toggleBtn.classList.toggle(`fa-bars`);
    toggleBtn.classList.contains(`fa-bars`) ?     toggled.style.left = `-${toggledBar.offsetWidth}px` :  toggled.style.left = `0`;
    for(let i = 0 ; i < listItems.length;i++) {
        toggleBtn.classList.contains(`fa-bars`) ?   listItems[i].style.top = `300px`   :   listItems[i].style.top = `0px`;
    }
}

toggleBtn.addEventListener(`click` , _ => {

    openClose();

})
toggled.style.left = `-${toggledBar.offsetWidth}px`;


async function getStart() {
    loading();
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data = await response.json();


    showStart(data.meals);



    loading();
}

function showStart(dataArr) {
    document.title = `Yummy`;
    let container = ``;
    for(let i = 0 ; i < dataArr?.length; i++) {
        container += `<div class="w-full md:w-1/2 lg:w-1/4 mt-6 px-3" data-id="${dataArr[i].idMeal}">
                        <div class="overflow-y-hidden group relative cursor-pointer rounded-lg">
                            <img class="w-full" src="${dataArr[i].strMealThumb}" alt="${dataArr[i].strMeal} image"/>
                            <div class="bg-white text-black opacity-75 group-hover:top-0 transition-[top] top-full duration-1000 w-full h-full absolute flex items-center">
                                <h3 class="text-3xl ms-2">${dataArr[i].strMeal}</h3>
                            </div>
                        </div>
                    </div>`;
    }
    rowData.innerHTML = container;

    for (let i = 0; i < rowData.children.length;i++) {
        rowData.children[i].addEventListener(`click`, function (e) {
            getDetails(this.getAttribute(`data-id`));
         })
    }
}
getStart();


async function getDetails (id) {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    const data = await response.json();
    
    
    showDEtails(data.meals[0]);
    loading();
}

function showDEtails(detailsApi) {
    document.title = `${detailsApi.strMeal}`;
    let i = 1;
    let ingredients = `` ;


    while(detailsApi[`strIngredient${[i]}`].length !== 0) {
        ingredients +=  `<li class="inline-block m-2 p-2 bg-blue-200 text-blue-900 rounded-lg capitalize">${detailsApi[`strMeasure${[i]}`]} ${detailsApi[`strIngredient${[i]}`]}</li>`;
        i++;
    }


    let container = `<div class="w-1/3 px-3 mt-6">
        <img src="${detailsApi.strMealThumb}" alt="" class="w-full rounded-xl detials-img"/>
        <h3 class="font-medium text-4xl capitalize">${detailsApi.strMeal}</h3>
    </div>
    <div class="w-2/3  px-3 mt-6">
        <h2 class="font-medium text-4xl capitalize mb-2">Instructions</h2>
        <p class="mb-4">${detailsApi.strInstructions}</p>
        <h3 class="mb-2 capitalize text-3xl"><span class="font-bold">area :</span> ${detailsApi.strArea}</h3>
        <h3 class="mb-2 capitalize text-3xl"><span class="font-bold">Category  :</span> ${detailsApi.strCategory}</h3>
        <h3 class="mb-2 capitalize text-3xl font-bold">Recipes :</h3>
        <ul class="mb-4 flex flex-wrap">
        ${ingredients}
        </ul>
        <h3 class="mb-2 capitalize text-3xl font-bold">tags :</h3>
        <ul class="mb-4 flex flex-wrap">
        <li class="inline-block m-2 p-2 bg-red-200 text-red-900 rounded-lg capitalize">${detailsApi.strTags = detailsApi.strTags  || `no tags`}</li>
        </ul>
        <a href="${detailsApi.strYoutube}" target="_blank" class="inline-block m-1 p-2 hover:bg-red-900 transition-colors duration-300 bg-red-600 text-red-200 capitalize rounded-lg">youtube</a>
        <a href="${detailsApi.strSource}" target="_blank" class="inline-block m-1 p-2 hover:bg-green-900 transition-colors duration-300 bg-green-600 text-green-200 capitalize rounded-lg">source</a>

        
</div>`;

    detailsContainer.innerHTML = container;

    details.classList.remove(`hidden`);
    foodList.classList.add(`hidden`);
    


}

closeDetails.addEventListener(`click`, _ => {
    document.title = `Yummy`;
    details.classList.add(`hidden`);
    foodList.classList.remove(`hidden`);
})

function loading () {
    let lodaingContainer = document.querySelector(`div.loading-container`)
    let loadingDivs = lodaingContainer.children;
    let randomload = Math.floor(Math.random() * loadingDivs.length);
    for (let i = 0 ; i < loadingDivs.length;i++) {
        if(!loadingDivs[i].classList.contains(`hidden`)) {
            loadingDivs[i].classList.add(`hidden`)
        }
    }
    document.body.classList.toggle(`overflow-y-hidden`);
    lodaingContainer.classList.toggle(`hidden`);
    lodaingContainer.classList.toggle(`flex`);
    loadingDivs[randomload].classList.toggle(`hidden`);
}

searchName.addEventListener(`input`, _ => {
    getSeachName(searchName.value);
})

async function getSeachName (theName) {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${theName}`);
    const data = await response.json();
    foodList.classList?.remove(`hidden`);
    showStart(data.meals);
    loading();
}

async function getCategories () {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    const data = await response.json();
    foodList.classList?.remove(`hidden`);
    document.querySelector(`.searchContainer`).classList.add(`hidden`);

    showCategories(data.categories);
    loading();

    for (let i = 0 ; i < rowData.children.length;i++) {
        rowData.children[i].addEventListener(`click`, function () {
            getOneCategory(this.getAttribute(`data-name`));
        })
    }

}

async function getOneCategory(selectedCategory) {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
    const data = await response.json();
    showStart(data.meals);
    loading();
}



function showCategories(categoryArr) {
    document.title = `Category`;
    let container = ``;
    for(let i = 0 ; i < categoryArr.length; i++) {
        container += `<div class="w-full md:w-1/2 lg:w-1/4 mt-6 px-3" data-name="${categoryArr[i].strCategory}">
                        <div class="overflow-y-hidden group relative cursor-pointer rounded-lg">
                            <img class="w-full" src="${categoryArr[i].strCategoryThumb}" alt="${categoryArr[i].strCategory} image"/>
                            <div class="bg-white text-black opacity-75 group-hover:top-0 flex-col transition-[top] text-center top-full duration-1000 w-full h-full absolute flex items-center justify-center">
                                <h3 class="text-3xl ms-2">${categoryArr[i].strCategory}</h3>
                                <p class="text-sm ms-2">${(categoryArr[i].strCategoryDescription).split(` `).splice(0, 20).join(` `)}</p>
                            </div>
                        </div>
                    </div>`;
    }
    rowData.innerHTML = container;
}
categories.addEventListener(`click` , _ => {
    openClose();
    getCategories();
})

area.addEventListener(`click`, _ => {
    openClose();
    getAreas();
})


async function getAreas() {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    const data = await response.json();
    foodList.classList?.remove(`hidden`);
    document.querySelector(`.searchContainer`).classList.add(`hidden`);
    showAreas(data.meals);
    loading();
    for (let i = 0 ; i < rowData.children.length;i++) {
        rowData.children[i].addEventListener(`click`, function () {
            getAreaMeals(this.getAttribute(`data-area`));
        })
    }
}
function showAreas(areasArr) {
    document.title = `Areas`;
    let container = ``;
    for(let i = 0 ; i < areasArr.length; i++) {
        container += `<div class="w-full md:w-1/2 lg:w-1/4 text-center mt-6 px-3 cursor-pointer" data-area="${areasArr[i].strArea}">       
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3 class="text-3xl ms-2">${areasArr[i].strArea}</h3>
                    </div>`;
    }
    rowData.innerHTML = container;
}

async function getAreaMeals(selectedArea) {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${selectedArea}`);
    const data = await response.json();
    showStart(data.meals);
    foodList.classList?.remove(`hidden`);
    document.querySelector(`.searchContainer`).classList.add(`hidden`);
    loading();
}
ingredients.addEventListener(`click`, _ => {
    openClose();
    getIngredients();
})


async function getIngredients() {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    const data = await response.json();
    foodList.classList?.remove(`hidden`);
    document.querySelector(`.searchContainer`).classList.add(`hidden`);
    showIngredients(data.meals);
    loading();

    for (let i = 0 ; i < rowData.children.length;i++) {
        rowData.children[i].addEventListener(`click`, function () {
            getIngredientMeals(this.getAttribute(`data-ingredient`));
        })
    }
}
function showIngredients(ingredientsArr) {
    document.title = `Ingreduents`;
    let container = ``;
    for(let i = 0 ; i <= 20; i++) {
        container += `<div class="w-full md:w-1/2 lg:w-1/4 text-center mt-6 px-3 cursor-pointer" data-ingredient="${ingredientsArr[i].strIngredient}">       
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3 class="text-3xl ms-2">${ingredientsArr[i].strIngredient}</h3>
                        <p class="text-xl ms-2">${ingredientsArr[i].strDescription.split(` `).splice(0, 20).join(` `)}</p>
                        
                    </div>`;
    }
    rowData.innerHTML = container;
}

async function getIngredientMeals(selectedIngredient) {
    loading();
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${selectedIngredient}`);
    const data = await response.json();
    showStart(data.meals);
    loading();
}


contact.addEventListener(`click`, _ => {
    openClose();
    showContact();
})

function showContact() {
    document.title = `Contact Us`;
    foodList.classList?.remove(`hidden`);
    document.querySelector(`.searchContainer`).classList.add(`hidden`);
    let validArr = [];
    container = `
                    <div class="min-h-screen flex justify-center items-center w-full px-3 mt-6">
                        <div class="container mx-auto w-3/4 text-center">
                            <div class="flex flex-wrap">
                                <div class="w-full md:w-1/2 px-3 mt-6">
                                    <input  type="text" id="nameInput" placeholder="Enter Your Name" autocomplete="off" class="w-full bg-white px-3 py-2 bg-clip-padding rounded-md block text-black outline-offset-0 shadow-md  shadow-transparent focus:shadow-blue-400 border-gray-300 border border-solid inset-0"/>
                                    <span class="hidden w-full mt-2 bg-red-200 p-4 rounded-lg text-red-700">Special characters and numbers not allowed</span>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mt-6">
                                    <input  type="email" id="mailInput" placeholder="Enter Your E-mail" autocomplete="off" class="w-full bg-white px-3 py-2 bg-clip-padding rounded-md block text-black outline-offset-0 shadow-md  shadow-transparent focus:shadow-blue-400 border-gray-300 border border-solid inset-0"/>
                                    <span class="hidden w-full mt-2 bg-red-200 p-4 rounded-lg text-red-700">Email not valid *exemple@yyy.zzz</span>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mt-6">
                                    <input  type="tel" id="phoneInput" placeholder="Enter Your Phone" autocomplete="off" class="w-full bg-white px-3 py-2 bg-clip-padding rounded-md block text-black outline-offset-0 shadow-md  shadow-transparent focus:shadow-blue-400 border-gray-300 border border-solid inset-0"/>
                                    <span class="hidden w-full mt-2 bg-red-200 p-4 rounded-lg text-red-700">Enter valid Phone Number</span>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mt-6">
                                    <input  type="number" id="nubmerInput" placeholder="Enter Your Age" autocomplete="off" class="w-full bg-white px-3 py-2 bg-clip-padding rounded-md block text-black outline-offset-0 shadow-md  shadow-transparent focus:shadow-blue-400 border-gray-300 border border-solid inset-0"/>
                                    <span class="hidden w-full mt-2 bg-red-200 p-4 rounded-lg text-red-700">Enter Your Age</span>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mt-6">
                                    <input  type="password" id="pwInput" placeholder="Enter Your password" autocomplete="off" class="w-full bg-white px-3 py-2 bg-clip-padding rounded-md block text-black outline-offset-0 shadow-md  shadow-transparent focus:shadow-blue-400 border-gray-300 border border-solid inset-0"/>
                                    <span class="hidden w-full mt-2 bg-red-200 p-4 rounded-lg text-red-700">Enter valid password *Minimum eight characters, at least one letter and one number:*</span>
                                </div>
                                <div class="w-full md:w-1/2 px-3 mt-6">
                                    <input  type="password" id="rpwInput" placeholder="Repassword" autocomplete="off" class="w-full bg-white px-3 py-2 bg-clip-padding rounded-md block text-black outline-offset-0 shadow-md  shadow-transparent focus:shadow-blue-400 border-gray-300 border border-solid inset-0"/>
                                    <span class="capitalize hidden w-full mt-2 bg-red-200 p-4 rounded-lg text-red-700">repassword is not same password</span>
                                </div>
                            </div>
                            <button disabled class="submit-btn disabled:cursor-not-allowed disabled:border-red-700 disabled:text-red-700 disabled:hover:bg-transparent rounded-lg hover:text-white hover:border-opacity-75 hover:bg-red-600 transition-all mt-3 inline-block capitalize border-red-600 border text-red-600 p-2">submit</button>
                        </div>
                    </div>`;
            rowData.innerHTML = container;
                const inputs = document.querySelectorAll(`#rowData input`);

            for(let i = 0 ; i < inputs.length;i++) {
                inputs[i].addEventListener(`focusout` , function(e) {
                    if(validation(this)) {
                        validArr.push(true);
                    }else{
                    this.nextElementSibling.classList.replace(`hidden`, `block`);
                }
                if(validArr.length == 6) {
                    document.querySelector(`button.submit-btn`).removeAttribute(`disabled`);
                }
                })
            }
            for(let i = 0 ; i < inputs.length;i++) {
                inputs[i].addEventListener(`focusin` , function(e) {
                    this.nextElementSibling.classList?.replace(`block`, `hidden`);
                })
            }
}

function validation(element) {

    const validators = {
        nameInput : /^[a-zA-z || /s]{1,}$/,
        mailInput : /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phoneInput : /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
        nubmerInput : /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/,
        pwInput : /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/,
    }

    if (element == document.getElementById("rpwInput")) {
        return document.getElementById("pwInput").value == document.getElementById("rpwInput").value;
    }
    return validators[`${element.id}`].test(element.value);
}