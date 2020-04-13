export const randomID = () => `_${Math.random().toString(36).substr(2)}`


// this function is used in our async middleware (epics) to beef up the message with extra content
// just before saving it
export const createBeforeServerMessage = ({ message: { context, attributes, ...rest } }) => ({
  ...rest,
  // "context" is information about the current site visitor. Things like their browser, device,
  // operating system, locale, etc.
  context: {
    ...context,
    location: window.location.href,
    // please add a ton more info here
  },
  // "attributes" is information that we want to keep track of. This data doesn't need to be
  // pristine at all. You can view it as another way to save arbitrary data for a message.
  // The attributes will be sent to the server and the server will transparently save it
  attributes: {
    ...attributes,
    sentFromWidget: true,
    clientTimestamp: Date.now(),
  }
})
