

module.exports = function(api) {

  var timeoutcontrol

  function response(response) {
    return api.type("Response", response)
  }

  var completed = false

  return {
    fromApi: function (request) {

      timeoutcontrol = setTimeout(function () {
        api.sendApi(response({
          status: 408,
          message: "Request timed out"
        }))
        api.shutdown()
      }, 10000)

      var encodedBody = api.encodeFor(request.payload, request.targetService)

      api.sendTransport({
        step: "request.made",
        target: request.targetService,
        payload: {
          body: encodedBody.payload,
          content_type: encodedBody.contentType,
          auth: request.auth,
          url: request.url
        }
      })
    },
    fromTransport: function (msg) {

      if (completed) return
      clearTimeout(timeoutcontrol)

      switch (msg.step) {
        case "request.response":
          api.sendApi(api.decode("Response", msg))
          break;
        case "request.failed":
          api.sendApi(api.decode("Response", msg))
          break
        case "ServiceNotFound":
          api.sendApi(response({
            status: 404
          }))
          break
        case "ChannelFailure":
          api.sendApi(response({
            status: 409
          }))
          break
        default:
          // api.log.warn("Unexpected step type " + msg.step)
          api.sendApi(response({
            status: 410
          }))
      }
      api.shutdown()
      completed = true
    }
  };
}


