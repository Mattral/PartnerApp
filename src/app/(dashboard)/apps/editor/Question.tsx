// Question.tsx
"use client"
import React, { useState, useEffect } from 'react';
import DynamicForm from './DynamicForm';

const Question = () => {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    // Simulate API call
    const fetchedQuestions = [
      { question: "What is your First Name?", type: "text", guideText: "Please enter your full first name." },
      { question: "What is your Last Name?", type: "text", guideText: "Please enter your last name." },
      { question: "How Many People will sign?", type: "number", guideText: "Enter the number of people who will be signing." },
      { 
        question: "Is this Local or International?", 
        type: "select", 
        options: [
          { label: "Local", value: "local" },
          { label: "International", value: "international" }
        ], 
        guideText: "Select whether this is a local or international service."
      },
      { 
        question: "What are the available options?", 
        type: "checkbox", 
        options: [
          { label: "One Time Payment", value: "one_time" },
          { label: "Subscriptions", value: "subscriptions" },
          { label: "Prepaid", value: "prepaid" },
          { label: "Third Party", value: "third_party" }
        ],
        guideText: "Please select all the available payment options."
      }
    ];

    setQuestions(fetchedQuestions);
  }, []);

  return (
    <div>
      <h1>Plase fill in the Form</h1>
      <DynamicForm questions={questions} />
    </div>
  );
};

export default Question;
