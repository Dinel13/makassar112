// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, (result) => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    origin: [
      "http://localhost:3000",
      "http://103.151.20.63",
      "http://112.makassarkota.go.id",
      "https://112.makassarkota.go.id",
    ],
   //  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
   //  allowedHeaders: [
   //    "Content-Type",
   //    "Authorization",
   //    "Accept",
   //    "X-Requested-With",
   //    "X-HTTP-Method-Override",
   //    "X-CSRF-Token",
   //  ],
  })
);

export default cors;
