const prerender = require("prerender");

const server = prerender({});
server.use(prerender.sendPrerenderHeader());
server.use(prerender.removeScriptTags());
server.use(prerender.inMemoryHtmlCache());
server.start();
