import CartContextProvider from "./store/cart-context";
import Header from "./components/header/Header";
import MealListSection from "./components/mealListSection/MealListSection";

function App() {

  return (
    <CartContextProvider>
      <Header />
      <MealListSection />
    </CartContextProvider>
  );
}

export default App;
