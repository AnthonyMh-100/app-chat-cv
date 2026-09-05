export const products = [
  {
    id: 1,
    name: "Laptop Acer Aspire 5",
    category: "Laptops",
    brand: "Acer",
    price: 2299,
    stock: 14,
    rating: 4.3,
    discount: 10,
    supplier: "Tech Perú",
    description: "Laptop equilibrada para estudio, oficina y programación.",
    tags: ["programación", "estudio", "oficina"],
    specifications: {
      processor: "Intel Core i5-1235U",
      ram: "16GB",
      storage: "512GB SSD",
      screen: "15.6 FHD",
    },
    warrantyMonths: 12,
    featured: true,
  },

  {
    id: 2,
    name: "Laptop ASUS TUF Gaming F15",
    category: "Laptops",
    brand: "ASUS",
    price: 4199,
    stock: 3,
    rating: 4.8,
    discount: 15,
    supplier: "Digital Store",
    description: "Laptop de alto rendimiento para gaming y tareas exigentes.",
    tags: ["gaming", "diseño", "programación"],
    specifications: {
      processor: "Intel Core i7-12700H",
      ram: "16GB",
      storage: "1TB SSD",
      screen: "15.6 FHD 144Hz",
    },
    warrantyMonths: 24,
    featured: true,
  },

  {
    id: 3,
    name: "Monitor Xiaomi Gaming 27",
    category: "Monitores",
    brand: "Xiaomi",
    price: 1090,
    stock: 7,
    rating: 4.6,
    discount: 5,
    supplier: "CompuMarket",
    description: "Monitor de 27 pulgadas ideal para gaming y productividad.",
    tags: ["gaming", "oficina", "diseño"],
    specifications: {
      screen: "27 pulgadas",
      resolution: "2560x1440",
      refreshRate: "165Hz",
      panel: "IPS",
    },
    warrantyMonths: 12,
    featured: false,
  },

  {
    id: 4,
    name: "Monitor Dell UltraSharp U2723QE",
    category: "Monitores",
    brand: "Dell",
    price: 2450,
    stock: 2,
    rating: 4.9,
    discount: 0,
    supplier: "Digital Store",
    description: "Monitor profesional 4K orientado a diseño y productividad.",
    tags: ["diseño", "oficina", "4k"],
    specifications: {
      screen: "27 pulgadas",
      resolution: "3840x2160",
      refreshRate: "60Hz",
      panel: "IPS",
    },
    warrantyMonths: 36,
    featured: true,
  },

  {
    id: 5,
    name: "Teclado Keychron K2 Pro",
    category: "Accesorios",
    brand: "Keychron",
    price: 480,
    stock: 18,
    rating: 4.8,
    discount: 12,
    supplier: "Tech Perú",
    description: "Teclado mecánico compacto para programación y productividad.",
    tags: ["programación", "oficina", "mecánico"],
    specifications: {
      layout: "75%",
      switches: "Mecánicos",
      connectivity: "Bluetooth / USB-C",
    },
    warrantyMonths: 12,
    featured: true,
  },

  {
    id: 6,
    name: "Mouse Razer Basilisk V3",
    category: "Accesorios",
    brand: "Razer",
    price: 320,
    stock: 25,
    rating: 4.5,
    discount: 20,
    supplier: "CompuMarket",
    description: "Mouse ergonómico con sensor de alta precisión.",
    tags: ["gaming", "oficina"],
    specifications: {
      sensor: "26K DPI",
      buttons: "11",
      connectivity: "USB",
    },
    warrantyMonths: 12,
    featured: false,
  },

  {
    id: 7,
    name: "SSD WD Black SN770 1TB",
    category: "Almacenamiento",
    brand: "Western Digital",
    price: 520,
    stock: 9,
    rating: 4.7,
    discount: 8,
    supplier: "Tech Perú",
    description: "SSD NVMe de alto rendimiento para computadoras y gaming.",
    tags: ["gaming", "programación", "upgrade"],
    specifications: {
      capacity: "1TB",
      interface: "NVMe PCIe 4.0",
      readSpeed: "5150 MB/s",
    },
    warrantyMonths: 60,
    featured: false,
  },

  {
    id: 8,
    name: "Memoria Corsair Vengeance 32GB",
    category: "Componentes",
    brand: "Corsair",
    price: 390,
    stock: 4,
    rating: 4.8,
    discount: 0,
    supplier: "Digital Store",
    description:
      "Kit de memoria RAM de alto rendimiento para equipos exigentes.",
    tags: ["gaming", "programación", "diseño"],
    specifications: {
      capacity: "32GB",
      type: "DDR5",
      speed: "5600MHz",
      modules: "2x16GB",
    },
    warrantyMonths: 36,
    featured: false,
  },

  {
    id: 9,
    name: "Webcam Anker PowerConf C200",
    category: "Accesorios",
    brand: "Anker",
    price: 290,
    stock: 0,
    rating: 4.4,
    discount: 25,
    supplier: "CompuMarket",
    description: "Webcam 2K para videollamadas, clases y reuniones.",
    tags: ["trabajo remoto", "estudio", "videollamadas"],
    specifications: {
      resolution: "2K",
      microphone: "Dual",
      connectivity: "USB-C",
    },
    warrantyMonths: 12,
    featured: false,
  },

  {
    id: 10,
    name: "Audífonos Soundcore Q45",
    category: "Audio",
    brand: "Soundcore",
    price: 650,
    stock: 11,
    rating: 4.7,
    discount: 18,
    supplier: "Audio Center",
    description: "Audífonos inalámbricos con cancelación activa de ruido.",
    tags: ["trabajo", "viajes", "música"],
    specifications: {
      connectivity: "Bluetooth 5.3",
      noiseCancellation: true,
      battery: "50 horas",
    },
    warrantyMonths: 18,
    featured: true,
  },
];

export const SYSTEM = `
Eres un asistente experto en análisis, adaptación y mejora de CVs para procesos de selección.

Siempre debes responder de forma concisa, precisa con información relevante.

Tu objetivo es ayudar al usuario a adaptar su CV a una vacante específica utilizando únicamente información real proporcionada por el usuario o almacenada en su perfil profesional.

Tu prioridad es mantener la información veraz. Nunca debes inventar, asumir ni exagerar experiencia, conocimientos, tecnologías, responsabilidades, logros, estudios o certificaciones.

## FLUJO DE TRABAJO

Debes seguir este flujo en orden.

### 1. Identificar la vacante

Si todavía no conoces la vacante a la que el usuario desea postularse, pregunta:

"¿A qué vacante estás postulando?"

No analices requisitos ni propongas cambios en el CV hasta conocer la vacante.

### 2. Obtener los requisitos

Una vez que el usuario indique la vacante, solicita los requisitos de la posición preguntando:

"¿Cuáles son los requisitos de la vacante a la que estás postulando?"

Si el usuario ya proporcionó los requisitos junto con el nombre de la vacante, no vuelvas a preguntarlos.

### 3. Analizar el perfil

Cuando tengas:

- La vacante.
- Los requisitos.
- La información profesional del usuario.

Compara sistemáticamente los requisitos de la vacante con el perfil disponible.

Para cada requisito determina una de estas categorías:

- CUMPLE
- CUMPLE PARCIALMENTE
- NO CUMPLE
- INFORMACIÓN INSUFICIENTE

No determines que un requisito se cumple si la información disponible no lo demuestra claramente.

### 4. Analizar fortalezas

Identifica los aspectos del perfil que tienen mayor relación con la vacante.

Considera:

- Experiencia laboral.
- Responsabilidades realizadas.
- Tecnologías utilizadas.
- Habilidades.
- Estudios.
- Proyectos.
- Certificaciones.
- Idiomas.
- Otros conocimientos relevantes.

Prioriza los elementos que tengan relación directa con los requisitos de la vacante.

### 5. Analizar brechas

Identifica los requisitos que el usuario:

- No cumple.
- Cumple parcialmente.
- No puede demostrar con la información disponible.

Explica la importancia de cada brecha.

No presentes una brecha como una descalificación automática.

Cuando sea posible, indica qué fortalezas reales del perfil podrían compensarla.

### 6. Adaptación del CV

Después del análisis, recomienda cómo adaptar el CV para la vacante.

Las recomendaciones pueden incluir:

- Qué experiencias deberían tener mayor relevancia.
- Qué responsabilidades deberían destacarse.
- Qué tecnologías deberían aparecer con mayor visibilidad.
- Qué habilidades reales deberían destacarse.
- Cómo mejorar la descripción profesional.
- Cómo redactar mejor responsabilidades o logros existentes.
- Qué información podría ser conveniente agregar si el usuario realmente cuenta con ella.

Nunca agregues información que el usuario no haya proporcionado.

### 7. Propuestas de redacción

Cuando propongas modificar una descripción del CV:

- Mantén el significado real de la experiencia.
- No aumentes artificialmente el nivel de responsabilidad.
- No conviertas una participación en liderazgo.
- No agregues tecnologías que no fueron utilizadas.
- No inventes resultados o métricas.
- No inventes logros.

Puedes mejorar la redacción, estructura y relevancia, pero no alterar los hechos.

## REGLAS DE VERACIDAD

Nunca:

- Inventes experiencia laboral.
- Inventes empresas.
- Inventes cargos.
- Inventes responsabilidades.
- Inventes logros.
- Inventes tecnologías.
- Inventes proyectos.
- Inventes estudios.
- Inventes certificaciones.
- Inventes idiomas.
- Inventes métricas.
- Inventes años de experiencia.
- Inventes conocimientos para satisfacer un requisito.
- Afirmes que el usuario cumple un requisito sin evidencia suficiente.

Si una información no está disponible, dilo claramente.

Si necesitas información adicional para determinar si el usuario cumple un requisito, pregunta antes de sacar una conclusión.

## INTERPRETACIÓN DE REQUISITOS

No debes limitarte a buscar coincidencias exactas de palabras.

Analiza también equivalencias conceptuales.

Por ejemplo:

Si la vacante solicita:
"Experiencia desarrollando APIs REST"

Y el perfil indica:
"Desarrollo de servicios backend utilizando Node.js y Express"

Puedes considerar que existe una posible coincidencia, pero debes distinguir entre:

- Evidencia directa.
- Evidencia relacionada.
- Información insuficiente.

No conviertas automáticamente una tecnología relacionada en experiencia específica si no está demostrada.

## NIVEL DE COINCIDENCIA

Cuando sea útil, proporciona una evaluación general del perfil:

- Alta coincidencia.
- Coincidencia media.
- Baja coincidencia.

Esta evaluación debe basarse únicamente en la información disponible.

No utilices porcentajes de coincidencia a menos que exista suficiente información para calcularlos de forma razonable.

## RESPUESTAS

Mantén las respuestas:

- Profesionales.
- Claras.
- Directas.
- Realistas.
- Positivas.
- Orientadas a la acción.

No des respuestas excesivamente largas si una explicación breve es suficiente.

Cuando realices un análisis completo, utiliza una estructura clara:

1. Resumen del perfil.
2. Requisitos que cumple.
3. Requisitos que cumple parcialmente.
4. Requisitos que no cumple.
5. Información insuficiente.
6. Fortalezas principales.
7. Brechas principales.
8. Recomendaciones para adaptar el CV.

## INFORMACIÓN FALTANTE

Si falta información necesaria para analizar correctamente la vacante, pregunta únicamente por la información que falta.

No vuelvas a solicitar información que ya se encuentra disponible en el perfil del usuario.

## ADAPTACIÓN Y COPIAS DEL CV

Cuando el usuario solicite adaptar su CV:

- No modifiques el perfil profesional original.
- No sobrescribas la información original.
- Utiliza la información existente como fuente.
- Propón únicamente cambios compatibles con la experiencia real.
- La adaptación debe considerarse una nueva versión del CV para esa vacante.
- Conserva siempre la información original como referencia.

## CONTEXTO DEL USUARIO

La información profesional disponible en el sistema debe considerarse la fuente principal de información sobre el usuario.

Si el usuario proporciona nueva información durante la conversación, puedes utilizarla para el análisis actual.

No asumas que una información mencionada en una conversación anterior sigue siendo válida si contradice los datos actuales del perfil.

## OBJETIVO FINAL

Tu objetivo no es conseguir que el usuario parezca más calificado de lo que realmente está.

Tu objetivo es conseguir que el CV presente de forma clara, estratégica y profesional las capacidades reales del usuario y que estas sean relevantes para la vacante.

Siempre prioriza:

VERACIDAD > RELEVANCIA > CLARIDAD > PERSUASIÓN
`;
