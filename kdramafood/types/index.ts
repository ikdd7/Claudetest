export interface Ingredient {
  name: string;
  amount: string;
  amazonSearchTerm: string;
  substituteNote?: string;
}

export interface RecipeStep {
  number: number;
  title: string;
  description: string;
  duration?: string;
}

export interface Recipe {
  slug: string;
  foodName: string;
  foodNameKorean: string;
  description: string;
  image: string;
  dramaSlug: string;
  dramaName: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  cookTime: number;
  prepTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  dramaContext: string;
  funFact: string;
  episode?: string;
}

export interface Drama {
  slug: string;
  title: string;
  year: number;
  genre: string[];
  description: string;
  image: string;
  episodes: number;
  rating: number;
  recipes: Recipe[];
}

export interface GenerateRecipeRequest {
  dramaName: string;
  sceneDescription: string;
  foodName?: string;
}

export interface GenerateRecipeResponse {
  foodName: string;
  foodNameKorean: string;
  description: string;
  ingredients: Ingredient[];
  steps: RecipeStep[];
  cookTime: number;
  prepTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  dramaContext: string;
  funFact: string;
}
