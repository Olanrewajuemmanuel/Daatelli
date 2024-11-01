function AddResearchButton({ onSetScreenState }: { onSetScreenState: () => void }) {
    return (
        <button onClick={onSetScreenState} className="btn bg-primary bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm">Share your Findings</button>
    )
}

export default AddResearchButton