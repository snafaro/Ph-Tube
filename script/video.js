// category fetch and display
const getCategory = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));
}
const displayCategories = (categories) =>{
    const buttonContainer = document.getElementById('categoryContainer');
    categories.forEach(element => {
        const button = document.createElement('button');
        button.innerText = element.category;
        button.classList = "btn bg-[red] text-[white]";
        buttonContainer.append(button);
    });
}

// video fetch and display
const getVideos = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/videos")
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
}
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("videoContainer");
    videos.forEach((video)=>{
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure>
                <img
                src=${video.thumbnail}
                alt="Thumbnail" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">${video.title}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
        videoContainer.append(card);
    })
    console.log(videos);
}

getCategory();
getVideos();

// const details = {category_id: '1001', video_id: 'aaaa', thumbnail: 'https://i.ibb.co/L1b6xSq/shape.jpg', title: 'Shape of You', authors: Array(1), …}
