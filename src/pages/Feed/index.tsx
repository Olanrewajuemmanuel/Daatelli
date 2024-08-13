import { useContext, useReducer } from "react";
import MessagesBanner from "../../components/MessagesBanner"
import NavBar from "../../components/NavBar"
import { bannerMessages, bannerMessagesReducer } from "../../reducers";
import SideBar from "../../components/SideBar";
import AddResearchButton from "../../components/AddResearchButton";
import UserProfileUpdates from "../../components/UserProfileUpdates";
import ResearchPosts from "../../components/posts/ResearchPosts";


function Feed() {
    const [messages, dispatch] = useReducer(bannerMessagesReducer, bannerMessages);
    return (
        <div>
            <MessagesBanner messages={messages} onUpdate={dispatch} />
            <NavBar onMessagesUpdate={dispatch} />
            <div className="flex px-4 py-2">
                <SideBar />
                <main className="flex justify-between w-full">
                    <ResearchPosts />
                    <div className="min-w-56">
                        <AddResearchButton />
                        <UserProfileUpdates />
                    </div>
                </main>

            </div>
        </div>
    )

}

export default Feed