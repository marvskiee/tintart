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
            const { email, subject, text, is_contact } = req.body
            let details = {
                from: !is_contact ? sender : email,
                to: is_contact ? sender : email,
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
