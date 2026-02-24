const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");
const greeting = document.getElementById("greeting");
const attendeeList = document.getElementById("attendeeList");
let attendees = [];
const celebrationMessage = document.getElementById("celebrationMessage");

//Track attencdance
let count = 0;
const maxCount = 50;

//Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); 

  //Stop if max capacity reached
  if (count >= maxCount) {
    greeting.textContent = "Event is at full capacity!";
    greeting.className = "error-message";
    greeting.style.display = "block";
    return;
  }

  //Get form values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  console.log(name, teamName);

  // Prevent duplicate names
  const duplicate = attendees.find(
    (attendee) => attendee.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicate) {
    greeting.textContent = "This attendee has already checked in.";
    greeting.className = "error-message";
    greeting.style.display = "block";
    return;
  }

  //Increment count
  count++;
  attendeeCount.textContent = count;
  console.log("Total check-ins: ", count);

  // Store attendee
  attendees.push({ name, team: teamName });

  // Create list item
  const li = document.createElement("li");

  li.innerHTML = `
    <span>${name}</span>
    <span class="attendee-team">${teamName}</span>
  `;

  attendeeList.appendChild(li);

  //Update progress bar
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = percentage + "%";
  console.log(`Progress: ${percentage}`);

  // If event is now full, determine winner
  if (count === maxCount) {

    const water = parseInt(document.getElementById("waterCount").textContent);
    const zero = parseInt(document.getElementById("zeroCount").textContent);
    const power = parseInt(document.getElementById("powerCount").textContent);

    let winningTeam = "";
    let highest = Math.max(water, zero, power);

    if (water === highest) winningTeam = "Team Water Wise 🌊";
    if (zero === highest) winningTeam = "Team Net Zero 🌿";
    if (power === highest) winningTeam = "Team Renewables ⚡";

    celebrationMessage.textContent = `🎉 Congratulations ${winningTeam}! You are the Sustainability Summit Champions!`;
    celebrationMessage.classList.add("show");
  }

  //Update team counter
  const teamCounter = document.getElementById(team + "Count");
  const currentTeamCount = parseInt(teamCounter.textContent) || 0;
  teamCounter.textContent = currentTeamCount + 1;
  
  //Show welcome message
  greeting.textContent = `Welcome, ${name} from ${teamName}!`;
  greeting.className = "success-message";
  greeting.style.display = "block";

  form.reset();
});


