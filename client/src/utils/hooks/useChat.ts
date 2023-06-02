/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { type Message } from "../types";

const socket = io("http://localhost:3000");

const useChat = (room: string) => {
  const [innerRoom, setInnerRoom] = useState<string>(room);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit("join", { room: innerRoom });
    socket.on("message", (message: Message) => {
      setMessages((old_messages) => [...old_messages, message]);
    });
    socket.on("joined", (server_room: string) => {
      setMessages((old_messages) => [
        ...old_messages,
        {
          origin_type: "system",
          content: `Conectado a sala ${server_room} com sucesso!`,
        },
      ]);
    });
    socket.on("room_change", (new_room) => {
      setInnerRoom(new_room);
    });
  }, []);

  const sendMessage = (message: string) => {
    socket.emit("message", { room: innerRoom, message });
    setMessages((old_messages) => [
      ...old_messages,
      {
        origin_type: "me",
        content: message,
      },
    ]);
  };
  // const sendMessage = () => {};

  return { messages, sendMessage };
};

export default useChat;
