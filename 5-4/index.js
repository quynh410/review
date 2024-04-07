document.addEventListener("DOMContentLoaded", function () {
    const ratingCells = document.querySelectorAll('.num td');
    let selectedRating = '';
  
    ratingCells.forEach(cell => {
      cell.addEventListener('click', function () {
        ratingCells.forEach(cell => {
          cell.style.backgroundColor = 'aliceblue';
        });
  
        this.style.backgroundColor = 'orange';
        selectedRating = this.textContent;
  
        const inputField = document.querySelector('.search');
        inputField.value = selectedRating;
      });
    });
  
    const feedbackList = document.querySelector('.tb');
  
    const storedFeedbacks = localStorage.getItem('feedbacks');
    if (storedFeedbacks) {
      feedbackList.innerHTML = storedFeedbacks;
    }
  
    function addFeedback(event) {
      const inputField = document.querySelector('.search');
      const feedback = inputField.value.trim();
  
      if (feedback !== '' && selectedRating !== '') {
        const feedbackItem = document.createElement('li');
        feedbackItem.innerHTML = `
          <div class="feedBack">
            ${selectedRating} <br> ${feedback}
          <button onclick="editFeedback(e)">Sửa</button>
          <button onclick="deleteFeedback(e)">Xóa</button>
            
          </div>
        `;
        feedbackList.appendChild(feedbackItem);
  
        inputField.value = '';
        ratingCells.forEach(cell => {
          cell.style.backgroundColor = 'aliceblue';
        });
  
        selectedRating = '';
  
        localStorage.setItem('feedbacks', feedbackList.innerHTML);
      }
    }
    function editFeedback(event) {
      const feedbackItem = event.target.parentNode;
      const ratingElement = feedbackItem.querySelector('.rating');
      const textElement = feedbackItem.querySelector('.text');
      const newRating = prompt('Enter new rating:', ratingElement.textContent);
      const newText = prompt('Enter new text:', textElement.textContent);
  
      if (newRating !== null && newText !== null) {
        ratingElement.textContent = newRating;
        textElement.textContent = newText;
  
        const index = Array.from(feedbackList.children).indexOf(feedbackItem);
        feedbacks[index].rating = newRating;
        feedbacks[index].text = newText;
        localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
      }
    }
  
    function deleteFeedback(event) {
      const feedbackItem = event.target.parentNode;
      feedbackItem.remove();
  
      const index = Array.from(feedbackList.children).indexOf(feedbackItem);
      feedbacks.splice(index, 1);
  
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    }
  
    const addButton = document.querySelector('.add');
    addButton.addEventListener('click', addFeedback);

  });