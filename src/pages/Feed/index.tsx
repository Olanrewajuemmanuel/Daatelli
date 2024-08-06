import { useState } from "react"
import { useCookies } from "react-cookie"
import { logoutUser } from "../../actions/auth"


type Message = {
    type: 'danger' | 'warning' | 'success',
    message: string
}

function Feed() {
    const [cookies, , removeCookies] = useCookies(['access', 'refresh'])
    const [messages, setMessages] = useState<Message[]>([])
    const handleLogout = () => {
        if (logoutUser(cookies.access)) {
            removeCookies('access')
            removeCookies('refresh')
        }
        setMessages(prev => [...prev, { 'message': 'An error occurred while signing you out, try again', type: "danger" }])


    }
    return (
        <div>
            {/* Banner components here */}
            {
                messages.map(message =>
                    <p key={message.message}>{message.message}</p>
                )
            }
            Feed
            <button onClick={handleLogout}>Sign out</button>
        </div>
    )

}

export default Feed