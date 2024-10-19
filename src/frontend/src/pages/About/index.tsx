import { Link } from "react-router-dom"
import { useCookies } from "react-cookie"
import TrimmedFooter from "../../components/footer/trimmed"
import HomeHeader from "../../components/homeHeader"
import { routesMap } from "../../constants"
import MetaTags from "react-meta-tags";

const aboutContents = [
    { title: 'Roadmap', description: 'See what we are working on', link: routesMap.roadmap },
    { title: 'Meet the Founder', description: 'Meet the founder of Daatelli', link: routesMap.genesis },

]

function About() {
    const [cookies] = useCookies(['access'])
    return <>
        <MetaTags>
            <title>Daatelli | About</title>
        </MetaTags>
        <div className="flex flex-col min-h-screen">
            <HomeHeader cookies={cookies} />
            <main className="flex-grow p-10 flex flex-col gap-4">
                {aboutContents.map((content, index) => (
                    <Link to={content.link} key={index} className="w-full lg:w-1/2">
                        <div className={` min-h-[200px] my-3 text-white rounded-lg cursor-pointer hover:shadow-lg ${index % 2 !== 0 ? 'bg-gradient-to-r from-[#42275a] to-[#734b6d]' : 'bg-gradient-to-r from-[#3a1c71] via-[#d76d77] to-[#ffaf7b]'}`}>
                            <h2 className="p-4 font-semibold text-3xl">{content.title}</h2>
                            <p className="p-4 text-lg">{content.description}</p>
                        </div>
                    </Link>
                ))}
            </main>
            <TrimmedFooter />
        </div>
    </>
}

export default About