async function initMocks() {
  if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen({ onUnhandledRequest: 'bypass' })
  } else {
    const { worker } = await import('./browser')
    worker.start({ onUnhandledRequest: 'bypass' })
  }
  console.log('MSESTART!!!')
}

initMocks()

export {}
