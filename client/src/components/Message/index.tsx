import { Message } from "@/utils/types";

export default function M({ message }: { message: Message }) {
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
