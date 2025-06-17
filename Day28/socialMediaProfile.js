const followBtn = document.querySelector(".follow-btn");
const followersCount = document.querySelector(".follower");
let following = false;
let count = parseInt(followersCount.textContent);

followBtn.addEventListener("click", ()=> {
    if(following){
        count--;
        followBtn.textContent = "Follow";
    }else{
        count++;
        followBtn.textContent = "Unfollow";
    }
    followersCount.textContent = count;
    following = !following;
})

const themeToggle = document.getElementById("toggle-theme");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark')? '☀️' :'🌙' ;
})