import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { verify } from './services/jwt_sign_verify'
export default async function middleware(req) {
  const secret = process.env.SECRET

  let jwt = req.cookies.get('OursiteJWT')
  let url = req.url
  // online domain for heroku

  const domain = process.env.CUSTOM_DOMAIN

  // offline domain for localhost
  // const domain = "http://localhost:3000/";

  let tmp_url = url
  let pathname = '/' + tmp_url.replace(domain, '')
  try {
    const res = await verify(jwt?.value, secret)
    if (res) {
      switch (pathname) {
        case '/dashboard':
          return NextResponse.next()
        default:
          if (pathname == '/') {
            return NextResponse.redirect(`${domain}dashboard`)
          }
      }
    } else {
      switch (pathname) {
        case '/dashboard':
          return NextResponse.redirect(`${domain}`)
        default:
          return NextResponse.next()
      }
    }
  } catch (e) {}

  // configuration
  if (req.nextUrl.pathname.startsWith('/_next')) return NextResponse.next()
  if (
    pathname.startsWith('/_next') || // exclude Next.js internals
    pathname.startsWith('/api') || //  exclude all API routes
    pathname.startsWith('/static') || // exclude static files
    pathname.includes('.') // exclude all files in the public folder
  )
    return NextResponse.next()

  const PUBLIC_FILE = /\.(.*)$/
  if (PUBLIC_FILE.test(pathname)) return NextResponse.next()
  // if (!verifys) {
  //
  // }
}
