class Post {

    static all = []

    constructor(id, title, content, likes, comments){
        this.id = id
        this.title = title
        this.content = content
        this.likes = likes
        this.comments = [...comments]
    }


    save(){
        Post.all.push(this)
    }


    static fetchPosts(){
        fetch("http://localhost:3000/posts")
        .then(resp => resp.json())
        .then(json => {
            Post.renderPosts(json)
        })
    }

    static createPost(e){
        e.preventDefault();
        let title = e.target.children[0].value
        let content = e.target.children[1].value


        let params = {
           post: {
                title: title, 
                content: content 
           }
        }

        // debugger
        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch("http://localhost:3000/posts", configObj)
        .then(resp => resp.json())
        .then(json => {
            e.target.children[0].value = ""
            e.target.children[1].value = ""
            Post.renderPosts(json)
        })
    }

    static createComment(e){
        e.preventDefault();

        let params = {
           comment: {
               content: e.target.children[0].value,
               post_id: this.id
           }
        }
        let configObj = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }
        // debugger
        fetch(`http://localhost:3000/posts/${this.id}/comments`, configObj)
        .then(resp => resp.json())
        .then(comments => Post.updateComments(comments))
    }

    static renderPosts(postsInfo){
        clearContainer(postsContainer())
        Post.all = []
        postsInfo.forEach(post => {
            let new_post = new Post(post.id, post.title, post.content, post.likes, post.comments)
            new_post.save();
            let div = document.createElement("div")
            let h4 = document.createElement("h4")
            let p = document.createElement('p')
            let likeButton = document.createElement('button')
            let ul = document.createElement('ul')
            let pLikes = document.createElement('p')
            let deleteButton = document.createElement('button')
            
            let postComments = Comment.renderComments(post.comments)
            let form = document.createElement("form")
            let input = document.createElement("input")
            let submitComment = document.createElement("button")
            
            div.id = `div ${post.id}`
            div.style.padding = "20px"
            div.className = 'card'
            h4.innerText = post.title
            h4.id = `title for ${post.id}`
            p.innerText = post.content
            p.id = `content for ${post.id}`
            pLikes.innerText = post.likes
            pLikes.id = `number of likes for ${post.id}`
            ul.id = `comments for ${post.id}`
            likeButton.innerText = "♥"
            likeButton.addEventListener('click', Post.likePost.bind(post))
            deleteButton.innerText = "x"
            deleteButton.addEventListener("click", Post.deletePost.bind(post))
            input.type = "text"
            input.placeholder = "Type comment here.."
            submitComment.type = "submit"
            submitComment.innerText = "Submit"
            form.addEventListener("submit", Post.createComment.bind(post))
            form.appendChild(input)
            form.appendChild(submitComment)
            
            div.appendChild(h4)
            div.appendChild(p)
            div.appendChild(pLikes)
            div.appendChild(likeButton)
            div.appendChild(deleteButton)
            // debugger
            postComments.forEach(li => ul.appendChild(li))
            div.appendChild(ul)
            div.appendChild(form)

            postsContainer().appendChild(div)
        })
        // debugger
    }

    static deletePost(e){
        let configObj = {
            method: "DELETE",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            }
        }
        fetch(`http://localhost:3000/posts/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(json => Post.renderPosts(json))
    }

    static likePost(e){
        this.likes += 1
        let params = {
            post: {
                likes: this.likes
            }
        }

        let configObj = {
            method: "PATCH",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body: JSON.stringify(params)
        }

        fetch(`http://localhost:3000/posts/${this.id}`, configObj)
        .then(resp => resp.json())
        .then(post => Post.updatePost(post))
    }

    static updatePost = (post) => {
        let title = document.getElementById(`title for ${post.id}`)
        let content = document.getElementById(`content for ${post.id}`)
        let likes = document.getElementById(`number of likes for ${post.id}`)
        let comments = () => document.getElementById(`comments for ${post.id}`)
        title.textContent = post.title
        content.textContent = post.content
        likes.textContent = post.likes
        let postComments = Comment.renderComments(post.comments)
        clearContainer(comments())
        postComments.forEach(li => comments().appendChild(li))
    }

    static updateComments = (comm) => {
        let comments = () => document.getElementById(`comments for ${comm[0].post_id}`)
        let postComments = Comment.renderComments(comm)
        clearContainer(comments())
        postComments.forEach(li => comments().appendChild(li))
    }


}