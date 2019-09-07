const nodemailer = require('nodemailer')
module.exports = app => {
    const send = async (req, res) =>{

        const message = req.body
        console.log(message)

        const transporter = nodemailer.createTransport({
            service: 'email-provider',
            auth:{
                user: 'email',
                pass: 'password'
            }
        })

        const mailOptions = {
            from: `sender`,
            to: "receiver",
            subject: `${message.subject}`,
            text: `${message.text}`
        }

        await transporter.sendMail(mailOptions, function(err, info){
            if(err){
                res.status(500).send()
            }
            else{
                res.status(204).send()
            }
        })
    }

    return { send }
}