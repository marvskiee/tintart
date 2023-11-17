import { response } from '../../services/response'
import nodemailer from 'nodemailer'

const admin = "tintart123@gmail.com"

let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: admin,
        pass: "pcif wyhh ftyu qqrf"
    }
})

export default async (req, res) => {
    switch (req.method) {
        case 'POST':
            const { email, subject, text, is_contact } = req.body
            let details = {
                from: is_contact ? email : admin,
                to: is_contact ? admin : email,
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
