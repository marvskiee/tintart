import { NextResponse } from 'next/dist/server/web/spec-extension/response'
import { verify } from './services/jwt_sign_verify'
export default async function middleware(req) {
  const secret = process.env.SECRET

  let jwt = req.cookies.get('OursiteJWT')
  let url = req.url

  const domain = process.env.CUSTOM_DOMAIN

  let tmp_url = url
  let pathname = '/' + tmp_url.replace(domain, '')
  try {
    const res = await verify(jwt?.value, secret)
    if (res) {
      switch (pathname) {
        case '/profile':
        case '/profile/edit':
        case '/shipping':
        case '/cart':
          if (res.role == 0 || res.role == 1) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(`${domain}`);
          }
        case '/admin/dashboard':
        case '/admin/properties':
        case '/admin/categories':
        case '/admin/products':
        case '/admin/products/add':
        case '/admin/products/edit':
        case '/admin/users':
        case '/admin/users/add':
        case '/admin/users/edit':
        case '/admin/orders':
        case '/admin/settings/shop':
        case '/admin/settings/profile':
        case '/admin/settings/password':
          if (res.role == 2 || res.role == 3) {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(`${domain}`);
          }
        default:
          if (pathname == "/login") {
            if ([0, 1].indexOf(res?.role) > -1) {
              return NextResponse.redirect(`${domain}`);
            } else if (res?.role == 2 || res?.role == 3)
              return NextResponse.redirect(`${domain}admin/dashboard`);
            else return NextResponse.redirect(`${domain}`);
          }
      }
    } else {
      switch (pathname.split("/").slice(0, 4).join("/")) {
        // ADMIN ROUTES
        case '/admin/dashboard':
        case '/admin/properties':
        case '/admin/categories':
        case '/admin/products':
        case '/admin/products/add':
        case '/admin/products/edit':
        case '/admin/users':
        case '/admin/users/add':
        case '/admin/users/edit':
        case '/admin/orders':
        case '/admin/settings/shop':
        case '/admin/settings/profile':
        case '/admin/settings/password':

        // ARTIST AND CUSTOMER ROUTES
        case '/profile':
        case '/profile/edit':
        case '/shipping':
        case '/cart':
          return NextResponse.redirect(`${domain}login`)
        default:
          return NextResponse.next()
      }
    }
  } catch (e) { }

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
