export declare var self: Worker

self.addEventListener('message', async () => {
  try {
    self.postMessage({})
  } catch (err) {
    console.error('error processing data ', err)
    self.postMessage('error')
  }
})
