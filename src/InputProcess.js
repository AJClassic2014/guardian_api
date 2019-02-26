export default (data) => {
  let userInput = data;
  //userInput=userInput.replace(/[&/\\#,+()$~%.'":*?<>{}]/g,'%20');
  userInput = userInput.replace(/[&/\\#,+()$~%.:*?<>{}]/g, '%20');
  userInput = userInput.replace(/["]/g, "%22");
  userInput = userInput.replace(/[ ]/g, "%20");
  return userInput;
}