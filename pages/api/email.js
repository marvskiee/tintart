import { response } from '../../services/response'
import nodemailer from 'nodemailer'

const sender = "l.sumaguingsing15@gmail.com"

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: sender,
        pass: "cjbw vzxu ajcd ekhc"
    }
})

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { first_name, last_name, email, subject, body } = req.body
            let details = {
                from: sender,
                to: email,
                subject,
                text: `Name: ${first_name} ${last_name}\nMessage: ${body}`
            }

            mailTransporter.sendMail(details, (err) => {
                if (err) {
                    console.log(err)
                    return res.json({ success: false, message: err })
                }
                return res.json({ success: true, message: "Email has been sent!" })
            })
            break
        default:
            response({ res, status_code: 500, success: false })
            break
    }
}
