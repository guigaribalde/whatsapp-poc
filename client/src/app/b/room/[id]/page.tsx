"use client";

import Chat from "@/components/Chat";
import useChat from "@/utils/hooks/useChat";

interface Params {
  params: {
    id: string;
  };
}
export default function One({ params }: Params) {
  const { messages, sendMessage } = useChat(`B/${params.id}`);

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
        <Chat messages={messages} />
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
