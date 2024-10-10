import DatelliLogo from "../../assets/Daatelli.svg"

function Footer() {
    const currentYear = new Date().getFullYear()
    return (
        <footer className="border-t border-gray-200 px-8 py-5 flex items-center justify-between">
            <div>
                <img src={DatelliLogo} alt="Daatelli Logo" width={300} className="mx-auto" />
                <p className="ml-10">© {currentYear} Daatelli. All rights reserved.</p>
            </div>
            <div className="space-y-5">
                <h3 className="inter-body text-3xl">Quick Links</h3>
                <ul className="flex flex-wrap gap-5 font-semibold">
                    <li><a href="/about-daatelli">About Daatelli</a></li>
                    <li><a href="/developers">Developers</a></li>
                    <li><a href="/roadmap">What's new? ✨</a></li>
                    <li><a href="/privacy-policy">Privacy Policy</a></li>
                    <li><a href="/support">Support</a></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;