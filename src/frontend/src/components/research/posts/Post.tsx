import { useState } from "react";
import { formatDate, truncateText } from "../../../constants/utils";
import { ResearchPost } from "../../../types/types";
import FindingItem from "./FindingItem";
import UserPostTag from "./UserPostTag";
import { useAlertsStore } from "../../../store/alerts";

function Post({ post }: { post: ResearchPost }) {
    const [showAllFindings, setShowAllFindings] = useState(false);
    const [analysisRunning, setAnalysisRunning] = useState(false);
    const [analysisSuccess, setAnalysisSuccess] = useState(false);
    const [toggleHighlights, setToggleHighlights] = useState(false);

    const { busy, notifyAlert } = useAlertsStore()

    const toggleShowAllFindings = () => {
        if (showAllFindings) {
            setShowAllFindings(false);
        } else {
            setShowAllFindings(true);
        }
    }
    const handleFindingsAnalysis = (findingsId: string) => {
        console.log("Running analysis...")
        if (busy) return
        setAnalysisRunning(true)
        notifyAlert({
            id: "analysis",
            sender: "DT",
            message: "Running analysis...",
            created_at: new Date().toISOString()
        })
        // Mock analysis and success
        setTimeout(() => {
            setAnalysisRunning(false)
            setAnalysisSuccess(true)
        }, 5000)
    }

    return (
        <div className="min-h-32 border-t border-gray-300 px-3 py-6 cursor-pointer" onClick={(e) => {
            if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('abstract')) {
                window.location.href = `/research/${post.id}`;
            }
        }}>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <a className="flex items-center gap-x-2" href={`/profile/${post.owner}`}>
                        <img className="w-8 h-8 rounded-full cursor-pointer" src={`https://ui-avatars.com/api/?name=${post.owner}`} alt={post.owner} />
                        <p className="flex flex-col">
                            <p className="text-sm font-semibold inline-flex items-center gap-x-0.5">{post.owner}<UserPostTag tag={post.tag} /></p>
                            <span className="text-sm text-gray-500">{formatDate(post.created_at)}</span>
                        </p>
                    </a>
                </div>
                {post.radar && (
                    <div className="flex items-center gap-x-1">
                        <button className="btn btn-sm btn-outline">Follow</button>
                        <span className="text-sm text-gray-500">{post.radar.description}</span>
                    </div>
                )}
            </div>
            <p className="abstract text-base text-body">
                {truncateText(post.abstract, 275)}
            </p>
            {post.findings && (
                <div className="my-3">
                    {/* Analysis component */}
                    {analysisRunning ? (
                        <button className="my-2 text-sm gap-x-0.5 flex items-center justify-end w-full hover:opacity-90 engage">
                            <span className="loading loading-spinner loading-sm text-primary"></span>
                            <span className="text-primary">Running analysis...</span>
                        </button>
                    ) : analysisSuccess ? (
                        <p className="text-sm text-primary text-right my-1">
                            Analysis complete. Redirecting to analysis...
                        </p>
                    ) : (
                        <button className="my-2 text-sm flex items-center justify-end w-full hover:opacity-90 engage" onClick={() => handleFindingsAnalysis(post.id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="#222" className="size-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                            </svg>
                            <span>Run analysis</span>
                        </button>
                    )}
                    {/* Findings */}
                    {showAllFindings ? (
                        post.findings.map((finding: any) => (
                            <FindingItem finding={finding} highlight={toggleHighlights} setHighlight={setToggleHighlights} />
                        ))
                    ) : (
                        post.findings.slice(0, 4).map((finding: any) => (
                            <FindingItem finding={finding} highlight={toggleHighlights} setHighlight={setToggleHighlights} />
                        ))
                    )}
                    {post.findings.length > 4 && (
                        <p className="text-sm text-primary text-right my-1 cursor-pointer hover:opacity-90" onClick={toggleShowAllFindings}>
                            {showAllFindings ? 'Show less' : `+ ${post.findings.length - 4} more`}
                        </p>
                    )}
                </div>
            )}
            <div className="flex items-center justify-between">
                <div>
                    <a className="hover:opacity-90 text-sm text-primary" href={`/research/${post.id}`}>View Full Finding</a>
                </div>
                <div className="flex items-center gap-x-3 text-sm">
                    <a href="#" className="inline-flex gap-x-1 items-center engage">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
                        </svg>
                        {post.likes}</a>
                    <a href="#" className="engage">{post.comments} comments</a>
                    <a href="#" className="engage">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Post;