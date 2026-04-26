import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  Calculator,
  BookOpen,
  Brain,
  Camera,
  Lightbulb,
  Zap,
  ChevronRight,
  Target,
  Hash,
  Variable,
  Triangle,
  BarChart3,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface Topic {
  id: string;
  title: string;
  description: string[];
  quiz?: QuizQuestion[];
}

interface ThematicAxis {
  id: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  topics: Topic[];
}

const MATH_CURRICULUM: ThematicAxis[] = [
  {
    id: 'numeros',
    title: 'NÚMEROS',
    icon: Hash,
    color: 'bg-white border-l-4 border-red-500',
    topics: [
      {
        id: 'enteros-racionales',
        title: 'Conjunto de los números enteros y racionales',
        description: [
          'Operaciones y orden en el conjunto de los números enteros.',
          'Operaciones y comparación entre números en el conjunto de los números racionales.',
          'Problemas que involucren el conjunto de los números enteros y racionales en diversos contextos.'
        ],
        quiz: [
          {
            id: 1,
            question: "¿Cuál de las siguientes afirmaciones sobre los números enteros es CORRECTA?",
            options: [
              "Los números enteros incluyen solo números positivos",
              "Los números enteros incluyen números positivos, negativos y el cero",
              "Los números enteros no incluyen el cero",
              "Los números enteros son solo números pares"
            ],
            correctAnswer: 1,
            explanation: "Los números enteros (ℤ) incluyen todos los números positivos, negativos y el cero: {..., -3, -2, -1, 0, 1, 2, 3, ...}"
          },
          {
            id: 2,
            question: "Si a = -5 y b = 3, ¿cuál es el valor de a - b?",
            options: [
              "-8",
              "-2",
              "2",
              "8"
            ],
            correctAnswer: 0,
            explanation: "a - b = (-5) - 3 = -5 - 3 = -8. Al restar un número positivo de uno negativo, el resultado es más negativo."
          },
          {
            id: 3,
            question: "¿Cuál de los siguientes números racionales es equivalente a 0,75?",
            options: [
              "3/5",
              "3/4",
              "4/5",
              "2/3"
            ],
            correctAnswer: 1,
            explanation: "0,75 = 75/100 = 3/4. Para verificar: 3 ÷ 4 = 0,75"
          },
          {
            id: 4,
            question: "¿Cuál es el resultado de (-2) × (-6)?",
            options: [
              "-12",
              "12",
              "-8",
              "8"
            ],
            correctAnswer: 1,
            explanation: "(-2) × (-6) = 12. El producto de dos números negativos es siempre positivo."
          },
          {
            id: 5,
            question: "Si ordenamos de menor a mayor los números -3, 0, -1, 2, el orden correcto es:",
            options: [
              "-1, -3, 0, 2",
              "-3, -1, 0, 2",
              "0, -1, -3, 2",
              "2, 0, -1, -3"
            ],
            correctAnswer: 1,
            explanation: "En la recta numérica, -3 está más a la izquierda que -1, por lo tanto -3 < -1 < 0 < 2"
          },
          {
            id: 6,
            question: "¿Cuál es el resultado de 2/3 + 1/6?",
            options: [
              "3/9",
              "5/6",
              "3/6",
              "1/2"
            ],
            correctAnswer: 1,
            explanation: "Para sumar fracciones necesitamos común denominador: 2/3 = 4/6, entonces 4/6 + 1/6 = 5/6"
          },
          {
            id: 7,
            question: "¿Cuál es el opuesto aditivo de -7?",
            options: [
              "-7",
              "7",
              "1/7",
              "-1/7"
            ],
            correctAnswer: 1,
            explanation: "El opuesto aditivo de un número es aquel que sumado con él da cero. El opuesto de -7 es 7, porque (-7) + 7 = 0"
          },
          {
            id: 8,
            question: "Si x = -4 e y = -2, ¿cuál es el valor de x ÷ y?",
            options: [
              "-2",
              "2",
              "-6",
              "6"
            ],
            correctAnswer: 1,
            explanation: "x ÷ y = (-4) ÷ (-2) = 2. La división de dos números negativos es positiva."
          },
          {
            id: 9,
            question: "¿Cuál de las siguientes fracciones es mayor que 1/2?",
            options: [
              "2/5",
              "3/7",
              "4/9",
              "3/5"
            ],
            correctAnswer: 3,
            explanation: "Para comparar con 1/2 = 0,5: 2/5 = 0,4; 3/7 ≈ 0,43; 4/9 ≈ 0,44; 3/5 = 0,6. Solo 3/5 > 1/2"
          },
          {
            id: 10,
            question: "¿Cuál es el resultado de |-8| + |3|?",
            options: [
              "-11",
              "-5",
              "5",
              "11"
            ],
            correctAnswer: 3,
            explanation: "El valor absoluto de -8 es 8, y el valor absoluto de 3 es 3. Por lo tanto: |-8| + |3| = 8 + 3 = 11"
          },
          {
            id: 11,
            question: "Si a/b = 2/3 y b = 9, ¿cuál es el valor de a?",
            options: [
              "6",
              "12",
              "18",
              "27"
            ],
            correctAnswer: 0,
            explanation: "Si a/b = 2/3 y b = 9, entonces a/9 = 2/3. Multiplicando ambos lados por 9: a = (2/3) × 9 = 6"
          },
          {
            id: 12,
            question: "¿Cuál es el resultado de 3/4 - 1/3?",
            options: [
              "2/1",
              "5/12",
              "1/4",
              "7/12"
            ],
            correctAnswer: 1,
            explanation: "Común denominador 12: 3/4 = 9/12 y 1/3 = 4/12. Entonces: 9/12 - 4/12 = 5/12"
          },
          {
            id: 13,
            question: "En la recta numérica, ¿qué número está exactamente a la mitad entre -6 y 2?",
            options: [
              "-4",
              "-2",
              "0",
              "4"
            ],
            correctAnswer: 1,
            explanation: "El punto medio entre -6 y 2 es: (-6 + 2)/2 = -4/2 = -2"
          },
          {
            id: 14,
            question: "¿Cuál es el resultado de (-3)²?",
            options: [
              "-9",
              "9",
              "-6",
              "6"
            ],
            correctAnswer: 1,
            explanation: "(-3)² = (-3) × (-3) = 9. El cuadrado de un número negativo es siempre positivo."
          },
          {
            id: 15,
            question: "Si 2x = -10, ¿cuál es el valor de x?",
            options: [
              "-20",
              "-5",
              "5",
              "20"
            ],
            correctAnswer: 1,
            explanation: "Para resolver 2x = -10, dividimos ambos lados por 2: x = -10/2 = -5"
          }
        ]
      },
      {
        id: 'porcentaje',
        title: 'Porcentaje',
        description: [
          'Concepto y cálculo de porcentaje.',
          'Problemas que involucren porcentaje en diversos contextos.'
        ]
      },
      {
        id: 'potencias-raices',
        title: 'Potencias y raíces enésimas',
        description: [
          'Propiedades de las potencias de base racional y exponente racional.',
          'Descomposición y propiedades de las raíces enésimas en los números reales.',
          'Problemas que involucren potencias y raíces enésimas en los números reales en diversos contextos.'
        ]
      }
    ]
  },
  {
    id: 'algebra-funciones',
    title: 'ÁLGEBRA Y FUNCIONES',
    icon: Variable,
    color: 'bg-white border-l-4 border-gray-800',
    topics: [
      {
        id: 'expresiones-algebraicas',
        title: 'Expresiones algebraicas',
        description: [
          'Productos notables.',
          'Factorizaciones y desarrollo de expresiones algebraicas.',
          'Operatoria con expresiones algebraicas.',
          'Problemas que involucren expresiones algebraicas en diversos contextos.'
        ]
      },
      {
        id: 'proporcionalidad',
        title: 'Proporcionalidad',
        description: [
          'Concepto de proporción directa e inversa con sus diferentes representaciones.',
          'Problemas que involucren proporción directa e inversa en diversos contextos.'
        ]
      },
      {
        id: 'ecuaciones-inecuaciones',
        title: 'Ecuaciones e inecuaciones de primer grado',
        description: [
          'Resolución de ecuaciones lineales.',
          'Problemas que involucren ecuaciones lineales en diversos contextos.',
          'Resolución de inecuaciones lineales.',
          'Problemas que involucren inecuaciones lineales en diversos contextos.'
        ]
      },
      {
        id: 'sistemas-ecuaciones',
        title: 'Sistemas de ecuaciones lineales (2x2)',
        description: [
          'Resolución de sistemas de ecuaciones lineales.',
          'Problemas que involucren sistemas de ecuaciones lineales en diversos contextos.'
        ]
      },
      {
        id: 'funcion-lineal-afin',
        title: 'Función lineal y afín',
        description: [
          'Concepto de función lineal y función afín.',
          'Tablas y gráficos de función lineal y función afín.',
          'Problemas que involucren función lineal y función afín en diversos contextos.'
        ]
      },
      {
        id: 'funcion-cuadratica',
        title: 'Función cuadrática',
        description: [
          'Resolución y problemas de ecuaciones de segundo grado en diversos contextos.',
          'Tablas y gráficos de la función cuadrática, considerando la variación de sus parámetros.',
          'Puntos especiales de la gráfica de la función cuadrática: vértice, ceros de la función e intersección con los ejes.',
          'Problemas que involucren la función cuadrática en diversos contextos.'
        ]
      }
    ]
  },
  {
    id: 'geometria',
    title: 'GEOMETRÍA',
    icon: Triangle,
    color: 'bg-white border-l-4 border-red-500',
    topics: [
      {
        id: 'figuras-geometricas',
        title: 'Figuras geométricas',
        description: [
          'Problemas que involucren el Teorema de Pitágoras en diversos contextos.',
          'Perímetro y áreas de triángulos, paralelogramos, trapecios y círculos.',
          'Problemas que involucren perímetro y áreas de triángulos, paralelogramos, trapecios y círculos en diversos contextos.'
        ]
      },
      {
        id: 'cuerpos-geometricos',
        title: 'Cuerpos geométricos',
        description: [
          'Área de superficies de paralelepípedos, cubos y cilindros.',
          'Volumen de paralelepípedos, cubos y cilindros.',
          'Problemas que involucren área y volumen de paralelepípedos, cubos y cilindros en diversos contextos.'
        ]
      },
      {
        id: 'transformaciones-isometricas',
        title: 'Transformaciones isométricas',
        description: [
          'Puntos y vectores en el plano cartesiano.',
          'Rotación, traslación y reflexión de figuras geométricas.',
          'Problemas que involucren rotación, traslación y reflexión en diversos contextos.'
        ]
      },
      {
        id: 'semejanza-proporcionalidad',
        title: 'Semejanza y proporcionalidad de figuras',
        description: [
          'Aplicar propiedades de semejanza y de proporcionalidad a modelos a escala y otras situaciones de la vida diaria y otras asignaturas.'
        ]
      }
    ]
  },
  {
    id: 'probabilidad-estadistica',
    title: 'PROBABILIDAD Y ESTADÍSTICA',
    icon: BarChart3,
    color: 'bg-white border-l-4 border-gray-800',
    topics: [
      {
        id: 'representacion-datos',
        title: 'Representación de datos a través de tablas y gráficos',
        description: [
          'Tablas de frecuencia absoluta y relativa.',
          'Tipos de gráficos que permitan representar datos.',
          'Promedio de un conjunto de datos.',
          'Problemas que involucren tablas y gráficos en diversos contextos.'
        ]
      },
      {
        id: 'medidas-posicion',
        title: 'Medidas de posición',
        description: [
          'Cuartiles y percentiles de uno o más grupos de datos.',
          'Diagrama de cajón para representar distribución de datos.',
          'Problemas que involucren medidas de posición en diversos contextos.'
        ]
      },
      {
        id: 'reglas-probabilidades',
        title: 'Reglas de las probabilidades',
        description: [
          'Problemas que involucren probabilidad de un evento en diversos contextos.',
          'Problemas que involucren la regla aditiva y multiplicativa de probabilidades en diversos contextos.'
        ]
      }
    ]
  }
];

interface ModulePAESMathProps {
  onBack: () => void;
}

export default function ModulePAESMath({ onBack }: ModulePAESMathProps) {
  const [selectedAxis, setSelectedAxis] = useState<ThematicAxis | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState<Date | null>(null);

  const handleAxisClick = (axis: ThematicAxis) => {
    setSelectedAxis(axis);
    setSelectedTopic(null);
  };

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleBackToAxis = () => {
    setSelectedAxis(null);
    setSelectedTopic(null);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
    setShowQuiz(false);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStartTime(null);
  };

  const startQuiz = () => {
    setShowQuiz(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizStartTime(new Date());
  };

  const selectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (selectedTopic?.quiz && currentQuestion < selectedTopic.quiz.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    if (!selectedTopic?.quiz) return 0;
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer === selectedTopic.quiz![index].correctAnswer) {
        correct++;
      }
    });
    return Math.round((correct / selectedTopic.quiz.length) * 100);
  };

  const getTimeElapsed = () => {
    if (!quizStartTime) return "0:00";
    const now = new Date();
    const diff = Math.floor((now.getTime() - quizStartTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Vista del cuestionario
  if (showQuiz && selectedTopic?.quiz && selectedAxis) {
    const quiz = selectedTopic.quiz;
    const currentQ = quiz[currentQuestion];

    if (showResults) {
      const score = calculateScore();
      const correctAnswers = selectedAnswers.filter((answer, index) => answer === quiz[index].correctAnswer).length;

      return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-red-500"
            >
              <div className="flex items-center gap-4 mb-4">
                <button
                  onClick={handleBackToTopics}
                  className="flex items-center text-red-600 hover:text-red-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Volver a Temas
                </button>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Resultados del Cuestionario</h1>
                <p className="text-gray-600">{selectedTopic.title}</p>
              </div>
            </motion.div>

            {/* Results Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center border-l-4 border-red-500"
            >
              <div className="mb-6">
                <div className={`text-6xl font-bold mb-2 ${score >= 70 ? 'text-green-600' : score >= 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                  {score}%
                </div>
                <p className="text-xl text-gray-700 mb-2">
                  {correctAnswers} de {quiz.length} respuestas correctas
                </p>
                <p className="text-gray-600 flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4" />
                  Tiempo: {getTimeElapsed()}
                </p>
              </div>

              <div className="mb-6">
                {score >= 70 ? (
                  <div className="text-green-600">
                    <CheckCircle className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-lg font-semibold">¡Excelente trabajo!</p>
                    <p>Dominas bien este tema</p>
                  </div>
                ) : score >= 50 ? (
                  <div className="text-yellow-600">
                    <Target className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Buen intento</p>
                    <p>Puedes mejorar con más práctica</p>
                  </div>
                ) : (
                  <div className="text-red-600">
                    <XCircle className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-lg font-semibold">Necesitas repasar</p>
                    <p>Te recomendamos estudiar más este tema</p>
                  </div>
                )}
              </div>

              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => {
                    setShowQuiz(false);
                    setShowResults(false);
                    setCurrentQuestion(0);
                    setSelectedAnswers([]);
                  }}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Volver al Tema
                </button>
                <button
                  onClick={startQuiz}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Intentar de Nuevo
                </button>
              </div>
            </motion.div>

            {/* Detailed Results */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-800"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Revisión de Respuestas</h3>
              <div className="space-y-4">
                {quiz.map((question, index) => {
                  const userAnswer = selectedAnswers[index];
                  const isCorrect = userAnswer === question.correctAnswer;

                  return (
                    <div key={question.id} className="border rounded-lg p-4">
                      <div className="flex items-start gap-3 mb-2">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600 mt-1 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-gray-800 mb-2">
                            {index + 1}. {question.question}
                          </p>
                          <p className="text-sm text-gray-600 mb-1">
                            Tu respuesta: <span className={isCorrect ? 'text-green-600' : 'text-red-600'}>
                              {question.options[userAnswer]}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm text-gray-600 mb-2">
                              Respuesta correcta: <span className="text-green-600">
                                {question.options[question.correctAnswer]}
                              </span>
                            </p>
                          )}
                          <p className="text-sm text-gray-700 bg-gray-50 p-2 rounded">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-red-500"
          >
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={handleBackToTopics}
                className="flex items-center text-red-600 hover:text-red-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Salir del Cuestionario
              </button>
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {getTimeElapsed()}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Cuestionario PAES</h1>
              <p className="text-gray-600">{selectedTopic.title}</p>
              <div className="mt-2">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Pregunta {currentQuestion + 1} de {quiz.length}</span>
                  <span>{Math.round(((currentQuestion + 1) / quiz.length) * 100)}% completado</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestion + 1) / quiz.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Question */}
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-gray-800"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              {currentQ.question}
            </h3>

            <div className="space-y-3">
              {currentQ.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(index)}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all ${selectedAnswers[currentQuestion] === index
                      ? 'border-red-500 bg-red-50 text-red-800'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  <span className="font-medium mr-3">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {option}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500"
          >
            <div className="flex justify-between items-center">
              <button
                onClick={prevQuestion}
                disabled={currentQuestion === 0}
                className={`px-6 py-2 rounded-lg transition-colors ${currentQuestion === 0
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-600 hover:bg-gray-700 text-white'
                  }`}
              >
                Anterior
              </button>

              <div className="text-sm text-gray-600">
                {selectedAnswers[currentQuestion] !== undefined ? (
                  <span className="text-green-600">✓ Respondida</span>
                ) : (
                  <span>Selecciona una respuesta</span>
                )}
              </div>

              <button
                onClick={nextQuestion}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className={`px-6 py-2 rounded-lg transition-colors ${selectedAnswers[currentQuestion] === undefined
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : currentQuestion === quiz.length - 1
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
              >
                {currentQuestion === quiz.length - 1 ? 'Finalizar' : 'Siguiente'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Vista de estudio específico del tema
  if (selectedTopic && selectedAxis) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-red-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={handleBackToTopics}
                className="flex items-center text-red-600 hover:text-red-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a Temas
              </button>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{selectedTopic.title}</h1>
              <p className="text-gray-600">{selectedAxis.title}</p>
            </div>
          </motion.div>

          {/* Study Components */}
          <div className="grid gap-6">
            {/* Topic Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-800"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Contenidos del tema:</h3>
              <ul className="space-y-2">
                {selectedTopic.description.map((desc, index) => (
                  <li key={index} className="text-gray-700 flex items-start gap-2">
                    <span className="text-red-600 mt-1">•</span>
                    {desc}
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Study Tools */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Cuestionario */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-red-600" />
                  <h3 className="text-xl font-semibold text-gray-800">Cuestionario</h3>
                </div>
                <p className="text-gray-600 mb-4">
                  {selectedTopic.quiz ? `${selectedTopic.quiz.length} preguntas tipo PAES` : '15-20 preguntas tipo PAES sobre este tema'}
                </p>
                <button
                  onClick={startQuiz}
                  disabled={!selectedTopic.quiz}
                  className={`w-full py-2 px-4 rounded-lg transition-colors ${selectedTopic.quiz
                      ? 'bg-red-600 hover:bg-red-700 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
                >
                  {selectedTopic.quiz ? 'Comenzar Cuestionario' : 'Próximamente'}
                </button>
              </motion.div>

              {/* Flashcards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-gray-800 hover:shadow-xl transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-gray-800" />
                  <h3 className="text-xl font-semibold text-gray-800">Flashcards</h3>
                </div>
                <p className="text-gray-600 mb-4">12-15 tarjetas de conceptos clave</p>
                <button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg transition-colors">
                  Estudiar Flashcards
                </button>
              </motion.div>
            </div>

            {/* Note about AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-red-50 rounded-lg p-4 border-2 border-red-200"
            >
              <p className="text-gray-700 text-center">
                💡 <strong>Tip:</strong> Usa el Asistente IA desde la vista principal para resolver ejercicios específicos de este tema
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  // Vista de temas de un eje específico
  if (selectedAxis) {
    const AxisIcon = selectedAxis.icon;
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-red-500"
          >
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={handleBackToAxis}
                className="flex items-center text-red-600 hover:text-red-800 transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Volver a Ejes
              </button>
            </div>
            <div className="flex items-center gap-3">
              <AxisIcon className="w-8 h-8 text-red-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">{selectedAxis.title}</h1>
                <p className="text-gray-600">Selecciona un tema para estudiar</p>
              </div>
            </div>
          </motion.div>

          {/* Topics List */}
          <div className="grid gap-3">
            {selectedAxis.topics.map((topic, index) => (
              <motion.button
                key={topic.id}
                onClick={() => handleTopicClick(topic)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-white rounded-xl shadow-lg p-6 text-left transition-all group hover:shadow-xl border-l-4 border-red-500"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 group-hover:text-red-700 transition-colors text-lg mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2">
                      {topic.description[0]}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-red-600 group-hover:translate-x-1 transition-transform ml-4" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Vista principal con los 4 ejes temáticos
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-red-500"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center text-red-600 hover:text-red-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver al Hub
            </button>
          </div>
          <div className="mt-4">
            <h1 className="text-3xl font-bold text-gray-800">Matemáticas PAES M1</h1>
            <p className="text-gray-600">Selecciona un eje temático</p>
          </div>
        </motion.div>

        {/* 4 Main Axis Buttons - 2x2 Grid Compact */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {MATH_CURRICULUM.map((axis, index) => {
            const AxisIcon = axis.icon;
            return (
              <motion.button
                key={axis.id}
                onClick={() => handleAxisClick(axis)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${axis.color} rounded-lg shadow-lg p-4 text-center transition-all group hover:shadow-xl h-24 md:h-28 flex flex-col justify-center`}
              >
                <AxisIcon className="w-6 h-6 md:w-7 md:h-7 text-red-600 group-hover:scale-110 transition-transform mx-auto mb-1" />
                <h2 className="text-sm md:text-base font-bold text-gray-800 group-hover:text-red-700 transition-colors mb-1 leading-tight">
                  {axis.title}
                </h2>
                <p className="text-gray-600 text-xs">
                  {axis.topics.length} temas
                </p>
              </motion.button>
            );
          })}
        </div>

        {/* AI Assistant - Compact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-lg p-4 border-l-4 border-gray-800"
        >
          <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-gray-800" />
            Asistente IA
          </h3>

          <div className="grid grid-cols-3 gap-2">
            <button className="bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-400 rounded-lg p-3 transition-colors group">
              <Camera className="w-6 h-6 text-red-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-red-800 text-xs mb-1">Resolver</h4>
              <p className="text-gray-600 text-xs">Foto</p>
            </button>

            <button className="bg-gray-50 hover:bg-gray-100 border-2 border-gray-300 hover:border-gray-500 rounded-lg p-3 transition-colors group">
              <Lightbulb className="w-6 h-6 text-gray-700 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-800 text-xs mb-1">Explicar</h4>
              <p className="text-gray-600 text-xs">Concepto</p>
            </button>

            <button className="bg-red-50 hover:bg-red-100 border-2 border-red-200 hover:border-red-400 rounded-lg p-3 transition-colors group">
              <Zap className="w-6 h-6 text-red-600 mx-auto mb-1 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-red-800 text-xs mb-1">Generar</h4>
              <p className="text-gray-600 text-xs">Ejercicios</p>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}