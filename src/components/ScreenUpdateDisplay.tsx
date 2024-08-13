import { useState } from "react";
import { RegisterType } from "../types/enums"
import ResearchTypes from "./research/ResearchTypes";
import Modal from "./Modal";

function ScreenUpdateDisplay({ mode, toggleDisplay }: { mode: RegisterType | null, toggleDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    if (!mode) return null;
    return (<div>
        {mode === RegisterType.member ?
            <Modal toggleDisplay={toggleDisplay} />
            : <ResearchTypes toggleDisplay={toggleDisplay} />
        }
    </div>
    )
}

export default ScreenUpdateDisplay