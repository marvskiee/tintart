import { response } from '../../services/response'
import nodemailer from 'nodemailer'

const sender = "tintart123@gmail.com"

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: sender,
        pass: "pcif wyhh ftyu qqrf"
    }
})

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { email, subject, text } = req.body
            let details = {
                from: sender,
                to: email,
                subject,
                text,
            }

            mailTransporter.sendMail(details, (err) => {
                if (err) {
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
