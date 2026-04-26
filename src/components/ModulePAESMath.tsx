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
  Target
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string[];
}

interface ThematicAxis {
  id: string;
  title: string;
  topics: Topic[];
}

const MATH_CURRICULUM: ThematicAxis[] = [
  {
    id: 'numeros',
    title: 'NÚMEROS',
    topics: [
      {
        id: 'enteros-racionales',
        title: 'Conjunto de los números enteros y racionales',
        description: [
          'Operaciones y orden en el conjunto de los números enteros.',
          'Operaciones y comparación entre números en el conjunto de los números racionales.',
          'Problemas que involucren el conjunto de los números enteros y racionales en diversos contextos.'
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
          'Tablas y gráficos de función lineal y función afín. Problemas que involucren función lineal y función afín en diversos contextos.'
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
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);

  const handleTopicClick = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  if (selectedTopic) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-4 mb-6"
          >
            <button
              onClick={handleBackToTopics}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-white">{selectedTopic.title}</h1>
              <p className="text-purple-200">Estudio específico del tema</p>
            </div>
          </motion.div>

          {/* Study Components */}
          <div className="grid gap-6">
            {/* Topic Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Contenidos del tema:</h3>
              <ul className="space-y-2">
                {selectedTopic.description.map((desc, index) => (
                  <li key={index} className="text-purple-100 flex items-start gap-2">
                    <span className="text-purple-400 mt-1">•</span>
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
                className="bg-gradient-to-br from-blue-600/20 to-blue-800/20 backdrop-blur-md rounded-xl p-6 border border-blue-500/30 hover:border-blue-400/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen className="w-8 h-8 text-blue-400" />
                  <h3 className="text-xl font-semibold text-white">Cuestionario</h3>
                </div>
                <p className="text-blue-100 mb-4">Practica con preguntas tipo PAES sobre este tema</p>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Comenzar Cuestionario
                </button>
              </motion.div>

              {/* Flashcards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-green-600/20 to-green-800/20 backdrop-blur-md rounded-xl p-6 border border-green-500/30 hover:border-green-400/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-green-400" />
                  <h3 className="text-xl font-semibold text-white">Flashcards</h3>
                </div>
                <p className="text-green-100 mb-4">Repasa conceptos clave con tarjetas de estudio</p>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Estudiar Flashcards
                </button>
              </motion.div>
            </div>

            {/* AI Assistant Tools */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-md rounded-xl p-6 border border-purple-500/30"
            >
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-400" />
                Asistente IA Especializado
              </h3>
              
              <div className="grid md:grid-cols-3 gap-4">
                <button className="bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 rounded-lg p-4 transition-colors group">
                  <Camera className="w-8 h-8 text-purple-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-white mb-1">Resolver con Foto</h4>
                  <p className="text-purple-200 text-sm">Toma foto del ejercicio y obtén la solución paso a paso</p>
                </button>

                <button className="bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 rounded-lg p-4 transition-colors group">
                  <Lightbulb className="w-8 h-8 text-yellow-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-white mb-1">Explicar Concepto</h4>
                  <p className="text-purple-200 text-sm">Pregunta sobre cualquier duda específica del tema</p>
                </button>

                <button className="bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/50 rounded-lg p-4 transition-colors group">
                  <Zap className="w-8 h-8 text-orange-300 mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <h4 className="font-semibold text-white mb-1">Generar Ejercicios</h4>
                  <p className="text-purple-200 text-sm">Crea ejercicios adicionales para practicar más</p>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <button
            onClick={onBack}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-white">Matemáticas PAES M1</h1>
            <p className="text-purple-200">Temario oficial completo</p>
          </div>
        </motion.div>

        {/* Curriculum */}
        <div className="space-y-6">
          {MATH_CURRICULUM.map((axis, axisIndex) => (
            <motion.div
              key={axis.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: axisIndex * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                <Calculator className="w-8 h-8 text-purple-400" />
                {axis.title}
              </h2>
              
              <div className="grid gap-3">
                {axis.topics.map((topic) => (
                  <motion.button
                    key={topic.id}
                    onClick={() => handleTopicClick(topic)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/50 rounded-lg p-4 text-left transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-purple-200 text-sm mt-1 line-clamp-2">
                          {topic.description[0]}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}