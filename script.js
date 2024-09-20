let start = document.querySelector("#Start");

start.addEventListener("click",async ()=>{
  let [tab] = await chrome.tabs.query({active:true,currentWindow:true});
  console.log(tab);
  
})



