import { PORT } from "./config/server";
import server from "./server/server";
import io from "./server/socket";

server.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
});

io.listen(server);
