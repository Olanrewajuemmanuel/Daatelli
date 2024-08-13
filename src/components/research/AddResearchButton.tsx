import { useContext } from "react";
import { UserContext } from "../../contexts";
import { RegisterType } from "../../types/enums";


function AddResearchButton({ onSetScreenState }: { onSetScreenState: () => void }) {
    const user = useContext(UserContext)

    return (
        <button onClick={onSetScreenState} className="bg-[#1d7fff] text-white shadow-sm rounded-md px-3 py-2">Share your findings</button>
    )
}

export default AddResearchButton