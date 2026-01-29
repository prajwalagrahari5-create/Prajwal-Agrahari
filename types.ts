
export enum AppView {
  DASHBOARD = 'DASHBOARD',
  WORKOUT_PLANNER = 'WORKOUT_PLANNER',
  MEAL_PLANNER = 'MEAL_PLANNER',
  LIVE_COACH = 'LIVE_COACH',
  PROGRESS = 'PROGRESS',
  AI_BOT = 'AI_BOT'
}

export interface WorkoutPlan {
  title: string;
  duration: string;
  difficulty: string;
  exercises: {
    name: string;
    sets: string;
    reps: string;
    instruction: string;
  }[];
}

export interface MealPlan {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string[];
  totalCalories: number;
  macronutrients: {
    protein: string;
    carbs: string;
    fats: string;
  };
}

export interface UserStats {
  weight: number[];
  dates: string[];
  caloriesBurned: number[];
}
