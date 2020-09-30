function proxy(route) {
  const url =
    process.env.npm_lifecycle_event === "server"
      ? `http://localhost:3000${route}`
      : route;
  return url;
}

module.exports = proxy;
