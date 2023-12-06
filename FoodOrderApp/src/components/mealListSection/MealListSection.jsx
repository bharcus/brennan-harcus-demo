import MealItem from "./MealItem";
import { useEffect, useState } from "react";
import { fetchMeals } from "../../helper-functions/fetchHandling";

export default function MealListSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [mealList, setMealList] = useState([]);

  useEffect(() => {
    async function handleFetchMeals() {
      setIsLoading(true);
      try {
        const meals = await fetchMeals();
        setMealList(meals);
        setIsLoading(false);
      } catch (error) {
        console.log("MealListSelection Error:", error.message);
      }
    }
    handleFetchMeals();
  }, [setIsLoading, setMealList]);
  return (
    <>
    <main>
      <section>
        <ul id="meals">
          {!isLoading && mealList.length > 0 ? (
            mealList.map((meal) => (
              <MealItem
                key={meal.id}
                meal={meal}
              />
            ))

          ) : (
            <p>Failed to load meal items.</p>
          )}
        </ul>
      </section>
    </main>
    </>
  );
}
