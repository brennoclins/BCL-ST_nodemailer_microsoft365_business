const nodemailer = require('nodemailer');
const express = require('express');
const server = express();

//ativa a leitura das variaveis de ambiente
require('dotenv').config();

//porta que esta rodando nosso app
const port = process.env.PORT;

//emails e senha 
const meuEmail = process.env.MAIL_BCLST;
const minhaSenha = process.env.PASSWORD_MAIL_BCLST;
const mailTo = process.env.MAIL_TO;
const mailBcc = process.env.MAIL_BCC;

// criei essa variaveis para entendermos quais os campos que vem do nosso frontend ou de outra app
const 
mail_subject = "Soluções Tecnológicas", 
name = "Brenno", 
email = "contato@bcl-st.com.br", 
smartphone = "00 9 8888-7777", 
message = "Ola enviando e-mails com Nodemailer e Microsoft 365 Business";

function sendMail(req, res) {

    let transport = nodemailer.createTransport({
        host: "smtp.office365.com",
        port: 587,
        secure: false,
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: meuEmail,
            pass: minhaSenha
        }
    })

    transport.sendMail({
        from: meuEmail,
        to: mailTo,
        bcc:[mailBcc],
        subject: `BCL-ST - ${mail_subject}`,
        html: "<h3>Web Site - BCL-ST</h3>" +
            `<div>` +
                `<p>Nome: ${name} </p>` +
                `<p>E-mail: ${email} </p>` +
                `<p>Telefone: ${smartphone} </p>` +
                `<p>Mensagem: ${message} </p>` +
            `</div>`
    }).then(message_email => {
        console.log(message_email);
        return res.json({ok: "Email enviado"});
    }).catch(err => {
        console.log(err);
        return res.status(400).json({err: "Erro e-mail não enviado"})
    })

}

function getBCL(req, res) {
    return res.json({blz:"BCL-ST"});
}

server.use(express.json());
server.get('/', getBCL);

server.get('/email',sendMail);

server.listen(port, () => {
    console.log(`Server BCL-ST sendMail running a port: ${port}`);
});