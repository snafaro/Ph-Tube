const getCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}
const displayCategories = (categories) =>{
    categories.forEach(element => {
        const buttonContainer = document.getElementById('categoryContainer');
        const button = document.createElement('button');
        button.innerText = element.category;
        button.classList = "btn bg-[red] text-[white]";
        buttonContainer.append(button);
    });
}
getCategory();
