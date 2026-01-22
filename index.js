const loadPlantImage = ()=>{
    fetch("https://openapi.programming-hero.com/api/plants")
    .then(res=>res.json())
    .then((json)=> displayPlantsImage(json.plants));

}


const loadPlantCategory = ()=>{
    fetch("https://openapi.programming-hero.com/api/categories")
    .then(res=>res.json())
    .then((data)=> displayPlantCategory(data.categories));

}


const displayPlantCategory=(plantCategory)=>{
// console.log(plantCategory);

const categoryCards = document.getElementById("plant-category");
categoryCards.innerHTML="";

for(let categorys of  plantCategory){
console.log(categorys);
const categoryDiv = document.createElement("div");
categoryDiv.innerHTML=`

 <div> <button class="btn btn-wide w-full mt-3 text-green-900 justify-start">
     ${categorys.category_name}
    </button></div>
`;
categoryCards.append(categoryDiv);
}

};

const displayPlantsImage=(plants)=>{
// console.log(plants);
// 1. get the container & empty
const plantCards = document.getElementById("plant-container");
plantCards.innerHTML="";

// 2.get into every container
for( let plant of plants){
// 3. create Ele
// console.log(plant);
const plantDiv = document.createElement("div");
plantDiv.innerHTML=`

  <div class="w-full h-auto border-2 border-red-800 p-3 mx-auto my-auto bg-[#ffffff] rounded-2xl ">
    <img class="rounded-xl  border-2 border-blue-700 w-[300px] h-[180px] " src="${plant.image}" alt="">
    <h2 class="text-lg font-semibold">${plant.name}</h2>
    <p>${plant.description}</p>
    <div class="flex justify-between items-center ">
      <button class="btn btn-soft btn-accent bg-[#dcfce7] rounded-full text-green-900">${plant.category}</button>
      <div class="font-semibold"> <span>৳</span> ${plant.price}</div>
      
    </div>

    <div class="text-center">
      <button class="btn btn-wide w-full mt-3   rounded-full bg-[#15803d] text-white">Add-To-Cart</button>
    </div>

  </div>

`;
plantCards.append(plantDiv);
// 4. append into container
}

};
loadPlantImage();






loadPlantCategory();