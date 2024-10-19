import { useCookies } from "react-cookie";
import HomeHeader from "../../components/homeHeader";
import BreadcrumbsNav from "../../components/uiEnhancements/BreadCrumbsNav";
import FounderImg from "../../assets/founder.jpg"
import TrimmedFooter from "../../components/footer/trimmed";
import MetaTags from "react-meta-tags";

function RoadMap() {
    const [cookies] = useCookies(['access'])
    return (
        <>
            <MetaTags>
                <title>Daatelli | What are we building?</title>
            </MetaTags>
            <div className="flex flex-col min-h-screen">
                <HomeHeader cookies={cookies} />
                <main className="inter-body flex-grow">
                    <header className="h-40 mb-5 flex items-center justify-center bg-gradient-to-r from-[#42275a] to-[#734b6d]">
                        <input type="text" placeholder="Search for more news on Daatelli..." className="input input-bordered w-[90%]" />
                    </header>
                    <div className="lg:mx-10 mx-5 lg:mx-0">
                        <BreadcrumbsNav currentPage="Roadmap" parentPage="News" />
                    </div>
                    <section className="my-5 mx-5 lg:mx-0 lg:mx-10 text-justify text-body">
                        <div>
                            <h1 className="text-xl lg:text-3xl font-semibold inter-heading">What are we building?</h1>
                            <div className="flex items-center gap-x-3 text-sm my-4 user-select-none">
                                <div className="avatar">
                                    <div className="rounded-full w-10">
                                        <img src={FounderImg} alt="Founder image" width={10} className="object-contain" />
                                    </div>
                                </div>
                                <div className="text-slate-600">
                                    <h3>By Olanrewaju</h3>
                                    <p>Last updated a day ago</p>
                                </div>
                            </div>
                        </div>
                        <div className="text-body text-base my-5 leading-relaxed" data-id="roadmap-content">
                            <p className="my-3">Here at Daatelli, we are all about giving academic authors a platform to present their work and get connected to other experts in their field as easy as it is to find a long-lost cousin on Facebook.</p>
                            <p className="my-3">We recognise two "issues" with the academia sharing space:</p>
                            <ul className="my-3">
                                <li>
                                    - Authors want to share their research after a long time of researching and have credit for their work
                                </li>
                                <li>
                                    - Researchers want to read (just the abstract and the results 😜) and build on the work of others
                                </li>
                            </ul>
                            <p className="my-3">Our mission is simple: to create a platform where both authors and researchers get the best of both worlds, without the hassle of gatekeeping, convoluted processes, or endless paywalls.</p>
                            <p className="my-3">Did I also mention that you have access to powerful ML analytics to help you gain insights from your research and that of others?</p>
                            <div>
                                <h2 className="text-xl lg:text-2xl font-semibold">The work</h2>
                                <span className="divider italic">The Foundation</span>
                                <p className="my-3">1. First things first, our early focus will be on building an intuitive and easy-to-use platform for authors to upload their work and researchers to read and engage with them.</p>
                                <p className="my-3">2. We recognise that recognition is everyting in the research space, so we are creating a system that tracks citations and rewards you with those sweet, sweet citation points.</p>
                                <p className="my-3">3. Daatelli takes copyright issues seriously, so we are building a system that ensures all works are verified and protected, and authors have full control on the visibility and distribution of their work on the platform.</p>
                                <p className="my-3">4. Browsing research should be easy. Search by keyword, author, institution, or even upload date. In fact, search for a citation of a work in a work.</p>
                                <span className="divider italic">The Community</span>
                                <p className="my-3">1. We love the intellectual camaraderie. We are building a system that supports collaborative spaces to brainstorm and build.</p>
                                <p className="my-3">2. Get connected to top researchers in your field and build meaningful relationships.</p>
                                <p className="my-3">3. You need help on your next big research proposal? Whether you are looking to connect to a circle of experts, a co-author, or a financial backer, we are creating a system where you can announce your project and ask for the support you need. Think of this as ermm...an academic crowdsourcing</p>
                                <span className="divider italic">Insights</span>
                                <p className="my-3">Understanding the past to inform the future is key to meaningful research. That's why we're creating tools that allow researchers to analyze trends in their field and extract insights from past studies. Whether you're preparing for your next field study or designing a new experiment, these tools will provide valuable data-driven recommendations—highlighting what's been done, what's trending, and where there are gaps in the research. It's like having a research assistant with a superpower for sorting through academic history, helping you refine your approach and focus on the areas most likely to yield impactful results!</p>
                                <span className="divider italic">Scaling up</span>
                                <p className="my-3">1. Real-time seamless live collaborations between researchers across borders</p>
                                <p className="my-3">2. Customising the platform to your needs by leveraging Daatelli powerful API and tools.</p>
                                <p className="my-3">3. Peer review systems</p>
                                <p className="my-3">Many startups usually have this stuff, so here...</p>
                                <p className="my-3 font-semibold">Our timeline:</p>
                                <ul className="timeline timeline-vertical lg:timeline-horizontal my-5">
                                    <li>
                                        <div className="timeline-start font-semibold">The Foundation (Q4 2024)</div>
                                        <div className="timeline-middle">
                                            <span className="timeline-bullet timeline-bullet-active"></span>
                                        </div>
                                        <hr />
                                    </li>
                                    <li>
                                        <hr />
                                        <div className="timeline-middle">
                                            <span className="timeline-bullet"></span>

                                        </div>
                                        <div className="timeline-end font-semibold">The Community (Q4 2024)</div>
                                        <hr />
                                    </li>
                                    <li>
                                        <hr />
                                        <div className="timeline-start font-semibold">Insights (Q1 2025)</div>
                                        <div className="timeline-middle">
                                            <span className="timeline-bullet"></span>

                                        </div>
                                        <hr />
                                    </li>
                                    <li>
                                        <hr />
                                        <div className="timeline-middle">
                                            <span className="timeline-bullet"></span>

                                        </div>
                                        <div className="timeline-end font-semibold">Additional Features (Q2 2025)</div>
                                        <hr />
                                    </li>
                                    <li>
                                        <hr />
                                        <div className="timeline-start font-semibold">🚀 Launch MVP (Q2 2025)</div>
                                        <div className="timeline-middle">
                                            <span className="timeline-bullet"></span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <h2 className="text-xl lg:text-2xl font-semibold">Join Us in building the future of research</h2>
                                <p className="my-3">As we continue to evolve the platform for academic researchers, we know we can't do this alone - and honestly, we don't want to. We will like you to join us.</p>
                                <p className="my-3"> Whether you're a researcher, developer, or just someone passionate about making knowledge more accessible, there are ways for you to get involved:</p>
                                <ul className="my-3">
                                    <li>
                                        <span className="font-bold">Open-Source Contributions</span> - We're building many of our tools in an open-source environment, and we need contributors with coding skills to help us perfect features, optimize functionality, and enhance user experience. If you're passionate about creating innovative solutions for the academic world, we’d love for you to bring your expertise to our OSS development team! See the <a href="https://github.com/Olanrewajuemmanuel/Daatelli" target="_blank" rel="noreferrer" className="link">GitHub</a> page for more details.
                                    </li>
                                    <li>
                                        <span className="font-bold">More Contributions</span> - All academia is welcome to contribute to the growth of the platform. Other professionals such as students, developers, marketing experts, content creators, etc are also welcome. We'd love to hear from you about your experience and suggestions for how we can improve the platform. Mail me directly at <a href="mailto:olalerulanre@gmail.com" className="link">Gmail</a>. Add the title "Daatelli" to the subject line. Many thanks!
                                    </li>
                                    <li>
                                        <span className="font-bold">Funding</span> - We are open to any form of funding to help us accelerate the development of the platform. Whether it's through sponsorship, investments, or crowdfunding, we're all ears. Mail me directly at <a href="mailto:olalerulanre@gmail.com" className="link">Gmail</a>. Add the title "Daatelli Funding" to the subject line. Many, many thanks!
                                    </li>
                                </ul>

                            </div>
                        </div>
                    </section>

                </main>
                <TrimmedFooter />
            </div>
        </>
    )
}

export default RoadMap;