"use client";
import styles from "../app/page.module.css";
import { useState } from "react";
import PromptForm from "../app/components/PromptForm";
import React from "react";


interface Choice {
  index: number;
  message: {
    content: string;
  };
}

export default function Home() {
  const [choices, setChoices] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);

  const handlePromptSubmit = async (prompt: string) => {
    setIsLoading(true);
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
      }),
    });

    setIsLoading(false);
    const result = await response.json();
    const newChoices = result.choices.map((choice: Choice) => choice.message.content);
    setChoices(newChoices);
    setHistory([...newChoices.reverse(), ...history]); // Add new responses to the beginning of the history
  };

  return (
    <main className={styles.main}>
    <div className={styles.card}>
        <p className=" font-bold ">Welcome to Azfar&apos;s ChatGPT</p>
        <PromptForm isLoading={isLoading} onSubmit={handlePromptSubmit} />

        <div className={`${styles.response}`} >
          {history.map((response, index) => (
            <p key={index} className=" px-4 py-4 bg-sky-800 border text-white rounded-lg">{response} </p>
          ))}
        </div>
      </div>
    </main>
  );
}
