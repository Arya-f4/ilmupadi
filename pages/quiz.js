import Head from 'next/head';
import questions from '../database/dbquiz';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import { useState } from 'react';
import Container from './components/Container';
import { motion } from 'framer-motion';
import Link from 'next/link';
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);

  const handleSubmit = (answer) => {
    if (!isAnswered) {
      alert("Mohon Jawab Soal Dibawah, pertanyaannya cuman 10 kok!");
      return;
    }
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questions[currentQuestion].id]: answer }));
    setCurrentQuestion(currentQuestion + 1);
    setIsAnswered(false);
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
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questions[currentQuestion].id]: parseInt(value, 10) }));
    setIsAnswered(true);
  };

  const renderQuestion = () => {
    const currentQuestionData = questions[currentQuestion];
    return (
      <motion.div
        className='flex flex-col items-center justify-center h-full bg-skin-gray p-8 overflow-x-hidden'
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className='text-xl font-bold mb-4'> Pernyataan {currentQuestionData.id} :</h2>
        <h2 className='text-xl font-bold mb-4'>{currentQuestionData.question}</h2>
        <ul className='space-y-2 flex-wrap'>
          {currentQuestionData.options.map((option) => (
            <li key={option.value} className='flex items-center active:bg-amber-100 '>
              <div className="hover:bg-amber-50 flex active:bg-amber-100 items-center ps-4 border-2 border-black rounded-2xl dark:border-gray-700">
                <input
                  id={`bordered-radio-${option.value}`}
                  type="radio"
                  value={option.value}
                  name={`bordered-radio-${currentQuestionData.id}`}
                  className='w-screen md:w-auto text-black  h-4 bg-skin-gray border-black  '
                  checked={answers[currentQuestionData.id] === option.value}
                  onChange={handleRadioChange}
                />
                <label
                  htmlFor={`bordered-radio-${option.value}`}
                  className='w-full pr-10 py-4 ms-2 text-sm font-medium text-gray-900 '
                >
                  {option.label}
                </label>
              </div>
            </li>
          ))}
        </ul>
        <div className='space-x-16'>
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
        
      </motion.div>
    );
  };

  const renderResult = () => {
    return (
      <motion.div className="h-screen bg-skin-gray"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="py-36">
          <div className='flex flex-col items-center justify-center h-full'>
            <h2 className='text-2xl font-bold mb-4'>Hasil Quiz</h2>
            <p className='text-lg'>
              Anda memiliki skor {result} dari {questions.length * 5}. Berikut adalah
              interpretasi hasilnya:
            </p>
            {result < 10 ? (
              <p className='text-lg'>Anda memiliki tingkat konsumerisme yang sangat rendah.</p>
            ) : result < 20 ? (
              <p className='text-lg'>Anda memiliki tingkat konsumerisme yang rendah.</p>
            )
              : result < 35 ? (
                <p className='text-lg'>Anda memiliki tingkat konsumerisme yang sedang.</p>
              ) : result < 45 ? (
                <p className='text-lg'>Anda memiliki tingkat konsumerisme yang tinggi.</p>
              ) : (
                <p className='text-lg'>Anda memiliki tingkat konsumerisme yang Sangat tinggi.</p>
              )
            }
            <Link
              href={`/`}>
              <button
                className='bg-skin-main hover:bg-lime-950 text-white font-bold py-2 px-4 rounded mt-4'
              >
                Back to home
              </button>
            </Link>
          </div>
        </Container>
      </motion.div>
    );
  };

  return (
    <div className='bg-skin-gray'>
      <div className='h-screen bg-skin-gray'>
        <Navbar />
        <Head>
          <title>Quiz: Prediksi Konsumerisme</title>
        </Head>
        {currentQuestion < questions.length ? (
          renderQuestion()
        ) : (
          renderResult()
        )}

      </div>
      <Footer />
    </div>
  );
};

export default Quiz;