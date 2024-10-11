import { useEffect, useReducer, useState, lazy, Suspense } from "react";
import MessagesBanner from "../../components/uiEnhancements/MessagesBanner"
import NavBar from "../../components/uiEnhancements/NavBar"
import { bannerMessages, bannerMessagesReducer } from "../../reducers";
import SideBar from "../../components/feed/SideBar";
import AddResearchButton from "../../components/research/AddResearchButton";
import ResearchPosts from "../../components/posts/ResearchPosts";
import { User } from "../../types/types";
import { getUserProfile } from "../../actions/user";
import { useCookies } from "react-cookie";
import { UserContext } from "../../contexts";
import { RegisterType } from "../../types/enums";
import ScreenUpdateDisplay from "../../components/uiEnhancements/ScreenUpdateDisplay";
import { idGenerator } from "../../constants/utils";
import LoadingComponent from "../../components/loading/LoadingComponent";
import HealthCheck from "../../components/healthCheck";

const UserProfileUpdates = lazy(() => import("../../components/feed/UserProfileUpdates"));


function Feed() {
    const [messages, dispatch] = useReducer(bannerMessagesReducer, bannerMessages);
    const [cookies] = useCookies(['access'])
    const [user, setUser] = useState<User | null>()
    const [clickMode, setClickMode] = useState<RegisterType | null>(null); // Controls the options on screen when 'share a finding' button is clicked
    const [displayMode, setDisplayMode] = useState(false)

    useEffect(() => {
        const getUserData = async () => {
            try {
                const user = await getUserProfile(cookies.access);
                setUser(user);
            } catch (err) {
                dispatch({ type: "ADD", message: { id: idGenerator, message: (err as Error).message, type: "warning" } })
            }
        }

        getUserData();

    }, [])

    const handleScreenState = () => {
        if (!user) return;
        setClickMode(user?.role)
        setDisplayMode(true);
    }

    return (
        <UserContext.Provider value={user!}>
            <MessagesBanner messages={messages} onUpdate={dispatch} />
            <NavBar onMessagesUpdate={dispatch} />
            <div className="flex px-4 py-2 inter-body md:mt-8">
                <SideBar />
                <main className="flex justify-between w-full">
                    <ResearchPosts />
                    <div className="min-w-56">
                        <AddResearchButton onSetScreenState={handleScreenState} />
                        <Suspense fallback={<LoadingComponent />}>
                            <UserProfileUpdates />
                        </Suspense>
                    </div>
                </main>
                {displayMode && <ScreenUpdateDisplay mode={clickMode} toggleDisplay={setDisplayMode} />}
                <HealthCheck />
            </div>
        </UserContext.Provider>
    )

}

export default Feed