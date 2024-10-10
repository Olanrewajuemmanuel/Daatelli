import { Message } from "../../types/types"

function MessagesBanner({ onUpdate, messages }: {
  onUpdate: React.Dispatch<{
    type: "ADD" | "DELETE" | "DELETE_ALL";
    message?: Message;
    id?: string;
  }>, messages: Message[]
}) {

  return (
    <div className="">
      {
        messages.map(({ message, type, id }, idx) =>
          <div key={id} className={`${type === 'danger' ? 'bg-red-600' : (`${type === 'warning' ? 'bg-yellow-600' : 'bg-green-600'}`)} px-4 py-2 rounded-sm shadow- text-white absolute top-2 left-[50%] transform -translate-x-1/2 w-[80%] mx-auto z-${idx + 1} `}>
            <button onClick={() => onUpdate({ type: 'DELETE', id, })} className="text-2xl">&times;</button>
            <p>{message}</p>
            <div className="mt-4">
              Messages: {messages.length}
              <span> </span>Important: {messages.filter(message => message.type === 'danger').length}
              <button onClick={() => onUpdate({ type: 'DELETE_ALL' })} className="float-right">Clear all</button>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default MessagesBanner;