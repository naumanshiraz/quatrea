export type Perfume = {
  id: string;
  s: string;
  n: string;
  bg: string;
  ink: string;
  ac: string;
  price: number;
  tag: string;
  story: string;
  top: string[];
  heart: string[];
  base: string[];
  img: string;
};

export const perfumes: Perfume[] = [
  { id: "fleur", s: "Spring", n: "Fleur de Matin", bg: "#f7e3e1", ink: "#4a2b34", ac: "#e0909f", price: 185, img: "/images/fleur.jpg", tag: "A garden at first light, still wet with dew.", story: "Fleur de Matin was composed at dawn in a walled garden, when peonies open and the air is cool and green. It smells of petals crushed between fingers and a window left open.", top: ["Green pear", "Pink pepper"], heart: ["Peony", "Lily of the valley", "Freesia"], base: ["White musk", "Blond cedar"] },
  { id: "soleil", s: "Summer", n: "Soleil d’Or", bg: "#f8eccb", ink: "#17384f", ac: "#d6a22e", price: 195, img: "/images/soleil.jpg", tag: "Golden afternoons and salt on warm skin.", story: "Soleil d’Or captures the hour when the sea turns to hammered gold. Bergamot and neroli brighten a sun-warmed driftwood base.", top: ["Bergamot", "Mandarin", "Sea salt"], heart: ["Neroli", "Orange blossom"], base: ["Driftwood", "Golden amber"] },
  { id: "ambre", s: "Autumn", n: "Ambre Sauvage", bg: "#3b2214", ink: "#f6dfc2", ac: "#e08a2e", price: 215, img: "/images/ambre.jpg", tag: "Fallen leaves, sandalwood and a fire in the hearth.", story: "Ambre Sauvage walks a forest path after rain. Dark amber and creamy sandalwood glow beneath notes of cinnamon bark and dry leaves.", top: ["Cardamom", "Cinnamon bark"], heart: ["Labdanum", "Dried leaves", "Cedar"], base: ["Sandalwood", "Dark amber", "Tonka"] },
  { id: "nuit", s: "Winter", n: "Nuit Blanche", bg: "#0e1a35", ink: "#e6edf8", ac: "#aebfdc", price: 225, img: "/images/nuit.jpg", tag: "Cold air, soft vanilla and snow under starlight.", story: "Nuit Blanche is the silence of a snowfall at midnight. Frosted juniper opens to velvet vanilla and a veil of white musk.", top: ["Juniper", "Frosted air"], heart: ["Iris", "Vanilla orchid"], base: ["Vanilla", "White musk", "Ambergris"] },
];

export const sizes = [30, 50, 100];
export const sizeFactor: Record<number, number> = { 30: 0.65, 50: 1, 100: 1.75 };
export const money = (n: number) => "$" + Math.round(n).toLocaleString("en-US");
export const bySlug = (id: string) => perfumes.find((p) => p.id === id);
export const darkTheme = { bg: "#14101a", ink: "#f3ebe3", ac: "#d9b48f" };
