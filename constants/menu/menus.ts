import {
  IoDocumentTextOutline,
  IoGridOutline,
  IoSettingsOutline,
  IoSparklesOutline,
} from "react-icons/io5";

export const MENUS = [
  {
    title: "Espacio de trabajo",
    items: [
      {
        label: "Mi CV",
        href: "/cv",
        icon: IoDocumentTextOutline,
      },
    ],
  },
  {
    title: "Herramientas",
    items: [
      {
        label: "Asistente IA",
        href: "/assistant",
        icon: IoSparklesOutline,
      },
    ],
  },
  {
    title: "Cuenta",
    items: [
      {
        label: "Configuración",
        href: "/settings",
        icon: IoSettingsOutline,
      },
    ],
  },
];
