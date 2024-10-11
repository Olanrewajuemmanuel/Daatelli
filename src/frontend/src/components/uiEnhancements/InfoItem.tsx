import { useState } from "react"

function InfoItem({ message, linkOptions }: { message: string, linkOptions?: { text: string; link: string; } }) {
    const [visible, setVisible] = useState(false)
    return (
        <>
            {!visible ? (<button className="text-sm mx-1 font-normal" tabIndex={0} onClick={() => setVisible(!visible)}>learn more*</button>) : (
                <div className="inter-body text-sm leading-relaxed absolute z-10 bg-white md:border-l border-l-slate-200 p-3 text-slate-600 w-full md:max-w-sm top-0 right-0 h-[100vh]">
                    <button className="text-4xl text-slate-600 block" onClick={() => setVisible(false)}>&times;</button>
                    <p className="mt-4">{message}</p>
                    {linkOptions && <div>
                        {linkOptions?.text}
                        <a href={linkOptions?.link}> here.</a>
                    </div>}

                </div>)}

        </>

    )
}

export default InfoItem