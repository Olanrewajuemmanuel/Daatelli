import { useReducer } from "react";
import MessagesBanner from "../../components/MessagesBanner"
import NavBar from "../../components/NavBar"
import { bannerMessages, bannerMessagesReducer } from "../../reducers";



function Feed() {
    const [messages, dispatch] = useReducer(bannerMessagesReducer, bannerMessages);
    return (

        <div>
            <MessagesBanner messages={messages} onUpdate={dispatch} />
            <NavBar />
            <main>
                <div>Sidebar
                    <aside>Ads</aside>
                </div>
                <div>Research posts</div>
                <div>
                    <button>Add a research</button>
                    <div>User profile updates</div>

                </div>
            </main>
        </div>
    )

}

export default Feed