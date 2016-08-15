export default function (server) {

  server.route({
    path: '/api/auth_log_visualisation/example',
    method: 'GET',
    handler(req, reply) {
      reply({ time: (new Date()).toISOString() });
    }
  });

};
