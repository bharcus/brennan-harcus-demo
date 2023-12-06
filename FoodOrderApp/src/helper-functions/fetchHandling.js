export async function fetchMeals() {
  try {
    const fetchedMealsResponse = await fetch("http://localhost:3000/meals");

    const fetchedMeals = await fetchedMealsResponse.json();
    if (!fetchedMealsResponse.ok) {
      throw Error("Fetch failed to collect meal information.");
    }

    return fetchedMeals;
  } catch (error) {
    return {
      okStatus: false,
      message: error.message
    }
  }
}

export async function sendCheckout(cartItems, formDataObject) {
  try {
    const order = {
      items: cartItems,
      customer: formDataObject,
    };
    const orderResponse = await fetch("http://localhost:3000/orders", {
      method: "POST",
      body: JSON.stringify({ order }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await orderResponse.json();

    if (!orderResponse.ok) {
      throw Error(resposnse);
    }

    return {
      okStatus: true,
      message: response.message,
    };
  } catch (error) {
    return {
      okStatus: false,
      message: error.message,
    };
  }
}
