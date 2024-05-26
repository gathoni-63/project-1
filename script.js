document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value;
    if (query) {
        performSearch(query);
    }
});

function performSearch(query) {
    // Here you can add the logic to handle the search task
    // For example, you could redirect to a search results page:
    window.location.href = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

let slideArr = document.getElementsByClassName("top-slide")
function slideChange(slideArr,a){
    let i = 1
    let b = function(slide){
        slides = slide.getElementsByClassName("myslides")
        if(i>=(slides.length)){
            slides[(slides.length-1)].style.display = "none"
            i=0
            
        }
        slides[i].style.display = "block"
        if (i!=0){slides[(i-1)].style.display = "none"}
        i++
    }

    setInterval(b,5000,slideArr[a])
}
for (let i = 0; i<slideArr.length;i++){
    slideChange(slideArr,i)
}
rmparagraph = document.getElementsByClassName("story-paragraph")[0].getElementsByTagName("p")[0]

function rmbtnH(index){

    if (index==0 && window.innerWidth < 700){

        rmparagraph.style.display="none"
    }
    if (index==1 && window.innerWidth < 700){
        rmparagraph.style.display="flex"
    }
}

function get_position(number, array, method, err){
    if (method){
        number = number + err
        for(let i=0; i<array.length; i++){
        start = array[i]
        end = array[i+1]
        if ((number >= start) && ( number < end)){
            return (i+1)
            break
        }
    }
    }
    if (!method){
        number = number - err
        for(let i=1; i<=array.length; i++){
            start = array[i]
            end = array[i-1]
            if (start == undefined){
                return -1
            }
            if ((number< start) && (number >= end)){
                
                return (i-1)
                break
            }
        }
    }
}

function slidefunct(targetID, method, type=null, speed="smooth", err=10){
    let target = document.getElementById(targetID)
    let sldcner = target.getElementsByClassName("arrival-slides-ct")[0]
    let slides = target.getElementsByClassName("arrival-slides")
    begin_points = []
    for (let a = 0; a <= slides.length; a++){
    begin_points[a] = a*sldcner.scrollWidth/(slides.length)
    }
    slidesvisible = Math.round((sldcner.getBoundingClientRect().width/sldcner.scrollWidth)*(slides.length))
    let gp = get_position((sldcner.scrollLeft), begin_points, method, err)
    if(type!=null){
        for(let a = 1; a<slidesvisible; a++){
            setTimeout(()=>{
                slidefunct(targetID, method, null, "smooth", slides[0].getBoundingClientRect().width/2)
            },(350*a))
        }
        return
    }
    if(gp == (begin_points.length-slidesvisible)){
        sldcner.append(slides[0])
        sldcner.scroll({behavior:"instant", left: begin_points[begin_points.length-slidesvisible-2]})
    }
    if(gp==-1){
        sldcner.prepend(slides[(slides.length-1)])
        sldcner.scroll({behavior:"instant", left: begin_points[1]})
        gp = gp+1
    }
    pos = begin_points[gp]
    sldcner.scroll({behavior:`${speed}`, left: pos})
}

let nxtbuttons = document.getElementsByClassName("nextbtn")
let psbuttons = document.getElementsByClassName("psbtn")
for(let i = 0; i<nxtbuttons.length;i++){
    let nbutton = nxtbuttons[i]
    let pbutton = psbuttons[i]
    pbutton.addEventListener("dblclick",(event)=>{
        let targetID = nbutton.parentNode.parentNode.parentNode.id
        slidefunct(targetID,0,1)
    })
    nbutton.addEventListener("dblclick",(event)=>{
        let targetID = nbutton.parentNode.parentNode.parentNode.id
        slidefunct(targetID,1,1)
    })
}

const chatContainer = document.getElementById('chat-container');
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

function toggleChat() {
    if (chatContainer.style.display === 'none' || chatContainer.style.display === '') {
        chatContainer.style.display = 'flex';
    } else {
        chatContainer.style.display = 'none';
    }
}

function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

function sendMessage() {
    const message = userInput.value.trim();
    if (message) {
        appendMessage('user', message);
        userInput.value = '';
        botResponse(message);
    }
}

function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function botResponse(userMessage) {
    let response = 'I did not understand that.';

    if (userMessage.toLowerCase().includes('hello')) {
        response = 'Hello! How can I help you today?';
    } else if (userMessage.toLowerCase().includes('how are you')) {
        response = 'I am just a bot, but I am doing great! How about you?';
    } else if (userMessage.toLowerCase().includes('bye')) {
        response = 'Goodbye! Have a great day!';
    }

    setTimeout(() => {
        appendMessage('bot', response);
    }, 1000);
}
