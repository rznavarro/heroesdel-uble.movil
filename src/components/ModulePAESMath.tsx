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
  BarChart3
} from 'lucide-react';

interface Topic {
  id: string;
  title: string;
  description: string[];
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
  };

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
                <p className="text-gray-600 mb-4">15-20 preguntas tipo PAES sobre este tema</p>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors">
                  Comenzar Cuestionario
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