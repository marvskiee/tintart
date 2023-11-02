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
        case "/user/borrow":
        case "/user/profile":
        case "/user/notifications":
        // case "/user/liabilities":
        case "/user/borrowed-items-history":
        case "/user/account-settings":
          if (res.role == "student") {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(`${domain}`);
          }
        case "/admin":
        case "/admin/notifications":
        case "/admin/activity-logs":
        case "/admin/property-category":
        case "/admin/liabilities":
        case "/admin/inventory":
        case "/admin/borrow-management":
        case "/admin/registry":
        case "/admin/property-category-history":
        case "/admin/registry-logs":
        case "/admin/settings":
          if (res.role == "admin") {
            return NextResponse.next();
          } else {
            return NextResponse.redirect(`${domain}`);
          }
        default:
          if (pathname == "/login") {
            if ([0, 1].indexOf(res?.role) > -1) {
              return NextResponse.redirect(`${domain}`);
            } else if (res?.role == 2)
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
        case '/':
        case '/gallery':
        case '/shop':
        case '/faqs':
        case '/about':
        case '/profile':
        case '/profile/edit':
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
