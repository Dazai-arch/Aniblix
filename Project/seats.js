const headerImg = document.querySelector('.booking-header__img');
        const headerTitle = document.querySelector('.booking-header__title');
        const seatsContainer = document.querySelector('.seating');
        const seats = document.querySelectorAll('.row .seat');
        const ticketTotal = document.querySelector('.booking-header__total');
        const paymentTotalBtn = document.querySelector('.payment-btn');

        const loadSeats = () => {
            const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

            if (selectedSeats !== null) {
                seats.forEach((seat, index) => {
                    if (selectedSeats.indexOf(index) > -1) {
                        seat.classList.add('seat-selected');
                    };
                });
            };
        };

        const updateTotal = () => {
            // Get all selected seats
            const selectedSeats = document.querySelectorAll('.row .seat-selected');

            // Update Total Tickets
            ticketTotal.innerHTML = `${selectedSeats.length} Tickets`;

            // Update Price
            paymentTotalBtn.innerHTML = `Pay ₹${(190 * selectedSeats.length).toFixed(2)}`;

            // Save selected seats to local storage
            // This is creating an array that contains the index of each selected seat
            const selectedSeatsIndex = [...selectedSeats].map(seat => {
                return [...seats].indexOf(seat);
            });

            localStorage.setItem('selectedSeats', JSON.stringify(selectedSeatsIndex));
        };

        // Toggle seat selection
        seatsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('seat') && !e.target.classList.contains('seat-booked')) {
                e.target.classList.toggle('seat-selected');
                updateTotal();
            };
        });

        // Function to reset selected seats to available state
        const resetSelectedSeats = () => {
            const selectedSeats = document.querySelectorAll('.row .seat-selected');
            selectedSeats.forEach(seat => {
                seat.classList.remove('seat-selected');
            });
            updateTotal(); // Update total after resetting seats
        };

        //Redirect to confirmation page after seat selection
        paymentTotalBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const selectedSeats = document.querySelectorAll('.row .seat-selected');
          if (selectedSeats.length > 0) {
              // Set a timeout to reset selected seats after 5 seconds
              setTimeout(() => {
                  resetSelectedSeats();
                  // Redirect after 1 seconds
                  window.location = 'confirmation.html';
              }, 500);
          } else {
              alert('Please make a seat selection.');
          }
      });
        // Load seats from local storage (if any)
        loadSeats();

        // Update total prices and ticket count
        updateTotal();

        // Function to handle booking confirmation
        // Function to handle booking confirmation
        document.getElementById('paymentButton').addEventListener('click', async function() {
          console.log('Payment button clicked');
          const userEmail = localStorage.getItem('userEmail');
          if (!userEmail) {
             window.location.href= "login.html";
             return;
          }
         
          const selectedSeatsElements = document.querySelectorAll('.row .seat-selected');
          const selectedSeats = Array.from(selectedSeatsElements).map(seat => seat.querySelector('.seat-number').innerText);
         
          const movieDetails = {
             movie_id: '200000',
             movieName: 'Demon Slayer: Kimetsu no Yaiba:',
             movieSubtitle: 'To the Hashira Training'
          };
         
          try {
             const response = await fetch('http://localhost:3000/confirm-booking', {
               method: 'POST',
               headers: {
                 'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                 email: userEmail,
                 selectedSeats: selectedSeats,
                 movieDetails: movieDetails
               })
             });
         
             if (response.ok) {
               console.log('Booking confirmed successfully.');
               // Reset selected seats after 5 seconds
               setTimeout(() => {
                 resetSelectedSeats();
               }, 5000);
               localStorage.clear();
             } else {
               console.error('Error confirming booking:', response.statusText);
             }
          } catch (error) {
             console.error('Error confirming booking:', error);
          }
         });
         
         