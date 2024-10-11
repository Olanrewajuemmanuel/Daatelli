function AddResearchButton({ onSetScreenState }: { onSetScreenState: () => void }) {
    return (
        <button onClick={onSetScreenState} className="btn bg-primary text-white shadow-sm">Share your Findings</button>
    )
}

export default AddResearchButton