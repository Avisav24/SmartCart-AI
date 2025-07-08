// utils/recommendation.js
function recommendProducts(userHistory, cart, productDB) {
  const recommendations = [];

  const purchased = new Set(userHistory);
  const inCart = new Set(cart);

  for (let product of productDB) {
    if (purchased.has(product.name) && !inCart.has(product.name)) {
      recommendations.push({
        name: product.name,
        reason: "You've bought this before"
      });
    }

    if (!purchased.has(product.name) && !inCart.has(product.name)) {
      const categoryMatch = cart.some(item => {
        const matched = productDB.find(p => p.name === item);
        return matched && matched.category === product.category;
      });

      if (categoryMatch) {
        recommendations.push({
          name: product.name,
          reason: `Matches category: ${product.category}`
        });
      }
    }
  }

  return recommendations;
}

module.exports = recommendProducts;
