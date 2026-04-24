// Configuración para integración con OpenAI
// Asegúrate de tener tu API key en las variables de entorno

const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

interface AIRequest {
  prompt: string;
  type: string;
  context?: string;
}

interface AIResponse {
  response: string;
  success: boolean;
  error?: string;
}

export async function callOpenAI(request: AIRequest): Promise<AIResponse> {
  if (!OPENAI_API_KEY) {
    return {
      success: false,
      response: '',
      error: 'API Key de OpenAI no configurada. Agrega VITE_OPENAI_API_KEY a tu archivo .env'
    };
  }

  try {
    const systemPrompts = {
      'Resolver Duda': `Eres un tutor educativo especializado en resolver dudas académicas. 
        Proporciona explicaciones claras, paso a paso, y ejemplos prácticos. 
        Usa un lenguaje apropiado para estudiantes de educación media y superior.`,
      
      'Explicar Concepto': `Eres un profesor experto en explicar conceptos complejos de manera simple. 
        Usa analogías, ejemplos cotidianos y estructura tu respuesta de forma didáctica.
        Incluye definiciones, ejemplos y conexiones con otros temas.`,
      
      'Generar Resumen': `Eres un asistente que crea resúmenes educativos efectivos. 
        Identifica los puntos clave, organiza la información jerárquicamente y 
        destaca lo más importante para el aprendizaje.`,
      
      'Ayuda con Matemáticas': `Eres un tutor de matemáticas que explica problemas paso a paso. 
        Muestra el proceso completo, explica cada paso y proporciona métodos alternativos cuando sea posible.`,
      
      'Traducir/Idiomas': `Eres un profesor de idiomas que ayuda con traducciones y gramática. 
        Proporciona contexto cultural, explica diferencias regionales y da ejemplos de uso.`
    };

    const systemPrompt = systemPrompts[request.type as keyof typeof systemPrompts] || 
      'Eres un asistente educativo que ayuda a estudiantes con sus consultas académicas.';

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: request.prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Error de OpenAI: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      response: data.choices[0]?.message?.content || 'No se pudo generar una respuesta.'
    };

  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return {
      success: false,
      response: '',
      error: error instanceof Error ? error.message : 'Error desconocido'
    };
  }
}

// Función para generar respuestas simuladas cuando no hay API key
export function generateMockAIResponse(prompt: string, type: string): string {
  const responses = {
    'Resolver Duda': `📚 **Análisis de tu consulta**: "${prompt}"

**Enfoque sugerido:**
1. **Identifica** los conceptos clave en tu pregunta
2. **Descompón** el problema en partes más pequeñas  
3. **Aplica** los métodos o fórmulas relevantes
4. **Verifica** tu resultado con ejemplos similares

**Próximos pasos:**
• Revisa los fundamentos teóricos relacionados
• Practica con ejercicios similares
• Consulta fuentes adicionales si es necesario

¿Te gustaría que profundice en algún aspecto específico?`,

    'Explicar Concepto': `🎓 **Explicación del concepto**: "${prompt}"

**Definición clara:**
Este concepto se refiere a [explicación fundamental adaptada al nivel educativo]

**Ejemplo práctico:**
Imagina que [analogía o ejemplo cotidiano que facilite la comprensión]

**Puntos importantes:**
• **Características principales**: [aspectos esenciales]
• **Aplicaciones**: [dónde y cómo se usa]
• **Relación con otros temas**: [conexiones importantes]

**Para recordar:**
[Tip o regla mnemotécnica útil]`,

    'Generar Resumen': `📋 **Resumen estructurado**: "${prompt}"

**🔑 Ideas principales:**
• Concepto central y su importancia
• Elementos o componentes clave
• Relaciones y procesos fundamentales

**📖 Puntos de estudio:**
• Definiciones esenciales que debes memorizar
• Fórmulas o procedimientos importantes
• Ejemplos tipo que debes dominar

**⚠️ Errores comunes:**
• [Confusiones típicas que debes evitar]
• [Conceptos que suelen mezclarse]

**✅ Autoevaluación:**
¿Puedes explicar este tema con tus propias palabras?`,

    'Ayuda con Matemáticas': `🔢 **Solución matemática**: "${prompt}"

**📐 Estrategia de resolución:**
1. **Tipo de problema**: [Clasificación del ejercicio]
2. **Datos conocidos**: [Lo que tenemos]
3. **Incógnita**: [Lo que buscamos]
4. **Método**: [Técnica o fórmula a usar]

**👣 Pasos de solución:**
• Paso 1: [Primera operación o transformación]
• Paso 2: [Desarrollo intermedio]
• Paso 3: [Resultado final]

**🔍 Verificación:**
[Método para comprobar que el resultado es correcto]

¿Quieres que resuelva un ejemplo similar paso a paso?`,

    'Traducir/Idiomas': `🌍 **Asistencia lingüística**: "${prompt}"

**📝 Análisis del texto:**
• **Traducción literal**: [Significado directo]
• **Contexto cultural**: [Matices importantes]
• **Registro**: [Formal/informal/técnico]

**🗣️ Uso en contexto:**
• **Situaciones apropiadas**: [Cuándo usar esta expresión]
• **Variantes regionales**: [Diferencias por país/región]
• **Expresiones relacionadas**: [Frases similares]

**📚 Para practicar:**
• Crea oraciones usando esta estructura
• Busca ejemplos en textos auténticos
• Practica la pronunciación si es oral

¿Necesitas ayuda con la gramática o pronunciación?`
  };

  return responses[type as keyof typeof responses] || 
    `🤖 **Respuesta IA**: He analizado tu consulta "${prompt}". Aquí tienes información relevante y sugerencias para continuar tu aprendizaje. ¿En qué más puedo ayudarte?`;
}