const worker = {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/" || url.pathname === "") {
      return Response.redirect(`${url.origin}/en/`, 302);
    }
    return env.ASSETS.fetch(request);
  },
};

export default worker;
