const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");

//Track attencdance
let count = 0;
const maxCount = 50;

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  //Stop if max capacity reached
  if (count >= maxCount) {
    greeting.textContent = "Event is at full capacity!";
    greeting.className = "";
    greeting.style.display = "block";
    return;
  }

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  //Increment count
  count++;
  attendeeCount.textContent = count;
  console.log("Total check-ins: ", count);

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";
  console.log(`Progress: ${percentage}`);

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  const currentTeamCount = parseInt(teamCounter.textContent) || 0;
  teamCounter.textContent = currentTeamCount + 1;
  teamCounter.textContent = parseInt(teamCounter.textContent);
  
  //Show welcome message
  greeting.textContent = `Welcome, ${name} from ${teamName}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  form.reset();
});


