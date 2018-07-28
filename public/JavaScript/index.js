const   conNumber = document.getElementById('number').value,
        textInput = document.getElementById('message'),
        response = document.getElementById('response'),
        name = document.getElementById('name').value,
        button1 = document.getElementById('subbutton');
const socket = io();
socket.on('error', (data) => {
    M.toast({
        html: 'Some wrong happened <i class="material-icons right">cancel</i>',
        classes: 'red rounded'
    });
});
socket.on('smsStatus', (data) => {
    response.innerHTML = "<h5 class='green-text'><i class='material-icons left'>done</i>Message sent</h5>";
    M.toast({
        html: 'Request Sent <i class="material-icons right">done</i>',
        classes: 'green'
    });
    button1.value = 'Send Again';
    button1.disabled = false;
});
socket.on('sendingError', (data) => {
    M.toast({
        html: 'Some wrong happened <i class="material-icons right">cancel</i>',
        classes: 'red'
    });
    button1.value = 'Send Again';
    button1.disabled = false;
    response.innerHTML = `<h6 class='red-text'>Error: ${data.message}<a onclick="clearError()"><i class='material-icons '>cancel</i></a></h6> `;

});
function clearError(){
    response.innerHTML = "";
}
function send() {

    const text = textInput.value;
    button1.value = 'Sending…';
    button1.disabled = true;
    fetch("/contacts/:id/compose", {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                number: conNumber,
                text: text,
                name: name
            })
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });


}
