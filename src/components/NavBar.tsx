import { useCookies } from "react-cookie"
import { logoutUser } from "../actions/auth"
import { Message } from "../types/types";


function NavBar({ onMessagesUpdate }: {
    onMessagesUpdate: React.Dispatch<{
        type: "ADD" | "DELETE" | "DELETE_ALL";
        message?: Message;
        id?: string;
    }>,
}) {
    const [cookies, , removeCookies] = useCookies(['access', 'refresh'])

    const handleLogout = () => {
        if (logoutUser(cookies.access)) {
            removeCookies('access')
            removeCookies('refresh')
            return;
        }
        onMessagesUpdate({ type: 'ADD', message: { id: Math.random().toString(), message: 'An error occurred while signing you out. Try again later.', type: 'danger' } })
    }


    return (
        <nav className="flex justify-between px-4">
            <a href="/">Air Data</a>
            <ul className="flex space-x-5">
                <li><a href="#">About</a></li>
                <li><a href="#">(AI icon)DataInsights</a></li>
            </ul>
            <div className="w-3/5 flex">
                <input type="text" name="search" placeholder="Search for top researchers, communities, topics and latest trends..." className="w-full" />
                <button>Search</button>
            </div>
            <div>
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    )
}

export default NavBar