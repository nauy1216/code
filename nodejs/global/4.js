const myURL = new URL('/foo', 'https://example.org/')
console.log(myURL)

/*
URL {
  href: 'https://example.org/foo',
  origin: 'https://example.org',
  protocol: 'https:',
  username: '',
  password: '',
  host: 'example.org',
  hostname: 'example.org',
  port: '',
  pathname: '/foo',
  search: '',
  searchParams: URLSearchParams {},
  hash: ''
}
*/