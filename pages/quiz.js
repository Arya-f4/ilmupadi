import { useState } from 'react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import Head from 'next/head';
import questions from '../database/dbquiz';
import Navbar from './components/navbar';
import Footer from './components/Footer';
import Container from './components/Container';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { db } from '../config/firebaseConfig';
import { recom } from '../database/dbrecom';
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isAnswered, setIsAnswered] = useState(false);
  const [userInfo, setUserInfo] = useState({ name: '', age: '' });
  const [isUserInfoSubmitted, setIsUserInfoSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isResultSaved, setIsResultSaved] = useState(false);
  const handleSubmit = (answer) => {
    if (!isAnswered) {
      alert("Mohon Jawab Soal Dibawah, pertanyaannya cuman 10 kok!");
      return;
    }
    setAnswers((prevAnswers) => ({ ...prevAnswers, [questions[currentQuestion].id]: answer }));
    setCurrentQuestion(currentQuestion + 1);
    setIsAnswered(false);

    if (currentQuestion === questions.length - 1 && answer !== undefined) {
      setIsResultSaved(false); // Reset isResultSaved to false before calling saveResultToFirebase
      saveResultToFirebase(answer);
    }
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

  const handleUserInfoSubmit = (e) => {
    e.preventDefault();
    if (!userInfo.name || !userInfo.age) {
      setErrorMessage('Please fill in your name and age');
      return;
    }
    setIsUserInfoSubmitted(true);
  };

  const saveResultToFirebase = async () => {
    try {
      if (!userInfo.name || !userInfo.age) {
        setErrorMessage('Please fill in your name and age');
        return;
      }
      await addDoc(collection(db, 'quizResults'), {
        name: userInfo.name,
        age: userInfo.age,
        score: result,
        date: new Date()
      });
      setIsResultSaved(true); // Set isResultSaved to true after saving the result
      console.log('Document successfully written!');
    } catch (e) {
      setErrorMessage(`Error adding document: ${e.message}`);
      console.log('Error adding document: ', e);
      console.error('Error adding document: ', e);
    }
  };

  const renderUserInfoForm = () => (
    <motion.div
      className="flex flex-col items-center h-screen justify-center bg-skin-gray p-4 overflow-x-hidden"
      initial={{ opacity: 0, x: -200 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleUserInfoSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nama:</label>
          <input
            type="text"
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Usia:</label>
          <input
            type="number"
            required
            min="14"
            max="28"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            value={userInfo.age}
            onChange={(e) => setUserInfo({ ...userInfo, age: e.target.value })}
          />
        </div>
        <button
          type="submit"
          className="bg-skin-main hover:bg-lime-950 text-white font-bold py-2 px-4 rounded"
        >
          Mulai Kuis
        </button>
      </form>
    </motion.div>
  );

  const renderQuestion = () => {
    const currentQuestionData = questions[currentQuestion];
    return (
      <motion.div
        className='flex flex-col items-center h-screen justify-center bg-skin-gray p-4 overflow-x-hidden'
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
    if (!isResultSaved) {
      saveResultToFirebase(); // If not saved, save the result
    }
    return (
      <motion.div className="h-screen bg-skin-gray"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Container className="py-36 lg:py-24">
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
            {isResultSaved ? (
              <p className='text-lg text-green-500'>Hasil quiz berhasil disimpan!</p>
            ) : (
              <p className='text-lg text-red-500'>Gagal menyimpan hasil quiz. Silakan coba lagi.</p>
            )}
            <Link
              href={`/`}>
              <button
                className='bg-skin-main hover:bg-lime-950 text-white font-bold py-2 px-4 rounded mt-4'
              >
                Back to home
              </button>

            </Link>
            {result < 10 ? (
              <p className='text-lg'>

              </p>



            ) : result < 20 ? (
              <p className='text-lg'>
                kk
              </p>

            )
              : result < 35 ? (
                <p className='text-lg'>aa</p>
              ) : result < 45 ? (
                <p className='text-lg'>Anda memiliki tingkat konsumerisme yang tinggi.</p>
              ) : (
                <p className='text-lg'>Anda memiliki tingkat konsumerisme yang Sangat tinggi.</p>
              )
            }
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
          <meta
            name="description"
            content="Consume care adalah platform yang menyediakan informasi seputar konsumsi"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        {isUserInfoSubmitted ? (
          currentQuestion < questions.length ? (
            renderQuestion()
          ) : (
            renderResult()
          )
        ) : (
          renderUserInfoForm()
        )}
        {errorMessage && (
          <div className='text-red-500'>{errorMessage}</div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Quiz;