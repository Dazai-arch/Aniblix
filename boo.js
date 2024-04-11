function handleButtonClick(button) {
    // Remove the 'selected' class from all buttons
    document.querySelectorAll('.db1').forEach(btn => {
        btn.classList.remove('selected');
    });
  
    // Add the 'selected' class to the clicked button
    button.classList.add('selected');
}
document.addEventListener('DOMContentLoaded', function () {
    var selectedMovie = localStorage.getItem('selectedMovie');
    if (selectedMovie) {
        document.querySelector('.movie_name').innerText = selectedMovie;
    }
});