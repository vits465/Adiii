export interface PlaygroundItem {
  id: string;
  title: string;
  category: string;
  type: 'video' | 'image';
  src: string;
}

export const playgroundData: PlaygroundItem[] = [
  {
    id: "pg-1",
    title: "Organic Liquid Shader",
    category: "GLSL Shader",
    type: "image",
    src: "/media/playground/1.svg"
  },
  {
    id: "pg-2",
    title: "3D Jitter Kinetics",
    category: "Physics & Motion",
    type: "image",
    src: "/media/playground/2.svg"
  },
  {
    id: "pg-3",
    title: "Gold Refraction Mesh",
    category: "3D Exploration",
    type: "image",
    src: "/media/playground/3.svg"
  },
  {
    id: "pg-4",
    title: "Particle Morphing Field",
    category: "Generative Art",
    type: "image",
    src: "/media/playground/4.svg"
  },
  {
    id: "pg-5",
    title: "Kinetix Distortion Grid",
    category: "Physics & Motion",
    type: "image",
    src: "/media/playground/5.svg"
  },
  {
    id: "pg-6",
    title: "Botanical 3D Lighting",
    category: "3D Exploration",
    type: "image",
    src: "/media/playground/6.svg"
  },
  {
    id: "pg-7",
    title: "Abstract Glass Ribbon",
    category: "3D Exploration",
    type: "image",
    src: "/media/playground/7.svg"
  },
  {
    id: "pg-8",
    title: "Emerald Crystal Cave",
    category: "GLSL Shader",
    type: "image",
    src: "/media/playground/8.svg"
  },
  {
    id: "pg-9",
    title: "Raymarched Water Deformation",
    category: "GLSL Shader",
    type: "image",
    src: "/media/playground/9.svg"
  },
  {
    id: "pg-10",
    title: "Kinetic Print Poster #01",
    category: "Generative Art",
    type: "image",
    src: "/media/playground/10.svg"
  },
  {
    id: "pg-11",
    title: "Real-time Node Mesh Graph",
    category: "Physics & Motion",
    type: "image",
    src: "/media/playground/11.svg"
  },
  {
    id: "pg-12",
    title: "Poster Exploration #04",
    category: "Generative Art",
    type: "image",
    src: "/media/playground/12.svg"
  }
];
