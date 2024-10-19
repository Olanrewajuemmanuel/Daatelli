import DatelliLogo from "../../assets/Daatelli.svg"
import { routesMap } from "../../constants";

function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="border-t border-gray-200 px-8 py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-y-10 lg:gap-y-0">
            <div>
                <img src={DatelliLogo} alt="Daatelli Logo" width={300} className="lg:mx-auto w-56 -ml-8 lg:-ml-0" />
                <p className="text-body">© {currentYear} Daatelli. All rights reserved.</p>
            </div>
            <div className="space-y-5">
                <h3 className="inter-body text-2xl lg:text-3xl">Quick Links</h3>
                <ul className="flex flex-col lg:flex-row flex-wrap gap-5 font-semibold">
                    <li><a href={routesMap.about}>About Daatelli</a></li>
                    <li><a href={routesMap.developers}>Developers</a></li>
                    <li><a href={routesMap.roadmap}>What's new? ✨</a></li>
                    <li><a href={routesMap.privacyPolicy}>Privacy Policy</a></li>
                    <li><a href={routesMap.support}>Support</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;