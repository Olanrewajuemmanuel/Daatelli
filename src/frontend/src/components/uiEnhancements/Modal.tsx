import { RegisterType } from "../../types/enums";

function Modal({ toggleDisplay, id }: { toggleDisplay: React.Dispatch<React.SetStateAction<boolean>>, id: string }) {
    return (
        <dialog id={id} className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => toggleDisplay(false)}></button>
                </form>
                <h3 className="font-bold text-lg">Upgrade your account</h3>
                <p className="py-4">Upgrade your account to a Researcher account and gain access to <span className="font-semibold">upload all research types</span> and unlock more features.</p>
                <button className="btn bg-primary text-white float-right">Upgrade now</button>
            </div>
        </dialog>
    )
}

export default Modal