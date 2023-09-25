import { serialize } from 'cookie'

export default async (req, res) => {
  const { cookies } = req
  const jwt = cookies.OursiteJWT
  if (!jwt) {
    return res.json({ success: false, message: 'You are not logged in' })
  } else {
    const serialized = serialize('OursiteJWT', null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: -1,
      path: '/',
    })
    res.setHeader('Set-Cookie', serialized)
    res.status(200).json({ success: true, message: 'Successfully Logout' })
  }
}
