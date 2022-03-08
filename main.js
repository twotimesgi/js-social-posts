const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

let likedPosts = [];
const container = document.getElementById("container");
let btns;
renderPosts();

function renderPosts(){
    let content = "";
    for (let i = 0; i < posts.length; i++) {
        let liked;
        likedPosts.includes(posts[i].id) ? liked = "like-button--liked" : liked = "";
        content += `
                <div class="post">
                <div class="post__header">
                <div class="post-meta">                    
                <div class="post-meta__icon">`;

        if(posts[i].author.image == null){
            let firstLetter = posts[i].author.name.split(" ")[0][0];
            let secondLetter = posts[i].author.name.split(" ")[1][0];
            content+= `<div class="profile-pic-default"><span>${firstLetter+secondLetter}</span></div>`
        }else{ 
            content += `<img class="profile-pic" src="${posts[i].author.image}" alt="${posts[i].author.name}">`;
        }

        content += `
                    </div>
                    <div class="post-meta__data">
                    <div class="post-meta__author">${posts[i].author.name}</div>
                    <div class="post-meta__time">${posts[i].created}</div>
                    </div>                    
                    </div>
                    </div>
                    <div class="post__text">${posts[i].content}</div>
                    <div class="post__image">
                    <img src="${posts[i].media}" alt="">
                    </div>
                    <div class="post__footer">
                    <div class="likes js-likes">
                    <div class="likes__cta">
                    <a class="like-button `;

        if(likedPosts.includes(posts[i].id))  content += "like-button--liked";  
   
        content += ` js-like-button" href="#${posts[i].id}" data-id="${posts[i].id}">
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                    </a>
                    </div>
                    <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">${posts[i].likes}</b> persone
                    </div>
                    </div>
                    </div>
                    </div>`;
    }
    container.innerHTML = content;
    btns = container.querySelectorAll(".like-button");
    for(let i = 0; i < btns.length; i++){
        btns[i].addEventListener("click", addLike);
    }
}

function addLike(){
    let found = false;
    let j = 0;
    while(j < posts.length && !found){
        console.log(this.dataset.id == posts[j].id);
        if(this.dataset.id == posts[j].id){
            if(!likedPosts.includes(posts[j].id)){
                posts[j].likes++;
                likedPosts.push(posts[j].id);
            }else{
                posts[j].likes--;
                likedPosts.splice(likedPosts.indexOf(posts[j].id),1);
            }
            renderPosts();
            found = true;
        }
        j++;
    }
}

