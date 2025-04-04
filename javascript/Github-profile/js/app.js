const APIURL="https://api.github.com/users/";
const main=document.querySelector("#main");
const getUser = async (username) => {
    const response = await fetch(APIURL + username);
    const data = await response.json();
    const searchbox=document.querySelector("#search");
    const card = `
    <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                    
                </div>
            </div>
        </div>
        `
    main.innerHTML = card;
    getRepos(username);
}
// init call
getUser("taylorotwell")

const getRepos = async (username) => {
    const repos=document.querySelector("#repos");
    const response = await fetch(APIURL + username + "/repos");
    const data = await response.json();
    data.forEach((item) => {
            const elem = document.createElement("a")
            elem.classList.add("repo");
            elem.href = item.html_url;
            elem.innerText = item.name;
            elem.target  = "_blank";
            repos.appendChild(elem);
        }
    )
}

const formsubmit = () =>{
    if(searchbox.value !== ""){
        getUser(searchbox.value);
        searchbox.value = "";
    }
    return false;
}

searchbox.addEventListener(
    "focusout",
    function(){
        formsubmit();
    }
)

/*<a class="repo" href="#" target="_blank">Repo 1</a>
<a class="repo" href="#" target="_blank">Repo 2</a>
<a class="repo" href="#" target="_blank">Repo 3</a>*/ 