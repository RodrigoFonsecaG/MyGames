const express = require('express');
const nunjucks = require('nunjucks');


const server = express();
const games = require("./data");

server.use(express.static("public"));

//Configuramos para o nunjucks saber qual a pagina que está nossos htmls
// E posteriormente podermos usar o render somente com o nome do nosso html
nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", (req, res) => {

    const about = {
        avatar_url: "https://i.ytimg.com/vi/nL3uHUkYbJE/maxresdefault.jpg",
        name: "Macacaquinho",
        role: "Tomador de mamadeira",
        description: "Macaco mamador, focado em tomar mamadeira",
        links: [
            {name: "Github", url: "https://github.com/RodrigoFonsecaG"},
            {name: "Twitter", url: "https://twitter.com/"},
            {name: "Linkedin", url: "https://www.linkedin.com/in/rodrigo-fonseca-74b979212/"}
        ]
    }

    return res.render('about.njk', {about})
})

server.get("/jogos", (req, res) => {
    return res.render('jogos.njk', {games})
})

server.get("/video", (req, res) => {
    // Pega o id da url
    // Ex: http://localhost:3000/video?id=N40uY51s5Z0
    const id = req.query.id;

    // Verifica se o id na url existe no banco de dados 'games'
    // por meio do metodo find e retorna se for verdadeiro
    // o proprio video
    const video = games.find(function(video){
        return video.id == id
    })

    //Se retorna false retorna undefined e mostra uma pagina com uma mensagem
    // de video nao encontrado
    if(!video){
        return res.send("Video not found!")
    }

    // Se retorna true renderiza a pagina de video
    // e envia o proprio video para ser usado
    // na template string
    return res.render('video.njk', {game: video})
})

server.listen(3000);