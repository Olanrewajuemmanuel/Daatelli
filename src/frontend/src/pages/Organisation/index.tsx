import { useCookies } from "react-cookie"
import TrimmedFooter from "../../components/footer/trimmed"
import HomeHeader from "../../components/homeHeader"
import FounderImg from "../../assets/founder.jpg"
import { Link } from "react-router-dom"
import { routesMap } from "../../constants"
import MetaTags from "react-meta-tags";

function Organisation() {
    const [cookies] = useCookies(['access'])

    return (
        <>
            <MetaTags>
                <title>Daatelli | Meet the Team</title>
            </MetaTags>
            <div className="flex flex-col min-h-screen">
                <HomeHeader cookies={cookies} />
                <main className="flex-grow p-10 bg-slate-50 max-w-[700px] mx-auto text-sm">
                    <div className="chat chat-start">
                        <div className="chat-header">User
                        </div>
                        <div className="chat-bubble">
                            <p>Hi! Can we meet you?</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>Oh hey. I am Olanrewaju Olaleru. Founder at Daatelli. I work as a software engineer and I am a passionate public health professional</p>
                        </div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-header">User
                        </div>
                        <div className="chat-bubble">
                            <p>So, how did Daatelli start?</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>Daatelli was an idea that came to me after my final year project in the university.</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>There were a lot of problems with sourcing for academic materials and findings that complemented my project.</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>There was also the primal urge 🙂 to share what I had learnt with my peers and other researchers but I couldn't just find the right platform.</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>A platform that skips all the BS and just lets me post my work 🤓</p>
                        </div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-header">User
                        </div>
                        <div className="chat-bubble">
                            <p>Send pics</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-white text-white">
                            <img src={FounderImg} alt="Daatelli" width={150} height={150} />
                        </div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-header">User
                        </div>
                        <div className="chat-bubble">
                            <p>Nice!</p>
                        </div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-header">User
                        </div>
                        <div className="chat-bubble">
                            <p>Say we will like to join the team, how do we go about it?</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>The fastest way will be to check out our <Link className="link" to={routesMap.roadmap}>roadmap</Link> and see how you can help out. Thanks!</p>
                        </div>
                    </div>
                    <div className="chat chat-start">
                        <div className="chat-header">User
                        </div>
                        <div className="chat-bubble">
                            <p>Any way we can talk directly?</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>Sure. You can reach me at <a href="mailto:olalerulanre@gmail.com" className="link">olalerulanre@gmail.com</a></p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>or text me on <a href="https://wa.me/2348051778804" className="link">WhatsApp</a></p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>I will be happy to hear from you 😉</p>
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-header">Olanrewaju
                        </div>
                        <div className="chat-bubble bg-blue-600 text-white">
                            <p>Hello?</p>
                        </div>
                    </div>
                </main>
                <TrimmedFooter />
            </div>
        </>
    )
}

export default Organisation