import Layout from '../components/Layout.js';
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useState, useEffect } from 'react';


export default function Page() {
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const supabase = useSupabaseClient();

  


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
      id: 2, //MAIN VALIDE
      question: "Avez vous une console ?",
      options: [
        { id: "ConsolePC", label: "PC", nextQuestion: 4 },
        { id: "ConsolePS5", label: "PS5", nextQuestion: 555 },
        { id: "ConsolePS4", label: "PS4", nextQuestion: 555 },
        { id: "ConsolePS3", label: "PS3", nextQuestion: 555 },
        { id: "ConsoleXbox", label: "Xbox", nextQuestion: 555 },
        { id: "ConsoleSwitch", label: "Switch", nextQuestion: 555 }
      ]
    },
    {
        id: 3, //MAIN PAS VALIDE
        question: "Avez vous une console ?",
        options: [
          { id: "ConsolePC", label: "PC", nextQuestion: 4 },
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
          { id: "Aucun", label: "Aucun", nextQuestion: 5 },
          { id: "MainOuverte", label: "Main ouverte", nextQuestion: 5 },
          { id: "MainMiouverte", label: "Main mi-ouverte", nextQuestion: 5 },
          { id: "MainFermee", label: "Main fermée", nextQuestion: 5 }
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
      id: 499, //Sensibilité doigts
        question: "Avec quelle sensibilité êtes vous à l'aise ?",
        options: [
          { id: "1", label: "Sensibilité normale", nextQuestion: 6 },
          { id: "2", label: "Sensibilité haute", nextQuestion: 6 },
          { id: "3", label: "Sensibilité très haute", nextQuestion: 6 }
        ]
    },
    {
      id: 498, //Quel type de jeux
        question: "A quel type de jeu voulez vous jouer ?",
        options: [
          { id: "1", label: "Jeu de tir", nextQuestion: 555 }, //1J 8C
          { id: "2", label: "Jeu de combat ou de rôle", nextQuestion: 555 }, //1J 4C
          { id: "3", label: "Jeu de sport/course", nextQuestion: 555 } //6C
        ]
    },
    {
        id: 500, //Doigts
        question: "Dans quelle(s) direction(s) va ton premier doigt ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 499 },
          { id: "2", label: "Deux", nextQuestion: 499 },
          { id: "3", label: "Trois", nextQuestion: 499 }
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
          { id: "0", label: "Aucun", nextQuestion: 8 },
          { id: "1", label: "Un", nextQuestion: 7 },
          { id: "2", label: "Deux", nextQuestion: 7 }
        ]
      },
      {
        id: 7, //C ou J pieds
        question: "Préfereriez vous un joystick ou un contacteur ?",
        options: [
          { id: "1", label: "Joystick", nextQuestion: 8 },
          { id: "2", label: "Contacteur", nextQuestion: 8 },
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
          { id: "1", label: "Joystick", nextQuestion: 10 }, 
          { id: "2", label: "Contacteur", nextQuestion: 10 },
        ]
      },
      {
        id: 10, //Autre partie du corps contacteur
        question: "Pouvez vous appuyer avec d'autre partie du corps ?",
        options: [
          { id: "1", label: "Une", nextQuestion: 11 }, //contacteur standard robuste
          { id: "2", label: "Deux", nextQuestion: 11 }, //contacteur standard robuste double
          { id: "3", label: "Aucune", nextQuestion: 11  }
        ]
      },
      {
        id: 11, //Souffle
        question: "Pouvez vous souffler ?",
        options: [
          { id: "1", label: "Oui", nextQuestion: 498 }, 
          { id: "2", label: "Non", nextQuestion: 498 }
        ]
      },
      {
        id: 555, //FIN
          question: "Fin",
          options: [
            //{ id: "1", label: "fin possible"}
          ]
      },
  ];

  const currentQuestionObj = questions.find(question => question.id === currentQuestion);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const [session, setSession] = useState(null)

  useEffect(() => {
    (async () => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
    })()
  }, [supabase.auth])

  var email = "loading"
  if (session) {
    email = session.user.email
  }

  console.log(email);

  async function createAndFetchMobility() {
    const { data: mobilityData1, error: error2 } = await supabase
      .from('mobility')
      .select('id')
      .eq('user_email', email);
  
    if (error2) {
      console.error('Error getting mobility:', error2);
      return null;
    }
  
    if (mobilityData1.length === 0) {
      const { data, error } = await supabase
        .from('mobility')
        .insert([{ user_email: email, chin_number_buttons: 0 }]);
  
      if (error) {
        console.error('Error inserting mobility ID:', error);
        return null;
      }
  
      const { data: mobilityData, error: error1 } = await supabase
        .from('mobility')
        .select('id')
        .eq('user_email', email);
  
      if (error1) {
        console.error('Error fetching mobility ID:', error1);
        return null;
      }
  
      return mobilityData[0].id;
    }
  
    return mobilityData1[0].id;
  }

  const handleNextClick = async () => {

    if (selectedOption) {
      const nextQuestion = currentQuestionObj.options.find(opt => opt.id === selectedOption).nextQuestion;
        
      // Utilisez la fonction
      createAndFetchMobility().then(mobilityId => {
        
      }).catch(err => {
        console.error('Error:', err)
      })

      const mobilityId = await createAndFetchMobility();

      console.log('Mobility ID dans handlenextclick:', mobilityId)

      let sensi = "normal";
      let foot = 0;

      let J = 0;
      let C = 0;
      
      if (currentQuestionObj.id === 2) { // MAIN VALIDE
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "ConsolePC":
              consoleType = "PC";
              break;
            case "ConsolePS3":
              consoleType = "PS3";
              break;
            case "ConsolePS4":
              consoleType = "PS4";
              break;
            case "ConsolePS5":
              consoleType = "PS5";
              break;
            case "ConsoleXbox":
              consoleType = "Xbox";
              break;
            case "ConsoleSwitch":
              consoleType = "Switch";
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          console.log('Mobility ID dans if:', mobilityId)

          const mobilityData = await supabase
          .from('mobility')
          .update({ console: consoleType })
          .eq('id', mobilityId )
          .select()

          const { data, error } = await supabase
          .from('hand')
          .insert([
            { hand_valid: false, id_mobility: mobilityId },
          ])
          .select()
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la base de données:', error.message);
        }
      }

      if (currentQuestionObj.id === 3) { // MAIN PAS VALIDE
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "ConsolePC":
              consoleType = "PC";
              break;
            case "ConsolePS3":
              consoleType = "PS3";
              break;
            case "ConsolePS4":
              consoleType = "PS4";
              break;
            case "ConsolePS5":
              consoleType = "PS5";
              break;
            case "ConsoleXbox":
              consoleType = "Xbox";
              break;
            case "ConsoleSwitch":
              consoleType = "Switch";
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }

          const mobilityData = await supabase
          .from('mobility')
          .update({ console: consoleType })
          .eq('id', mobilityId )
          .select()

          console.log('Mobility ID dans if:', mobilityId)
          const { data, error } = await supabase
          .from('hand')
          .insert([
            { hand_valid: false, id_mobility: mobilityId },
          ])
          .select()
        } catch (error) {
          console.error('Erreur lors de la mise à jour de la base de données:', error.message);
        }
      }

      if (currentQuestionObj.id === 4) { //JOYSTICK
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "MainOuverte":
              const { data, error } = await supabase
              .from('hand')
              .update({ hand_open: true })
              .eq('id', mobilityId )
              .select()
              break;
            case "MainMiouverte":
              const { data1, error1 } = await supabase
              .from('hand')
              .update({ hand_half_open: true })
              .eq('id', mobilityId )
              .select()
              break;
            case "MainFermee":
              const { data2, error2 } = await supabase
              .from('hand')
              .update({ hand_closed: true })
              .eq('id', mobilityId )
              .select()
              break;
            case "Aucun":
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }


      if (currentQuestionObj.id === 499) { //sensibilité
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "1":
                sensi = "normal";
              break;
            case "2":
                sensi = "medium";
              break;
            case "3":
                sensi = "low";
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }

      if (currentQuestionObj.id === 500 || currentQuestionObj.id === 501 || currentQuestionObj.id === 502 || currentQuestionObj.id === 503 || currentQuestionObj.id === 504 || currentQuestionObj.id === 505 || currentQuestionObj.id === 506 || currentQuestionObj.id === 507) { //doigts
        try {
          switch(selectedOption) {
            case "1":
                const { data, error } = await supabase
                .from('finger')
                .insert
                ({ finger_sensibility: sensi, id_mobility: mobilityId, finger_direction: 1})
                .select()
              break;
            case "2":
              const { data1, error1 } = await supabase
              .from('finger')
              .insert
              ({ finger_sensibility: sensi, id_mobility: mobilityId, finger_direction: 2})
              .select()
              break;
            case "3":
              const { data2, error2 } = await supabase
              .from('finger')
              .insert
              ({ finger_sensibility: sensi, id_mobility: mobilityId, finger_direction: 3})
              .select()
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }

      if (currentQuestionObj.id === 6) { //pieds
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "1":
                foot = 1;
              break;
            case "2":
                foot = 2;
              break;
            case "0":
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }

      if (currentQuestionObj.id === 7) { //pieds J ou C
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "1": // J
                if(foot == 2)
                {
                    const { data2, error2 } = await supabase
                    .from('foot')
                    .insert
                    ({ foot_joystick: true, id_mobility: mobilityId})
                    .select()

                    const { data1, error1 } = await supabase
                    .from('foot')
                    .insert
                    ({ foot_joystick: true, id_mobility: mobilityId})
                    .select()
                }else{
                      const { data2, error2 } = await supabase
                    .from('foot')
                    .insert
                    ({ foot_joystick: true, id_mobility: mobilityId})
                    .select()
                }
              break;
            case "2":// C
            if(foot == 2)
            {
                const { data2, error2 } = await supabase
                .from('foot')
                .insert
                ({ foot_contactor: true, id_mobility: mobilityId})
                .select()

                const { data1, error1 } = await supabase
                .from('foot')
                .insert
                ({ foot_contactor: true, id_mobility: mobilityId})
                .select()
            }else{
                  const { data2, error2 } = await supabase
                .from('foot')
                .insert
                ({ foot_contactor: true, id_mobility: mobilityId})
                .select()
            }
              break;

            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }

      if (currentQuestionObj.id === 9) { //cou J ou C
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "1"://J
                const { data, error } = await supabase
                .from('mobility')
                .update
                ({ chin: true})
                .eq('id', mobilityId )
                .select()
              break;
            case "2"://C
                const { data2, error2 } = await supabase
                .from('mobility')
                .update
                ({ chin: true})
                .eq('id', mobilityId )
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }

        //BDD ID 10!!!!!!!!!!!!!!!!!!!!!!!!

      if (currentQuestionObj.id === 11) { //souffle
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "1"://Oui
                const { data, error } = await supabase
                .from('mobility')
                .update
                ({ breath: true})
                .eq('id', mobilityId )
                .select()
              break;
            case "2"://Non
                const { data2, error2 } = await supabase
                .from('mobility')
                .update
                ({ breath: true})
                .eq('id', mobilityId )
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }

       //BDD 498!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
       if (currentQuestionObj.id === 498) { //type de jeu
        try {
          let consoleType = "";
          switch(selectedOption) {
            case "1"://tir
                C = 8;
                J = 1;

                const mobilityData = await supabase
              .from('mobility')
              .update({ J: 1, C: 8})
              .eq('id', mobilityId )
              .select()

              break;
            case "2"://combat
                C = 4;
                J = 1;

                const mobilityData1 = await supabase
              .from('mobility')
              .update({ J: 1, C: 4})
              .eq('id', mobilityId )
              .select()
              break;
            case "3"://sport
                C = 6;
                J = 0;

                const mobilityData2 = await supabase
              .from('mobility')
              .update({ J: 0, C: 6})
              .eq('id', mobilityId )
              .select()
              break;
            default:
              console.error("Option invalide sélectionnée.");
          }
          } catch (error) {
            console.error('Erreur lors de la mise à jour de la base de données:', error.message);
          }
        }

      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
    } else {
      alert("Veuillez sélectionner une réponse.");
    }

    async function signOut() {
      const { error } = await supabase.auth.signOut()
      router.push("/")
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
