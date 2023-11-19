// hamburger menu
const menu = document.querySelector(".hamburger");
hamburgerNav = document.querySelector(".hamburgerNav");

menu.addEventListener("click", () => {
  menu.classList.toggle("hamburger--active");
  hamburgerNav.classList.toggle("hamburgerNav--active");
});
// end

// getting data from JSON

async function getFromJSON(category, IDatribiute, atribute, optionalAtribute) {
  return new Promise((resolve, reject) => {
    fetch("data.json")
      .then((response) => response.json())
      .then((data) => {
        if (category == "destinations") {
          const destinations = data.destinations;
          const selectedDestination = destinations.find(
            (destination) => destination.name == IDatribiute
          );
          if (selectedDestination) {
            if (atribute == "name") {
              resolve(selectedDestination.name);
            } else if (atribute == "images") {
              resolve(selectedDestination.images);
            } else if (atribute == "description") {
              resolve(selectedDestination.description);
            } else if (atribute == "travel") {
              resolve(selectedDestination.travel);
            } else if (atribute == "distance") {
              resolve(selectedDestination.distance);
            }
          } else {
            reject("IDatribute id invalid");
          }
        } else if (category == "crew") {
          const crews = data.crew;
          const selectedCrew = crews.find((crew) => crew.name == IDatribiute);
          if (selectedCrew) {
            if (atribute == "name") {
              resolve(selectedCrew.name);
            } else if (atribute == "images") {
              resolve(selectedCrew.images);
            } else if (atribute == "role") {
              resolve(selectedCrew.role);
            } else if (atribute == "bio") {
              resolve(selectedCrew.bio);
            }
          } else {
            reject("IDstribute id invalid");
          }
        } else if (category == "technology") {
          const technologies = data.technology;
          const selectedTechnology = technologies.find(
            (technology) => technology.name == IDatribiute
          );
          if (selectedTechnology) {
            if (atribute == "name") {
              resolve(selectedTechnology.name);
            } else if (atribute == "images") {
              if (optionalAtribute == "portrait") {
                resolve(selectedTechnology.images["portrait"]);
              } else if (optionalAtribute == "landscape") {
                resolve(selectedTechnology.images["landscape"]);
              } else {
                reject("optional attribute is invalid");
              }
            } else if (atribute == "description") {
              resolve(selectedTechnology.description);
            }
          } else {
            reject("Something is wrong with name");
          }
        } else {
          reject("Something is wrong with category");
        }
      })
      .catch((error) => {
        reject("Error fetching JSON: " + error);
      });
  });
}

//   end

// destination

async function showPlanetInfo(planet) {
  let planetNameJSON = await getFromJSON("destinations", planet, "name");
  let planetTextJSON = await getFromJSON("destinations", planet, "description");
  let planetDistanceJSON = await getFromJSON(
    "destinations",
    planet,
    "distance"
  );
  let planetTimeJSON = await getFromJSON("destinations", planet, "travel");
  let planetImgJSON = await getFromJSON("destinations", planet, "images");

  let planetName = document.querySelector(".planetName");
  let planetText = document.querySelector("#planetText");
  let planetDistance = document.querySelector("#destinationDataDistance");
  let planetTime = document.querySelector("#destinationDataTime");
  let planetFoto = document.querySelector("#planetImg");

  planetName.textContent = planetNameJSON;
  planetText.textContent = planetTextJSON;
  planetDistance.textContent = planetDistanceJSON;
  planetTime.textContent = planetTimeJSON;
  planetFoto.src = planetImgJSON;

  var buttons = document.querySelectorAll(".destinationNav button");
  buttons.forEach(function (btn) {
    btn.style.border = "none";
    if (btn.textContent.toUpperCase() == planet.toUpperCase()) {
      btn.style.borderBottom = "4px white solid";
    }
  });
}

// Crew
async function crewMember(memberName, buttonIndex) {
  let crewMemberName = await getFromJSON("crew", memberName, "name");
  let crewMemberRole = await getFromJSON("crew", memberName, "role");
  let crewMemberBio = await getFromJSON("crew", memberName, "bio");
  let crewMemberImg = await getFromJSON("crew", memberName, "images");

  let memberRoleContent = document.querySelector("#title");
  let memberNameContent = document.querySelector("#crewMember");
  let memberDescriptionContent = document.querySelector(".crewText p");
  let crewMemberImgContent = document.querySelector(".crewImg");

  memberRoleContent.textContent = crewMemberRole;
  memberNameContent.textContent = crewMemberName;
  memberDescriptionContent.textContent = crewMemberBio;
  crewMemberImgContent.src = crewMemberImg;
  let z = 0;
  var buttons = document.querySelectorAll(".crewText nav button");
  buttons.forEach(function (btn) {
    btn.style.backgroundColor = "white";
  });
  buttons.forEach(function (btn) {
    console.log(btn);
    z += 1;
    if (z == buttonIndex) {
      btn.style.backgroundColor = "grey";
    }
  });
}
getFromJSON;
// technology

let technologyImgContainer = 0;
let technologyImgContainer1 = 0;
let technologyImgContent = document.querySelector("#content img");

async function technologyData(technologyID, buttonIndex) {
  let technologyName = await getFromJSON("technology", technologyID, "name");
  let technologyDescription = await getFromJSON(
    "technology",
    technologyID,
    "description"
  );

  let technologyImg = await getFromJSON(
    "technology",
    technologyID,
    "images",
    "portrait"
  );

  let technologyImg1 = await getFromJSON(
    "technology",
    technologyID,
    "images",
    "landscape"
  );

  technologyImgContainer = technologyImg;
  technologyImgContainer1 = technologyImg1;

  let technologyNameContent = document.querySelector("#name");
  let technologyDescriptionContent = document.querySelector(
    "#technologyDescription"
  );

  technologyNameContent.textContent = technologyName;
  technologyDescriptionContent.textContent = technologyDescription;
  if (window.innerWidth > 1300) {
    technologyImgContent.src = technologyImg;
  } else {
    technologyImgContent.src = technologyImg1;
  }

  var buttons = document.querySelectorAll("#buttonsContainer button");

  buttons.forEach(function (btn) {
    btn.style.background = "none";
    btn.style.color = "white";
  });

  buttons.forEach(function (btn) {
    if (btn.textContent == buttonIndex) {
      btn.style.backgroundColor = "white";
      btn.style.color = "black";
    }
  });
}

addEventListener("resize", function () {
  if (window.innerWidth > 1300) {
    technologyImgContent.src = technologyImgContainer;
  } else {
    technologyImgContent.src = technologyImgContainer1;
  }
});

document.addEventListener(
  "DOMContentLoaded",
  technologyData("Launch vehicle", 1)
);
