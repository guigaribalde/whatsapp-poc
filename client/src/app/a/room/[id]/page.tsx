"use client";

import useChat from "@/utils/hooks/useChat";
import { type Message as IMessage } from "@/utils/types";

interface Params {
  params: {
    id: string;
  };
}

function Message({ message }: { message: IMessage }) {
  let style;

  if (message.origin_type === "me") style = "ml-auto bg-stone-200";
  if (message.origin_type === "system")
    style = "mx-auto w-full max-w-full text-center bg-amber-100";
  if (message.origin_type === "user") style = "bg-green-200";

  return (
    <div className={`p-3 max-w-xs rounded-md ${style}`}>
      <span className="flex flex-col">
        {message.origin_header && <strong>{message.origin_header}</strong>}
        <p>{message.content}</p>
      </span>
    </div>
  );
}

export default function One({ params }: Params) {
  const { messages, sendMessage } = useChat(`A/${params.id}`);

  function submitMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector("input");
    if (input) {
      sendMessage(input.value);
      input.value = "";
    }
  }

  return (
    <div className="flex justify-center items-center p-4 w-full h-full">
      <div className="flex flex-col gap-4 justify-between my-5 w-full max-w-xl h-full">
        <div className="flex overflow-auto flex-col gap-2 p-3 w-full h-full rounded-lg border border-slate-200">
          {messages.map((message, index) => {
            // eslint-disable-next-line react/no-array-index-key
            return <Message message={message} key={index} />;
          })}
        </div>
        <div className="w-full">
          <div className="w-full form-control">
            <form onSubmit={submitMessage} className="w-full input-group">
              <input
                type="text"
                placeholder="Digite sua mensagem..."
                className="w-full input input-bordered"
              />
              <button type="submit" className="btn btn-square btn-primary">
                📨
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
