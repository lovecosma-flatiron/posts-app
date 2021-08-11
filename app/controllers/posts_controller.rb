class PostsController < ApplicationController

    def index
        posts = Post.all
        render json: posts.to_json(:include => :comments)
    end 


    def update  
        post = Post.find(params[:id])

        if post.update(post_params)
            render json: post.to_json(:include => :comments)
        else
            render json: {error: "There was an error"}
        end 
    end


    def create 
        # binding.pry
        post = Post.new(post_params)

        if post.save
            render json: post.to_json(:include => :comments)
        else
            render json: {error: "There was an error"}
        end 
    end 


    def destroy 
        post = Post.find(params[:id])
        post.destroy
        render json: Post.all.to_json(:include => :comments)
    end 
    
    




    private

    def post_params
        params.require(:post).permit(:title, :content, :likes)
    end 

end
