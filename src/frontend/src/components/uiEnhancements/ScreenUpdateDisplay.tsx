import { RegisterType } from "../../types/enums"
import ResearchTypes from "../research/ResearchTypes";
import Modal from "./Modal";

function ScreenUpdateDisplay({ mode, toggleDisplay }: { mode: RegisterType | null, toggleDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    if (!mode) return null;
    if (mode === RegisterType.member) {
        (document.getElementById("daatelli_modal_info") as HTMLDialogElement)?.showModal()
    } else {
        return (<ResearchTypes toggleDisplay={toggleDisplay} />)
    }
}

export default ScreenUpdateDisplay