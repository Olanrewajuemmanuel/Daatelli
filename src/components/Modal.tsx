function Modal({ toggleDisplay }: { toggleDisplay: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
        <div>Modal
            <button onClick={() => toggleDisplay(false)}>&times;</button>
        </div>
    )
}

export default Modal