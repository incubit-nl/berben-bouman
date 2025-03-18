import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const auth = req.headers.get('authorization')

  if (auth) {
    const [scheme, encoded] = auth.split(' ')

    if (scheme === 'Basic') {
      const buffer = Buffer.from(encoded, 'base64')
      const [username, password] = buffer.toString().split(':')

      if (username === 'bb' && password === 'bb-demo') {
        return NextResponse.next()
      }
    }
  }

  return new NextResponse('Unauthorized', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Secure Area"',
    },
  })
}

export const config = {
  matcher: '/((?!api|_next/static|favicon.ico).*)',
}