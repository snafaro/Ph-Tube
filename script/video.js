const getStringTime = (time) => {
    const seconds = time;
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const years = Math.floor(days / 365);

    if (minutes < 60) {
        return `${minutes} minute ${seconds % 60} second ago`;
    } else if (hours < 24) {
        return `${hours} hour ${minutes % 60} minute ago`;
    } else if (days < 365) {
        return `${days} day ${hours % 24} hour ago`;
    } else {
        return `${years} year ${days % 365} day ago`;
    }
};

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
        button.classList = "btn bg-[red] text-[white] button";
        button.addEventListener('click',(e)=>{
            const allButton = document.querySelectorAll('.button');
            for(let btn of allButton){
                btn.classList.remove("bg-[green]");
            }
            e.target.classList.add("bg-[green]");
            categoryVideo(element.category_id);
        });
        buttonContainer.append(button);
    });
}


// category based video display
const categoryVideo = (id) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.category))
    .catch((error) => console.log(error));
}

document.getElementById('allBtn').addEventListener('click',()=>{
    getVideos();
});

// video details
const loadVideoDetails = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayVideoDetails(data.video);  
}

const displayVideoDetails = (details) =>{
    const modalContainer = document.getElementById('modalContainer');
    modalContainer.innerHTML = `
        <img src=${details.thumbnail} />
        <p>${details.description}</p>
    `
    const modalBtn = document.getElementById('modalBtn');
    modalBtn.click();
}



// video fetch and display
const getVideos = (value = '') =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${value}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error));
}
const displayVideos = (videos) =>{
    const videoContainer = document.getElementById("videoContainer");
    videoContainer.innerHTML = '';
    if(videos.length === 0){
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
            <div class="h-[500px] flex flex-col justify-center items-center">
                <img src="asset/Icon.png" />
                <h2>Oops!! sorry there is no content here</h2>
            </div>
        `;
        
        return;
    }
    else{
        videoContainer.classList.add('grid');
    }
    videos.forEach((video)=>{
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[230px] w-full relative">
                <img
                class="h-full w-full object-cover"
                src=${video.thumbnail}
                alt="Thumbnail" />
                ${video.others.posted_date ? `<span class="bg-[red] text-[white] absolute px-1 right-1 bottom-1">${getStringTime(video.others.posted_date)}</span>` : ''}
                
            </figure>
            <div class="mt-7 flex gap-3">
                <div>
                    <img class="h-10 w-10 object-cover rounded-full" src=${video.authors[0].profile_picture} />
                </div>
                <div class="flex flex-col gap-1">
                    <h2 class="font-bold text-[18px]">${video.title}</h2>
                    <div class="flex gap-2 items-center">
                        <span>${video.authors[0].profile_name}</span>
                        ${video.authors[0].verified ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" />` : ''}
                    </div>
                    <p>Views ${video.others.views}</p>
                    <div>
                        <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-sm bg-[red] text-[white]">Details</button>
                    </div>
                </div>
            </div>
        `;
        videoContainer.append(card);
    });
}

document.getElementById('search').addEventListener('keyup',(e)=>{
    // console.log();
    getVideos(e.target.value);
})

getVideos();
getCategory();

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
