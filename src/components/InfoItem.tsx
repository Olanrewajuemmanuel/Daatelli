import { useState } from "react"

function InfoItem({ message, linkOptions }: { message: string, linkOptions?: { text: string; link: string; } }) {
    const [visible, setVisible] = useState(false)
    return (
        <>
            {!visible ? (<button tabIndex={0} onClick={() => setVisible(!visible)}>learn more</button>) : (
                <div className="absolute z-10 bg-white md:border-l border-l-slate-600 p-3 text-slate-600 w-full md:max-w-sm top-0 right-0 h-[100vh]">
                    <button className="text-4xl block" onClick={() => setVisible(false)}>&times;</button>
                    {message}
                    {linkOptions && <div>
                        {linkOptions?.text}
                        <a href={linkOptions?.link}> here.</a>
                    </div>}

                </div>)}

        </>

    )
}

export default InfoItem