let container = document.querySelector(".container");
let cardData = []; // This holds all cards (sample + user-added)

// Sample Cards
const sampleCards = [
  {
    title: "Learn JavaScript in 60 Minutes: The Ultimate Beginner Course!",
    cName: "Coding2go",
    views: "3000",
    monthsOld: "22 hours",
    duration: "1:15:40",
    thumbnail:
      "https://www.21kschool.com/in/wp-content/uploads/sites/4/2023/11/15-Facts-About-Coding-Every-Kid-Should-Know.png",
  },
  {
    title:
      "Installing VS Code & How Websites Work | Sigma Web Development Course - Tutorial #1",
    cName: "CodeWithHarry",
    views: "5200000",
    monthsOld: "2 year",
    duration: "12:32",
    thumbnail:
      "https://i.ytimg.com/vi/tVzUXW6siu0/hqdefault.jpg?sqp=-oaymwEnCPYBEIoBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLCKktmHuXV_macV6MoUwhKxwzXJ7w",
  },
];

// On page load
showTask();

function createCard(title, cName, views, monthsOld, duration, thumbnail) {
  container.insertAdjacentHTML(
    "afterbegin",
    `<div class="card">
        <div class="image">
            <div class="duration">
                <span>${duration}</span>
            </div>
            <img src="${thumbnail}" alt=""/>
        </div>
        <div class="details">
            <p class="title">${title}</p>
            <span>${cName} &#8231; ${viewConvertor(
      views
    )} views &#8231; ${monthsOld} ago</span>
        </div>
     </div>`
  );
}

function viewConvertor(number) {
  if (number < 1000) return number;
  else if (number < 1000000) return Math.floor(number / 1000) + "k";
  else return (number / 1000000).toFixed(1) + "M";
}

function addCard() {
  const input = document.getElementsByTagName("input");

  const anyEmpty = Array.from(input).some((el) => el.value === "");
  if (anyEmpty) {
    alert("Enter Value");
    Array.from(input).forEach((e) => (e.value = ""));
    return;
  }

  const card = {
    title: document.getElementById("videoTitle").value,
    cName: document.getElementById("channelName").value,
    views: document.getElementById("videoViews").value,
    monthsOld: document.getElementById("timeAgo").value,
    duration: document.getElementById("videoDuration").value,
    thumbnail: document.getElementById("thumbnailUrl").value,
  };

  cardData.push(card);
  createCard(
    card.title,
    card.cName,
    card.views,
    card.monthsOld,
    card.duration,
    card.thumbnail
  );
  saveData();

  alert("Card Created Successfully");
  Array.from(input).forEach((e) => (e.value = ""));
}

function saveData() {
  localStorage.setItem("data", JSON.stringify(cardData));
}

function showTask() {
  const data = localStorage.getItem("data");
  if (data) {
    cardData = JSON.parse(data);
  } else {
    cardData = sampleCards; // Use sample cards if nothing saved yet
    saveData(); // Save them to localStorage
  }

  container.innerHTML = ""; // Clear existing HTML
  cardData.forEach((card) => {
    createCard(
      card.title,
      card.cName,
      card.views,
      card.monthsOld,
      card.duration,
      card.thumbnail
    );
  });
}

function clearCards() {
  localStorage.removeItem("data");
  container.innerHTML = "";
  cardData = [...sampleCards];
  showTask(); // Show sample cards again
}
