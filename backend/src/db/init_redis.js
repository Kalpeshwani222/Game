const redis = require("redis");

const client = redis.createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_URL,
    port: process.env.REDIS_PORT,
    connect_timeout: 5000,
  },
});

// redis-cli -u redis://default:xynn8k6ObjJVfTRlu5DQo73weAyuN4Ss@redis-16365.c52.us-east-1-4.ec2.redns.redis-cloud.com:16365

client.connect();

client.on("connect", () => {
  console.log("client connected to redis");
});

client.on("ready", () => {
  console.log("client connected to redis and ready to use");
});

client.on("error", (err) => {
  console.log("error" + err.message);
});

client.on("end", () => {
  console.log("client disconnected to redis");
});

process.on("SIGINT", () => {
  client.quit();
});

module.exports = client;
