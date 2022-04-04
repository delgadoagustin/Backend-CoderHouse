const socket = io.connect();

function render(data,id) {
    let html;
    if(id=='messages'){
        html = data.map(elem => {
            return(`<div>
                <strong class="text-primary">${elem.author}</strong>:
                <span class="text-danger">${elem.date}: </span>
                <em class="text-success">${elem.text}</em> </div>`)
        }).join(" ");
    }
    else if(id=='products'){
        html = data.productos.map(elem => {
            return(`<tr><td>${elem.name}</td>
            <td>${elem.price}</td>
            <td><img class="img-thumbnail" src=${elem.thumbnail}></td></tr>`)
        }).join(" ");
    }
    
    document.getElementById(id).innerHTML = html;
}

socket.on('messages', function(data) { render(data,'messages'); });
socket.on('products', function(data) { render(data,'products'); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        date: new Date().toLocaleString(),
        text: document.getElementById('texto').value
    };
    socket.emit('new-message', mensaje);
    return false;
}

function addProduct(e){
    const prod = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        thumbnail: document.getElementById('thumbnail').value
    };
    socket.emit('new-product',prod);
    return false;
}