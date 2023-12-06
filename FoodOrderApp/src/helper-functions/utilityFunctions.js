export function priceConverter(stringPrice) {
    const parsedPrice = parseFloat(stringPrice);
    const finalPrice = +parsedPrice.toFixed(2);
    return finalPrice;
  }
