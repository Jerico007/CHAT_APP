const form = document.getElementById("form");
const textingForm = document.getElementById("texting-form");
const container_1 = document.getElementsByClassName("container-1")[0];
const container_2 = document.getElementsByClassName("container-2")[0];
const chatConainer = document.getElementsByClassName("chat-container")[0];
var socket = io();
let user = {};
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let elements = e.target.children;
  Array.from(elements).forEach((val) => {
    if (val.hasAttribute("name")) {
      user[val.name] = val.value;
    }
  });

  container_1.style.display = "none";
  container_2.style.display = "flex";
  let heading = container_2.children[0];
  heading.innerText = `Welcome ${user.username} to chat app`;
});

textingForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let elements = e.target.children;

  let userData = {
    "id" : socket.id,
    "type" : "send"
  };
  Array.from(elements).forEach((val) => {
    if (val.hasAttribute("name")) {
      userData[val.name] = val.value;
      val.value = "";
    }
  });
  //Sending to io
  socket.emit("user-message",userData);
  addDatatoUI(userData);
});

//Receiving from io
socket.on("user-message",(userData)=>{
    if(userData.id != socket.id)
    {
      userData.type = "received";
      addDatatoUI(userData);
    }
});

function addDatatoUI(data)
{
  let messageContainer = document.createElement("div");
  if(data.type === "send")
  {
    messageContainer.classList.add("sender");
  }
  else{
    messageContainer.classList.add("receiver");
  }
  messageContainer.innerText = data.message;

  chatConainer.appendChild(messageContainer);
}