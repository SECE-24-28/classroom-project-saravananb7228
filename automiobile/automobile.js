// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    
    // Burger Animation
    burger.classList.toggle('toggle');
});

// Simple Form Submission Logic
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! Our team will contact you shortly.');
    this.reset();
});

// Booking Form with Promises and Method Chaining
document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const carModel = document.getElementById('car-model').value;
    const pickupDate = document.getElementById('pickup-date').value;
    const resultDiv = document.getElementById('booking-result');

    resultDiv.textContent = 'Processing your booking...';

    // Use Automobile class with method chaining for booking
    const automobile = new Automobile();
    automobile.setModel(carModel).setDetails(name, email, pickupDate).book()
        .then(response => {
            resultDiv.textContent = `Booking successful! Confirmation: ${response.confirmationId}`;
            this.reset();
        })
        .catch(error => {
            resultDiv.textContent = `Booking failed: ${error.message}`;
        });
});

// Function to simulate booking API call using Promises
function bookCar(bookingData) {
    return new Promise((resolve, reject) => {
        // Simulate network delay
        setTimeout(() => {
            if (bookingData.name && bookingData.email && bookingData.carModel && bookingData.pickupDate) {
                // Simulate successful booking
                resolve({
                    confirmationId: 'BK' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                    message: 'Your car has been booked successfully!'
                });
            } else {
                // Simulate failure
                reject(new Error('Invalid booking data. Please fill all fields.'));
            }
        }, 2000); // 2 second delay
    });
}

// Automobile class with method chaining for booking operations
class Automobile {
    constructor() {
        this.bookingData = {};
    }

    setModel(model) {
        this.bookingData.carModel = model;
        return this;
    }

    setDetails(name, email, pickupDate) {
        this.bookingData.name = name;
        this.bookingData.email = email;
        this.bookingData.pickupDate = pickupDate;
        return this;
    }

    book() {
        return bookCar(this.bookingData);
    }
}

// Smooth Scrolling for Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});