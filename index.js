// let titleInput = () => document.getElementById("title")
// let titleInput = () => document.getElementById("title")
let postsContainer = () =>  document.getElementById("posts-container")

const clearContainer = (element) => {
    while(element.firstChild){
        element.removeChild(element.firstChild)
    }
}

const startProgram = () => {
    let form = document.getElementById("form")
    form.addEventListener('submit', Post.createPost)
    Post.fetchPosts()

}


document.addEventListener("DOMContentLoaded", startProgram)