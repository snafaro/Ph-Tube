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
            <figure class="h-[230px] w-full">
                <img
                class="h-full w-full object-cover"
                src=${video.thumbnail}
                alt="Thumbnail" />
            </figure>
            <div class="mt-7 flex gap-3">
                <div>
                    <img class="h-10 w-10 object-cover rounded-full" src=${video.authors[0].profile_picture} />
                </div>
                <div class="flex flex-col gap-1">
                    <h2 class="font-bold text-[18px]">${video.title}</h2>
                    <div class="flex gap-2 items-center">
                        <span>${video.authors[0].profile_name}</span>
                        <img class="w-5" src=${video.authors[0].verified ? "https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" : "" } />
                    </div>
                    <p>Views ${video.others.views}</p>
                </div>
            </div>
        `;
        videoContainer.append(card);
    })
    console.log(videos);
}

getCategory();
getVideos();
const demo = {
    "category_id": "1001",
    "video_id": "aaaa",
    "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
    "title": "Shape of You",
    "authors": [
        {
            "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
            "profile_name": "Olivia Mitchell",
            "verified": ""
        }
    ],
    "others": {
        "views": "100K",
        "posted_date": "16278"
    },
    "description": "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."
}
