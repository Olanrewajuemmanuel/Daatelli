import { useEffect } from "react"
import { useResearchStore } from "../../../store/research"
import Post from "./Post"

function ResearchPosts() {
    const { getPosts, researchPosts } = useResearchStore()
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <div className="w-full">
            <div className="max-w-[576px] mx-auto" data-tag="posts-container">
                {researchPosts.map(post =>
                    <Post key={post.id} post={post} />
                )}
            </div>

        </div>
    )
}

export default ResearchPosts