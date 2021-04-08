import React, {Component} from "react";
import '../../../generalFiles/general.css'
import PostFeed from '../Post/PostFeed'

let MyPosts = React.memo(props => {
    return (
        <div>
            {props.homePage.posts.map(post => <PostFeed author={post.author} key={post.id} photo={post.photo} post={post.post}/>)}>
        </div>
    )

})

export default MyPosts;