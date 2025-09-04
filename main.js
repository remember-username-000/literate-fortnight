//Get references to important HTML elements
const webSocketUrlField = document.getElementById('ws-url');
const openBtn = document.getElementById('open');
const closeBtn = document.getElementById('close');
const messageField = document.getElementById('message');
const sendBtn = document.getElementById('send');
const chatDiv = document.getElementById('chat');

let connection;

const userConfig = {
    //Generate a default username based on the time
    name: "User" + (Date.now() % 999).toString(),
    
    textColor: 'black',
}

openBtn.addEventListener(
    'click',
    (e) => {
        connection = (new WebSocketConnection(webSocketUrlField.value));
        //console.log(webSocketUrlField.value);

        connection.addEventListener('wsMessage', (e) => {
            handleMessage(e.detail.data);
        });
    }
);
closeBtn.addEventListener(
    'click',
    (e) => {
        connection.close();
    }
);
sendBtn.addEventListener(
    'click',
    (e) => {
        //Compile user config and message data into a JSON string and send it
        let data = {
            name: userConfig.name,
            textColor: userConfig.textColor,
            message: messageField.value,
        }

        //console.log(JSON.stringify(data));
        connection.send(JSON.stringify(data));
        console.log('sent: ' + messageField.value);
    }
);

function handleMessage (data) {
    //console.log(data);

    //We expect data from the server to be prefixed with '(echo) '
    let msg = JSON.parse(data.replace(/\(echo\) /, ''));
    console.log('received: ' + msg.message);

    //Create a new HTMl element and prepend it to the document
    let p = document.createElement('p');
    p.innerHTML = `${msg.name}: ${msg.message}`;
    p.style.color = msg.textColor;
    console.log(p);
    chatDiv.prepend(p);
}