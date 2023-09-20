const form = document.getElementById("form");
const container_1 = document.getElementsByClassName("container-1")[0];
const container_2 = document.getElementsByClassName("container-2")[0];
let  user = {};
form.addEventListener("submit" , (e)=>{
  e.preventDefault();
  let elements = e.target.children;
  Array.from(elements).forEach((val)=>{
    if(val.hasAttribute("name"))
    {
        user[val.name] = val.value;
    }
  });

  container_1.style.display = "none";
  container_2.style.display = "flex";
   let heading = container_2.children[0];
   heading.innerText = `Welcome ${user.username} to chat app`;
})