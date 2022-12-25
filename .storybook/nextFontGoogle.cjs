// nextFontGoogle.js
module.exports = new Proxy(
  {},
  {
    get: function getter(_, receiver) {
      return () => ({
        className: receiver,
      })
    },
  }
)
