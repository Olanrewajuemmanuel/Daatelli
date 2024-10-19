import { Message } from "../../types/types"

function MessagesBanner({ onUpdate, messages }: {
  onUpdate: React.Dispatch<{
    type: "ADD" | "DELETE" | "DELETE_ALL";
    message?: Message;
    id?: string;
  }>, messages: Message[]
}) {

  return (
    <div className="inter-body text-sm">
      {
        messages.map(({ message, type, id }, idx) =>
          <div key={id} className={`${type === 'success' ? 'bg-primary' : `bg-red-600`} px-4 py-2 rounded-md shadow-md text-slate-50 absolute top-2 left-[50%] transform -translate-x-1/2 w-[60%] mx-auto z-${idx + 1} `}>
            <button onClick={() => onUpdate({ type: 'DELETE', id, })} className="text-base absolute top-2 right-5"><span className="text-slate-50">✕</span></button>
            <div className="mt-4">
              <p className="text-wrap">{message}</p>
              <div className="mt-4">
                Messages: {messages.length}
                <span> </span>Important: {messages.filter(message => message.type === 'danger').length}
                <button onClick={() => onUpdate({ type: 'DELETE_ALL' })} className="float-right hover:opacity-90">Clear all</button>
              </div>
            </div>

          </div>
        )
      }
    </div>
  )
}

export default MessagesBanner;