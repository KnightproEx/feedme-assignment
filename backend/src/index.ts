import server from "./server/server";
import io from "./server/socket";

const port = process.env.PORT ?? 3000;

server.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

io.listen(server);
