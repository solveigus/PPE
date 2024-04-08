import Layout from '../components/Layout.js';
import { useState } from 'react';

export default function Page() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);

  const questions = [
    {
      id: 1,
      question: "Avez vous une main valide ?",
      options: [
        { id: "MainValide", label: "Oui", nextQuestion: 2 },
        { id: "PasMainValide", label: "Non", nextQuestion: 3 },
      ]
    },
    {
      id: 2, //Main valide
      question: "Avez vous une console ?",
      options: [///////////////TODO: CHANGER NEXTQUESTION
        { id: "ConsolePC", label: "PC", nextQuestion: 3 },
        { id: "ConsolePS5", label: "PS5", nextQuestion: 3 },
        { id: "ConsolePS4", label: "PS4", nextQuestion: 3 },
        { id: "ConsolePS3", label: "PS3", nextQuestion: 3 },
        { id: "ConsoleXbox", label: "Xbox", nextQuestion: 3 },
        { id: "ConsoleSwitch", label: "Switch", nextQuestion: 3 }
      ]
    },
    {
        id: 3, //Main pas valide
        question: "Avez vous une console ?",
        options: [
          { id: "ConsolePC", label: "PC", nextQuestion: 3 },//TODO: quizz contacteur
          { id: "ConsolePS5", label: "PS5", nextQuestion: 4 },
          { id: "ConsolePS4", label: "PS4", nextQuestion: 4 },
          { id: "ConsolePS3", label: "PS3", nextQuestion: 4 },
          { id: "ConsoleXbox", label: "Xbox", nextQuestion: 4 },
          { id: "ConsoleSwitch", label: "Switch", nextQuestion: 4 }
        ]
    },
    {
        id: 4, //Quel Joystick
        question: "Quel type de joystick pouvez-vous prendre en main ?",
        options: [
          { id: "MainOuverte", label: "Main ouverte", nextQuestion: 5 },
          { id: "MainMiouverte", label: "Main mi-ouverte", nextQuestion: 5 },
          { id: "MainFermee", label: "Main fermée", nextQuestion: 5 },
        ]
    },
    {
      id: 5, //Doigts
      question: "Avez vous des doigts mobiles ?",
      options: [
        { id: "Aucun", label: "Aucun", nextQuestion: 6 },
        { id: "UnDoigts", label: "Un", nextQuestion: 500 }, 
        { id: "DeuxDoigts", label: "Deux", nextQuestion: 501 },
        { id: "TroisDoigts", label: "Trois", nextQuestion: 502 }, 
        { id: "QuatreDoigts", label: "Quatre", nextQuestion: 503 },
        { id: "CinqDoigts", label: "Cinq", nextQuestion: 504 }, 
        { id: "SixDoigts", label: "Six", nextQuestion: 505 },
        { id: "SeptDoigts", label: "Sept", nextQuestion: 506 }, 
        { id: "HuitDoigts", label: "Huit", nextQuestion: 507 }
      ]
    },
    {
        id: 500, //Doigts
        question: "Dans quelle(s) direction(s) va ton premier doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 3 },
          { id: "2", label: "Deux", nextQuestion: 6 },
          { id: "3", label: "Trois", nextQuestion: 6 }
        ]
    },
    {
        id: 501, //Doigts
        question: "Dans quelle(s) direction(s) va ton deuxième doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 500 },
          { id: "2", label: "Deux", nextQuestion: 500 },
          { id: "3", label: "Trois", nextQuestion: 500 }
        ]
    },
    {
        id: 502, //Doigts
        question: "Dans quelle(s) direction(s) va ton troisième doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 501 },
          { id: "2", label: "Deux", nextQuestion: 501 },
          { id: "3", label: "Trois", nextQuestion: 501 }
        ]
    },
    {
        id: 503, //Doigts
        question: "Dans quelle(s) direction(s) va ton quatrième doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 502 },
          { id: "2", label: "Deux", nextQuestion: 502 },
          { id: "3", label: "Trois", nextQuestion: 502 }
        ]
    },
    {
        id: 504, //Doigts
        question: "Dans quelle(s) direction(s) va ton cinquième doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 503 },
          { id: "2", label: "Deux", nextQuestion: 503 },
          { id: "3", label: "Trois", nextQuestion: 503 }
        ]
    },
    {
        id: 505, //Doigts
        question: "Dans quelle(s) direction(s) va ton sixième doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 504 },
          { id: "2", label: "Deux", nextQuestion: 504 },
          { id: "3", label: "Trois", nextQuestion: 504 }
        ]
    },
    {
        id: 506, //Doigts
        question: "Dans quelle(s) direction(s) va ton septième doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 505 },
          { id: "2", label: "Deux", nextQuestion: 505 },
          { id: "3", label: "Trois", nextQuestion: 505 }
        ]
    },
    {
        id: 507, //Doigts
        question: "Dans quelle(s) direction(s) va ton huitième doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 506 },
          { id: "2", label: "Deux", nextQuestion: 506 },
          { id: "3", label: "Trois", nextQuestion: 506 }
        ]
    },
    {
        id: 6, //Pieds
        question: "Avez vous des pieds mobiles ?",
        options: [
          { id: "1", label: "Un", nextQuestion: 7 },
          { id: "2", label: "Deux", nextQuestion: 7 },
          { id: "0", label: "Aucun", nextQuestion: 8 }
        ]
      },
      {
        id: 7, //C ou J pieds
        question: "Préfereriez vous un joystick ou un contacteur ?",
        options: [
          { id: "1", label: "Joystick", nextQuestion: 3 }, //TODO: suite???
          { id: "2", label: "Contacteur", nextQuestion: 3 },
          { id: "0", label: "Préfère un autre membre", nextQuestion: 8 }
        ]
      },
      {
        id: 8, //Cou
        question: "Votre cou est-il mobile ?",
        options: [
          { id: "1", label: "Oui", nextQuestion: 9 },
          { id: "2", label: "Non", nextQuestion: 10 }
        ]
      },
      {
        id: 9, //C ou J cou
        question: "Préfereriez vous un joystick ou un contacteur ?",
        options: [
          { id: "1", label: "Joystick", nextQuestion: 3 }, //TODO: suite???
          { id: "2", label: "Contacteur", nextQuestion: 10 },
        ]
      },
      {
        id: 10, //Souffle
        question: "Pouvez vous souffler ?",
        options: [
          { id: "1", label: "Oui" }, //TODO: suite???
          { id: "2", label: "Non" }
        ]
      }
  ];

  const currentQuestionObj = questions.find(question => question.id === currentQuestion);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption) {
      const nextQuestion = currentQuestionObj.options.find(opt => opt.id === selectedOption).nextQuestion;
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      alert("Veuillez sélectionner une réponse.");
    }
  };

  return (
    <Layout
      title="Webtech"
      description="Home"
    >
      <div className="flex-1 flex flex-col items-center justify-between p-24">
        <h1 className={`mb-6 text-5xl font-semibold text-center`} >{currentQuestionObj.question}</h1>
        <p> </p>
        {currentQuestionObj.options.map(option => (
          <div className="mt-2" key={option.id}>
            <input
              type="radio"
              id={option.id}
              name="joystick"
              value={option.id}
              checked={selectedOption === option.id}
              onChange={() => handleOptionChange(option.id)}
            />
            <label htmlFor={option.id} className="ml-2">{option.label}</label>
          </div>
        ))}
        <button onClick={handleNextClick} className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Suivant</button>
      </div>
    </Layout>
  )
}
