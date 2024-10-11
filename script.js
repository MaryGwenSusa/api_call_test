// Your NASA API Key (replace with your actual API key)
const apiKey = 'DEMO_KEY'; // Get your API key from https://api.nasa.gov/

// Event listener for button click
document.getElementById('fetch-apod').addEventListener('click', () => {
    const dateInput = document.getElementById('date').value;

    if (dateInput) {
        fetchAPOD(dateInput);
    } else {
        alert('Please enter a valid date.');
    }
});

// Function to fetch APOD data for the given date
function fetchAPOD(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          // Display the APOD image inside the plasma ball
          const apodImage = document.getElementById('apod-image');
          apodImage.src = data.url;
          apodImage.alt = data.title;
          apodImage.style.display = 'block';

          // Show the description container when data is loaded
          const descriptionContainer = document.getElementById('apod-description');
          descriptionContainer.classList.add('visible'); // Make container visible

          // Display additional APOD data
          document.getElementById('title').textContent = data.title;
          document.getElementById('explanation').textContent = data.explanation;
          document.getElementById('date-text').textContent = `Date: ${data.date}`;

          // Optional copyright information
          if (data.copyright) {
              document.getElementById('copyright').textContent = `Copyright: ${data.copyright}`;
          } else {
              document.getElementById('copyright').textContent = 'Public Domain Image';
          }
      })
      .catch(error => {
          console.error('Error fetching APOD data:', error);
          alert('Error fetching the Astronomy Picture of the Day.');
      });
}
