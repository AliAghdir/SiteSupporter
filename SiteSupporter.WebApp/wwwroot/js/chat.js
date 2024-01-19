var connection = new signalR.HubConnectionBuilder().withUrl('/chatHub').build();

//Disable the send button until connection is established.
document.getElementById('sendButton').disabled = true;

connection.on('ReceiveMessage', renderMessage);

function renderMessage(name, message, time) {
    var nameSpan = document.createElement('span');
    nameSpan.className = 'name';
    nameSpan.textContent = name;

    var timeSpan = document.createElement('span');
    timeSpan.className = 'time';
    //var timeFriendly = moment(time).format('H:mm');
    timeSpan.textContent = time;

    var headerDiv = document.createElement('div');
    headerDiv.appendChild(nameSpan);
    headerDiv.appendChild(timeSpan);

    var messageDiv = document.createElement('div');
    messageDiv.className = 'message';
    messageDiv.textContent = message;

    var newItem = document.createElement('li');
    newItem.appendChild(headerDiv);
    newItem.appendChild(messageDiv);

    var chatHistory = document.getElementById('chatHistory');
    chatHistory.appendChild(newItem);
    chatHistory.scrollTop = chatHistory.scrollHeight - chatHistory.clientHeight;
}

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

function ready() {
    var chatForm = document.getElementById('chatForm');
    chatForm.addEventListener('submit',
        function (e) {
            e.preventDefault();
            var text = e.target[0].value;
            e.target[0].value = '';
            sendMessage('ali',text);
        });
}

function sendMessage(name, text) {
    if (text && text.length) {
        connection.invoke('SendMessage',name,text)
    }
} 

document.addEventListener('DOMContentLoaded', ready);
     