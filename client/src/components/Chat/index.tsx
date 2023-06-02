import { useEffect, useRef } from "react";
import Message from "@/components/Message";
import { type Message as MessageType } from "@/utils/types";

export default function Chat({ messages }: { messages: MessageType[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={ref}
      className="flex overflow-auto flex-col gap-2 p-3 w-full h-full rounded-lg border border-slate-200"
    >
      {messages.map((message, index) => {
        // eslint-disable-next-line react/no-array-index-key
        return <Message message={message} key={index} />;
      })}
    </div>
  );
}
