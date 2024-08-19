import { useState } from "react";
import Attestation from "../Attestation";

function StepForm({ noOfSteps, child1, child2, child3 }: { noOfSteps: number, child1: JSX.Element, child2?: JSX.Element, child3?: JSX.Element, child4?: JSX.Element }) {
    const [steps, setSteps] = useState(0);

    return (
        <form>
            {steps === 0 && child1}
            {steps === 1 && child2}
            {steps === 2 && child3}


            {/* Attestation shows on submission step */}
            {steps === noOfSteps && <div>
                <Attestation />
                <div>
                    <input type="checkbox" name="attest" id="attest" />
                    <label htmlFor="attest">I have read and agreed to the above Attestation of Authorship, Compliance and Terms</label>
                </div>
            </div>}
            <button type="button" hidden={steps === 0} onClick={() => setSteps(steps - 1)}>Back</button>
            <button type="button" hidden={steps === noOfSteps} onClick={() => setSteps(steps + 1)}>Next</button>
            <button type="submit" hidden={steps !== noOfSteps}>Submit</button>
        </form>
    )
}

export default StepForm