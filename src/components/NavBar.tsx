import { useCookies } from "react-cookie"
import { logoutUser } from "../actions/auth"
import { Message } from "../types/types"

function NavBar() {
    const [cookies, , removeCookies] = useCookies(['access', 'refresh'])

    const handleLogout = () => {
        if (logoutUser(cookies.access)) {
            removeCookies('access')
            removeCookies('refresh')
        }
        // updateMessages(prev => [...prev, { 'message': 'An error occurred while signing you out, try again', type: "danger" }])

    }
    return (
        <nav>NavBar
            <div>
                <button onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    )
}

export default NavBar