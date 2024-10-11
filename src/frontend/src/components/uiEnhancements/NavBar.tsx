import { useCookies } from "react-cookie"
import { logoutUser } from "../../actions/auth"
import { Message } from "../../types/types";
import { idGenerator } from "../../constants/utils";
import DatelliLogo from "../../assets/Daatelli.svg";
import { routesMap } from "../../constants";


function NavBar({ onMessagesUpdate }: {
    onMessagesUpdate: React.Dispatch<{
        type: "ADD" | "DELETE" | "DELETE_ALL";
        message?: Message;
        id?: string;
    }>,
}) {
    const [cookies, , removeCookies] = useCookies(['access', 'refresh'])

    const handleLogout = async () => {
        const response = await logoutUser(cookies.access);
        if (response.status === 200) {
            removeCookies("access")
            removeCookies("refresh")
            return;
        }
        onMessagesUpdate({ type: 'ADD', message: { id: idGenerator, message: 'An error occurred while signing you out. Try again later.', type: 'warning' } })
    }


    return (
        <nav className="inter-body navbar my-5 rounded-lg shadow-md w-[95%] mx-auto">
            <a href={routesMap.home}>
                <img src={DatelliLogo} alt="Datelli Logo" width={150} className="object-contain max-w-full" />
            </a>
            <ul className="gap-3 font-semibold">
                <li><a href="#">Projects</a></li>
                <li><a href="#">Insights<span className="indicator-icon"></span></a></li>
            </ul>
            <div className="w-3/5 mx-6">
                <input type="text" name="search" placeholder="Search for top researchers, communities, topics and latest trends..." className="w-full input input-bordered" />
            </div>
            <div className="flex justify-end gap-3">
                <div className="avatar cursor-pointer">
                    <div className="w-10 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" alt="User Profile Picture" className="object-contain max-w-full" />
                    </div>
                </div>
                <button className="btn btn-ghost hover:bg-transparent hover:opacity-90" onClick={handleLogout}>Sign out</button>
            </div>
        </nav>
    )
}

export default NavBar