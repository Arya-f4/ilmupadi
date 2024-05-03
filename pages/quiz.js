import Head from 'next/head';
import questions from '../database/dbquiz';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import { useState,useEffect } from 'react';
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleSubmit = (answer) => {
    setAnswers((prevAnswers) => ({...prevAnswers, [questions[currentQuestion].id]: answer }));
    setCurrentQuestion(currentQuestion + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const calculateScore = () => {
    let score = 0;
    Object.values(answers).forEach((answer) => {
      score += answer;
    });
    return score;
  };

  const result = calculateScore();

  const handleRadioChange = (event) => {
    const { value } = event.target;
    setAnswers((prevAnswers) => ({...prevAnswers, [questions[currentQuestion].id]: parseInt(value, 10)}));
  };

  const renderQuestion = () => {
    const currentQuestionData = questions[currentQuestion];
    return (
      <div className='flex flex-col items-center justify-center h-full bg-skin-gray'>
        <h2 className='text-xl font-bold mb-4'>Question Number {currentQuestionData.id} :</h2>
        <h2 className='text-xl font-bold mb-4'>{currentQuestionData.question}</h2>
        <ul className='space-y-2'>
  {currentQuestionData.options.map((option) => (
    <li key={option.value} className='flex items-center'>
      <input
        type="radio"
        name={`question-${currentQuestionData.id}`}
        value={option.value}
        checked={answers[currentQuestionData.id] === option.value}
        onChange={handleRadioChange}
        className=''
      />
      <div className={`w-6 h-6 border rounded-full flex items-center justify-center mr-2 ${answers[currentQuestionData.id] === option.value ? 'bg-skin-main' : ''}`}>
        {answers[currentQuestionData.id] === option.value && <div className='w-4 h-4 border-2 border-white rounded-full' />}
      </div>
      <input
        type="radio"
        name={`question-${currentQuestionData.id}`}
        value={option.value}
        checked={answers[currentQuestionData.id] === option.value}
        onChange={handleRadioChange}
        className='hidden'
      />
      <label className='cursor-pointer'>{option.label}</label>
    </li>
  ))}
</ul>
        {currentQuestion > 0 && (
          <button
            onClick={handlePrevious}
            className='bg-skin-main hover:bg-lime-950 text-white font-bold py-2 px-4 rounded mt-4'
          >
            Previous
          </button>
        )}
        <button
          onClick={() => handleSubmit(answers[questions[currentQuestion].id])}
          className='bg-skin-main hover:bg-lime-950 text-white font-bold py-2 px-4 rounded mt-4'
        >
          Next
        </button>
      </div>
    );
  };

  const renderResult = () => {
    return (
        <div className="h-screen bg-skin-gray">
       
      <div className='flex flex-col items-center justify-center h-full'>
        <h2 className='text-2xl font-bold mb-4'>Hasil Quiz</h2>
        <p className='text-lg'>
          Anda memiliki skor {result} dari {questions.length * 5}. Berikut adalah
          interpretasi hasilnya:
        </p>
        {result < 20? (
          <p className='text-lg'>Anda memiliki tingkat konsumerisme yang rendah.</p>
        ) : result < 35? (
          <p className='text-lg'>Anda memiliki tingkat konsumerisme yang sedang.</p>
        ) : (
          <p className='text-lg'>Anda memiliki tingkat konsumerisme yang tinggi.</p>
        )}
      </div>
     
      </div>
    );
  };

  return (
    <div className='h-screen bg-skin-gray'>
        <Navbar/>
        <Head>
            <title>Quiz: Prediksi Konsumerisme</title>
        </Head>
        {currentQuestion < questions.length? (
          renderQuestion()
        ) : (
          renderResult()
        )}
     <Footer/>
    </div>

  );
};

export default Quiz;