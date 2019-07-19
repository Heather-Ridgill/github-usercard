/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/heather-Ridgill
*/
axios
  .get(`https://api.github.com/users/Heather-Ridgill`)
  .then(data => {
    console.log("Success!", data);
    const cards = document.querySelector(".cards");
    cards.appendChild(createCard(data.data));
  })
  .catch(err => {
    console.log("Error: ", err);
  });

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
const cardCreator = userObj;

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell"
];
axios
  .get(`https://api.github.com/users/Heather-Ridgill/followers`)
  .then(data => {
    console.log("Here is the list of your followers: ", data.data);
    const followersData = data.data;
    followersData.forEach(followerData => {
      followersArray.push(followerData.login);
    });

    followersArray.forEach(follower => {
      axios
        .get(`https://api.github.com/users/${follower}`)
        .then(data => {
          console.log("Follower info: ", data.data);
          const cards2 = document.querySelector(".cards");
          cards2.appendChild(createCard(data.data));
        })
        .catch(err => {
          console.log("Could not retrieve follower info: ", err);
        });
    });
  })

  .catch(err => {
    console.log("There was a problem retrieving your list of followers: ", err);
  });

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const cardsDiv = document.querySelector("cards");
function cardHolder(obj) {
  let Maincard = document.createElement("div");
  Maincard.classList.add("card");
  cardsDiv.appendChild(cardHouse);

  //pics img tag
  let cardPic = document.createElement("img");
  cardPic.setAttribute("src", obj.data.avatar_url);
  Maincard.appendChild(cardPic);

  //main info card-tag
  let cardDetails = document.createElement("div");
  cardDetails.classList.add("card-info");
  Maincard.appendChild(cardDetails);

  //persons name h3 tag
  let cardName = document.createElement("h3");
  cardName.classList.add("name");
  Maincard.textContent = obj.data.name;
  cardDetails.appendChild(cardName);

  //user name p tag
  let cardUserName = document.createElement("p");
  cardUserName.classList.add("username");
  cardUserName.textcontent = obj.data.login;
  cardDetails.appendChild(cardUserName);

  //locationa p tag
  let cardloc = document.createElement("p");
  cardloc.textContent = `Location: ${obj.data.location}`;
  cardDetails.appendChild(cardloc);

  //link to githubs a tag
  let cardAnchor = document.createElement("a");
  cardAnchor.setAttribute("href", "obj.data.html_url");
  cardAnchor.textContent = obj.data.html_url;

  //profile p tag
  let cardProfile = document.createElement("p");
  cardProfile.textContent = `Profile`;
  cardDetails.appendChild(cardProfile);
  cardDetails.appendChild(cardAnchor);

  //followers p tag
  let cardFollowers = document.createElement("p");
  cardFollowers.textContent = `Followers: ${obj.data.followers}`;
  cardDetails.appendChild(cardFollowers);

  //following p tag
  let cardFollowing = document.createElement("p");
  cardFollowers.textContent = `Following: ${obj.data.followers}`;
  cardDetails.appendChild(cardFollowing);

  //bio  p tag
  let cardBio = document.createElement("p");
  cardBio.textContent = `Bio: ${obj.data.bio}`;
  cardDetails.appendChild(cardBio);

  //create expand button
  let cardExpand = document.createElement("span");
  cardExpand.textContent = "Open / Close";
  cardExpand.classList.add("expandButton");
  cardDetails.appendChild(cardExpand);

  return cardsDiv;
}
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
