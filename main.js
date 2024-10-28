// main.js

let questions = {};

// Load questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
  })
  .catch(error => {
    console.error('Error loading questions:', error);
    alert('Error loading questions: ' + error.message);
  });

for (let i = 1; i <= 6; i++) {
  const sessionDiv = document.createElement('div');
  sessionDiv.classList.add('session');
  sessionDiv.innerHTML = `<label for="sesion${i}">Sesión ${i}</label><input type="number" id="sesion${i}" min="1" placeholder="Número de preguntas">`;
  document.getElementById('sessions').appendChild(sessionDiv);
}

function generatePDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 10;
  const pageHeight = doc.internal.pageSize.height;

  for (let i = 1; i <= 6; i++) {
    const num = document.getElementById(`sesion${i}`).value;
    const sessionQuestions = questions[`sesion${i}`] || [];
    const selectedQuestions = sessionQuestions.sort(() => 0.5 - Math.random()).slice(0, num);

    // Add session title
    doc.setFontSize(16); // Larger font for session titles
    doc.setFont('helvetica', 'bold'); // Bold font for titles
    doc.text(`Sessió ${i}`, 10, y);
    y += 10;

    // Reset font for questions
    doc.setFontSize(12); // Normal font size for questions
    doc.setFont('helvetica', 'normal'); // Normal font for questions

    selectedQuestions.forEach(question => {
      const lines = doc.splitTextToSize(question, 190); // Split text into lines
      lines.forEach(line => {
        if (y + 10 > pageHeight - 10) { // Check if we need to add a new page
          doc.addPage();
          y = 10; // Reset y position for new page
        }
        doc.text(line, 10, y);
        y += 10; // Add extra spacing between lines
      });
      y += 10; // Extra spacing after each question
    });

    // Add some space between sessions
    if (y + 20 > pageHeight) { // Check if we need to add a new page before adding space
      doc.addPage();
      y = 10; // Reset y position for new page
    } else {
      y += 20; // Extra spacing after each session
    }
  }

  // Save the PDF
  doc.save('examen_mostra.pdf');
}
