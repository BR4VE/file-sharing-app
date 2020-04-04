# File Sharing App <img src="./client/src/images/icon.png" style="width:30px" />

File Sharing App is a web app built with React.js and Node.js (express). It allows people to create lobbies and send files to each other.

It is an experimental project to work on sockets and streams on the back-end and to work on with react (Hooks) on the front-end.

Demo can be found at: [https://file-sharing-app-react.herokuapp.com/](https://file-sharing-app-react.herokuapp.com/)

The motivation, used technologies and objects are listed below.

## Back-End

I tried to provide a simple back-end in order to focus more on streaming and socket communication. Because of that I did not implement any authentication or security system, but they can be added to future goals. I also tried to avoid from using lots of different libraries.

All libraries which have effects on implementation details can be listed as:

- Express
- Socket.io
- Socket.io-stream

Rather than using plain old http.post requets with Form Data to send any kind of file, I've implemented streaming (one way, i will explain it later) to upload files to the server.

Besides these, uploaded files are hosted on the back-end for 30 minutes and gets deleted after that.

### One Way Streaming

Currently, I use streams and send chunks of data with sockets to upload files to server, but when downloading I use some help from express' _res.download()_ rather than using streams to download the file again.

On the future versions, I will implement _two way streaming_ so we will able to download files at the same time we upload them.

### What could have been done more?

- Implementing Authentication (with JWT and HTTP Cookies)
- Deploying to Google App Engine (Main platform I use)
- Implementing _Two Way Streaming_

## Front-End

I've focused on using React Hooks with a clean and simple architecture. Although we require to use them on big and complex applications, I belive using state providers (Redux, Flux) for small and mid sized apps brings more confusion and abstraction than easiness. So I've tried to centralize my components in a way that I can use **one level** top-to-down prop passing for shared state.

All libraries which have effect on implementation details can be listed as:

- React with Hooks
- React Bootstrap
- Axios
- Socket.io-client
- Socekt.io-stream

### What could have been done more?

- Implementing a State Provider (Redux with Hooks, When app grows)

## Questions & Feedback

I would like to answer any questions raised based on this project and I would be so glad if you provide me any positive or negative feedback. You can contact me at <a href="mailto:mertbatmazoglu@gmail.com" target="_blank">mertbatmazoglu@gmail.com</a>
