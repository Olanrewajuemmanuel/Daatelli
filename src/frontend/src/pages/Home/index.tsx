import { useCookies } from "react-cookie";
import { TypeAnimation } from "react-type-animation";
import HomeHeader from "../../components/homeHeader";
import { redirect, useNavigate } from "react-router-dom";
import { routesMap } from "../../constants";
import Footer from "../../components/footer";
import { useEffect, useState } from "react";


function Home() {
    const [cookies] = useCookies(['access'])
    const navigate = useNavigate()
    const textGradientStyles = ['text-gradient-primary', 'text-gradient-secondary', 'text-gradient-oth']
    const [currentGradientStyle] = useState(textGradientStyles[Math.floor(Math.random() * textGradientStyles.length)])
    const dynamicHeroTexts = [
        'your findings on your latest research',
        5000,
        'your thoughts on research trends',
        3000,
        'insights on your field of study',
        3000,
        'your next ground breaking proposal',
        3000,
    ]

    const [scrollPosition, setScrollPosition] = useState(0)

    useEffect(() => {
        window.addEventListener('scroll', handleScrollToPosition)

        return () => window.removeEventListener('scroll', handleScrollToPosition)
    }, [window.scrollY])


    const handleScrollToPosition = () => {
        setScrollPosition(window.scrollY);
    }

    const currentOffset = Math.max(50 - scrollPosition * 0.1, 0)

    const elementStyle = {
        transform: `translateY(${currentOffset}px)`,
        transition: 'transform 0.5s ease-out',
    }

    return (
        <>
            <HomeHeader cookies={cookies} />
            <main>
                <section className="mt-10 lg:mt-20">
                    <div className="flex flex-col items-center h-72 max-h-72 justify-center space-y-5 px-12">
                        <h1 className="inter-heading text-3xl md:text-4xl lg:text-6xl max-w-[1100px] text-center">Quickly share <span className={currentGradientStyle}><TypeAnimation wrapper="span" speed={50} repeat={Infinity} sequence={dynamicHeroTexts} /></span></h1>
                        <button className="btn bg-primary text-white" onClick={() => navigate(routesMap.register)}>Sign up</button>
                    </div>

                    {/* Hero image/gif */}
                    <div style={elementStyle} className="h-[300px] lg:h-[500px] rounded-md p-5 w-4/5 lg:w-2/3 mx-auto backdrop-layers">
                        <img src="" alt="Hero image" />
                    </div>
                </section>
                <section className="mt-32 py-10 lg:py-16 space-y-8 lg:space-y-16 bg-gradient-to-b from-shade-bg to-white">
                    <h2 className="inter-heading text-2xl md:text-3xl lg:text-5xl text-center">Social Media {`<>`} Academia</h2>
                    <p className="text-center px-16 text-base lg:text-lg text-body"> Daatelli is designed to give you the experience of an Academic using a social media-like interface all while taking care of the things you care about such as copyright protection and document privacy.</p>
                    <div className="h-[300px] lg:h-[400px] rounded-md p-5 w-4/5 lg:w-2/3 mx-auto backdrop-layers">
                        <img src="" alt="Social Media GIF" />
                    </div>
                </section>
                <section className="mt-10 lg:mt-32 p-5">
                    <div className="block lg:flex flex-row-reverse gap-x-5">
                        <div className="w-full lg:w-1/2 space-y-5">
                            <h2 className="inter-heading text-2xl md:text-3xl lg:text-5xl">AI Insights</h2>
                            <p className="max-w-md text-base lg:text-lg text-body">Gain insights from past and trending research so you can understand what is important for your next field study.</p>
                        </div>
                        <div className="w-full lg:w-1/2 mt-5 lg:mt-0 shadow-md h-[300px] lg:h-[400px]">
                            <img src="" alt="AI Insights" />
                        </div>
                    </div>
                </section>
                <section className="min-h-[500px] mt-10 lg:mt-32 p-5 bg-gradient-to-b from-shade-bg to-white relative">
                    <div className="block lg:flex">
                        <div className="w-full lg:w-1/2 space-y-5 mt-16">
                            <h2 className="inter-heading text-2xl md:text-3xl lg:text-5xl">API <span className="badge badge-outline">Coming soon</span></h2>
                            <p className="max-w-md text-base lg:text-lg text-body">Extend the capabilities of your ML models, your applications and other functions with Daatelli's API.</p>
                        </div>
                        <div className="w-full lg:w-1/2 h-full shadow-md mt-5 lg:mt-0">
                            <div className="mockup-code max-w-[680px] h-full rounded-md text-white px-6 py-6 lg:absolute right-0 top-0 bottom-0" data-language="python" data-testid="code-editor-home">
                                <pre data-prefix="1">
                                    <code className="code-line">
                                        <span className="code-keyword">from </span>
                                        <span>daatelli.extractor </span>
                                        <span className="code-keyword">import </span>
                                        <span>JsonExtractor</span>
                                    </code>
                                </pre>
                                <pre data-prefix="2">
                                    <code className="code-line">
                                        <span className="code-keyword">from </span>
                                        <span>daatelli </span>
                                        <span className="code-keyword">import </span>
                                        <span>get_trends</span>
                                    </code>
                                </pre>
                                <pre data-prefix="3"></pre>
                                <pre data-prefix="4">
                                    <code className="code-line">
                                        <span className="code-variable">file </span>
                                        <span>= </span>
                                        <span>"my_project.pdf"</span>
                                    </code>
                                </pre>
                                <pre data-prefix="5">
                                    <code className="code-line">
                                        <span className="code-variable">extractor </span>
                                        <span>= </span>
                                        <span className="code-definition">JsonExtractor</span>
                                        <span>()</span>
                                    </code>
                                </pre>
                                <pre data-prefix="6">
                                    <code className="code-line">
                                        <span className="code-variable">trends </span>
                                        <span>= </span>
                                        <span className="code-definition">get_trends</span>
                                        <span>(reference="https://arxiv.org/abs/2402.09635")</span>
                                    </code>
                                </pre>
                                <pre data-prefix="7">
                                    <code className="code-line">
                                        <span className="code-variable">data </span>
                                        <span>= </span>
                                        <span className="code-definition">extractor</span>
                                        <span>.</span>
                                        <span className="code-method">extract_data</span>
                                        <span>(file, trends)</span>
                                    </code>
                                </pre>
                                <pre data-prefix="8">
                                    <code className="code-line">
                                        <span className="code-keyword">print</span>
                                        <span>(data)</span>
                                    </code>
                                </pre>
                                <br />
                                <pre data-prefix=">>>">
                                    <code className="code-line p-1 bg-slate-600 hover:bg-slate-700 rounded-sm">
                                        {
                                            `Trend: { title: 'AI', keywords: ['AI', 'Computer Vision', 'Deep Learning'], coverage: 0.9 }`
                                        }
                                    </code>
                                </pre>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="mt-10 lg:mt-32 py-10 lg:py-16 space-y-5">
                    <h2 className="inter-heading text-2xl md:text-3xl lg:text-5xl text-center text-gradient-primary">Join the community</h2>
                    <p className="text-center px-16 text-base lg:text-lg text-body">Daatelli is a community of researchers, academic authors, students and many more individuals who are passionate about sharing knowledge and research insights with the world in quick and easy ways.</p>
                    <div className="block px-16 lg:px-0 space-y-5 lg:space-y-0 lg:flex justify-center gap-6">
                        <div className="card w-full lg:w-96 shadow-md cursor-pointer" onClick={() => window.location.href = "https://github.com/Olanrewajuemmanuel/Daatelli"}>
                            <div className="card-body">
                                <span className="w-24 card-actions">
                                    {/* Github icon */}
                                    <svg width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 98 96"><path fillRule="evenodd" clipRule="evenodd" d="M48.854 0C21.839 0 0 22 0 49.217c0 21.756 13.993 40.172 33.405 46.69 2.427.49 3.316-1.059 3.316-2.362 0-1.141-.08-5.052-.08-9.127-13.59 2.934-16.42-5.867-16.42-5.867-2.184-5.704-5.42-7.17-5.42-7.17-4.448-3.015.324-3.015.324-3.015 4.934.326 7.523 5.052 7.523 5.052 4.367 7.496 11.404 5.378 14.235 4.074.404-3.178 1.699-5.378 3.074-6.6-10.839-1.141-22.243-5.378-22.243-24.283 0-5.378 1.94-9.778 5.014-13.2-.485-1.222-2.184-6.275.486-13.038 0 0 4.125-1.304 13.426 5.052a46.97 46.97 0 0 1 12.214-1.63c4.125 0 8.33.571 12.213 1.63 9.302-6.356 13.427-5.052 13.427-5.052 2.67 6.763.97 11.816.485 13.038 3.155 3.422 5.015 7.822 5.015 13.2 0 18.905-11.404 23.06-22.324 24.283 1.78 1.548 3.316 4.481 3.316 9.126 0 6.6-.08 11.897-.08 13.526 0 1.304.89 2.853 3.316 2.364 19.412-6.52 33.405-24.935 33.405-46.691C97.707 22 75.788 0 48.854 0z" fill="#24292f" /></svg>
                                </span>
                                <h3 className="card-title inter-heading">Github</h3>
                                <p className="text-slate-600">Star our repo, contribute code and share knowledge in the discussions.</p>
                            </div>
                        </div>
                        <div className="card w-full lg:w-96 shadow-md cursor-pointer" onClick={() => window.location.href = "https://t.me/+n7QeLDKposwzYmZk"}>
                            <div className="card-body">
                                <span className="w-24 card-actions">
                                    {/* Telegram icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="32px" height="32px"><path fill="#29b6f6" d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z" /><path fill="#fff" d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z" /><path fill="#b0bec5" d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z" /><path fill="#cfd8dc" d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z" /></svg>
                                </span>
                                <h3 className="card-title inter-heading text-gradient-primary">Telegram</h3>
                                <p className="text-slate-600">Join our community and stay updated with the latest news and releases.</p>
                            </div>

                        </div>
                    </div>
                </section>
                <Footer />
            </main >
        </>
    )
}

export default Home