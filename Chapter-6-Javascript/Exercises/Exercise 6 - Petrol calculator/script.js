// Waits for the DOM to be fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Gets references to the HTML elements we need
    const costPerLiterInput = document.getElementById('cost-per-liter');
    const litersPurchasedInput = document.getElementById('liters-purchased');
    const calculateButton = document.getElementById('calculate-btn');
    const totalCostElement = document.getElementById('total-cost');
    
    // Adds click event listener to the calculate button
    calculateButton.addEventListener('click', calculateTotal);
    
    // Also calculates when user presses Enter in either input field
    costPerLiterInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateTotal();
        }
    });
    
    litersPurchasedInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateTotal();
        }
    });
    
    // Function to calculate the total cost of petrol
    function calculateTotal() {
        // Gets values from input fields and convert to numbers
        const costPerLiter = parseFloat(costPerLiterInput.value);
        const litersPurchased = parseFloat(litersPurchasedInput.value);
        
        // Checks if inputs are valid numbers
        if (isNaN(costPerLiter) || isNaN(litersPurchased)) {
            totalCostElement.textContent = 'Please enter valid numbers';
            return;
        }
        
        // Calculates the total cost
        const totalCost = costPerLiter * litersPurchased;
        
        // Formats the total cost to 2 decimal places and display it
        totalCostElement.textContent = `Total: £${totalCost.toFixed(2)}`;
        
        // Adds a subtle animation to the result
        totalCostElement.style.opacity = '0';
        setTimeout(() => {
            totalCostElement.style.opacity = '1';
            totalCostElement.style.transition = 'opacity 0.5s ease';
        }, 50);
    }
});