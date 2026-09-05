"use client";
import React, { ReactElement, useEffect, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { spawn } from "child_process";

const ChatPage = () => {
  const { messages, status, sendMessage } = useChat();
  const [userData, setUserData] = useState({});
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = e.currentTarget;
    const formData = new FormData(data);
    const formattedData = Object.fromEntries(formData);
    setUserData(formattedData);
  };

  useEffect(() => {
    if (!Object.keys(userData).length) return;

    sendMessage({
      text: JSON.stringify(userData),
    });
  }, [userData]);

  console.log(messages);
  console.log(status);

  const messageIA = messages
    .filter((msg: any) => msg.role === "assistant")
    .map((data) => ({ parts: data.parts, id: data.id }));

  console.log({ messageIA });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-10 text-black">
      <section className="border size-150 border-black">
        <form onSubmit={handleSubmit}>
          <h1 className="text-center text-2xl">Datos del ususario</h1>
          <div className="flex flex-col items-start px-10">
            <label htmlFor="">Nombre</label>
            <input type="text" className="border w-md" name="name" />
          </div>
          <div className="flex flex-col items-start px-10">
            <label htmlFor="">Edad</label>
            <input type="text" className="border w-md" name="age" />
          </div>
          <div className="flex flex-col items-start px-10">
            <label htmlFor="">Carrera</label>
            <input type="text" className="border w-md" name="career" />
          </div>
          <div className="flex flex-col items-start px-10 mt-10">
            <label htmlFor="">Experiencia Laboral</label>
            <textarea
              name="workExperience"
              id=""
              rows={4}
              cols={50}
              className="border"
            ></textarea>
          </div>
          <div className="flex flex-col items-start px-10 mt-10">
            <input type="submit" className="border w-md py-2 rounded" />
          </div>
        </form>

        <div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage({
                text: input,
              });
            }}
          >
            <div className="flex  items-start px-10 mt-10">
              <input
                type="text"
                className="border w-md py-2 rounded"
                name="text"
                value={input}
                onChange={({ target }) => setInput(target.value)}
              />
              <input type="submit" className="border w-20 py-2 rounded" />
            </div>
          </form>
        </div>
      </section>

      <section className="size-150 overflow-y-auto rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        {messageIA.map(({ id, parts }) => (
          <div
            key={id}
            className="mb-4 last:mb-0 rounded-lg bg-gray-50 p-4 text-sm leading-7 text-gray-800"
          >
            {parts.map(({ type, text }: any, index) => {
              if (type !== "text") return null;

              return (
                <p key={index} className="whitespace-pre-wrap">
                  {text}
                </p>
              );
            })}
          </div>
        ))}
      </section>
    </div>
  );
};

export default ChatPage;
