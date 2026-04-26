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
    color: 'from-blue-600/20 to-blue-800/20 border-blue-500/30',
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
    color: 'from-green-600/20 to-green-800/20 border-green-500/30',
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
    color: 'from-purple-600/20 to-purple-800/20 border-purple-500/30',
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
    color: 'from-orange-600/20 to-orange-800/20 border-orange-500/30',
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
              <p className="text-purple-200">{selectedAxis.title}</p>
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
                <p className="text-blue-100 mb-4">15-20 preguntas tipo PAES sobre este tema</p>
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
                <p className="text-green-100 mb-4">12-15 tarjetas de conceptos clave</p>
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

  // Vista de temas de un eje específico
  if (selectedAxis) {
    const AxisIcon = selectedAxis.icon;
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
              onClick={handleBackToAxis}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <div className="flex items-center gap-3">
              <AxisIcon className="w-8 h-8 text-purple-400" />
              <div>
                <h1 className="text-3xl font-bold text-white">{selectedAxis.title}</h1>
                <p className="text-purple-200">Selecciona un tema para estudiar</p>
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
                className={`bg-gradient-to-br ${selectedAxis.color} backdrop-blur-md rounded-xl p-6 text-left transition-all group hover:border-opacity-70`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors text-lg mb-2">
                      {topic.title}
                    </h3>
                    <p className="text-purple-200 text-sm line-clamp-2">
                      {topic.description[0]}
                    </p>
                  </div>
                  <ChevronRight className="w-6 h-6 text-purple-400 group-hover:translate-x-1 transition-transform ml-4" />
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
            <p className="text-purple-200">Selecciona un eje temático</p>
          </div>
        </motion.div>

        {/* 4 Main Axis Buttons - 2x2 Grid */}
        <div className="grid grid-cols-2 gap-4">
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
                className={`bg-gradient-to-br ${axis.color} backdrop-blur-md rounded-xl p-6 text-center transition-all group hover:border-opacity-70 aspect-square flex flex-col justify-center`}
              >
                <AxisIcon className="w-10 h-10 md:w-12 md:h-12 text-white group-hover:scale-110 transition-transform mx-auto mb-3" />
                <h2 className="text-lg md:text-xl font-bold text-white group-hover:text-purple-300 transition-colors mb-2">
                  {axis.title}
                </h2>
                <p className="text-purple-200 text-xs md:text-sm mb-2">
                  {axis.topics.length} temas
                </p>
                <ChevronRight className="w-5 h-5 text-purple-400 group-hover:translate-x-1 transition-transform mx-auto" />
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
}