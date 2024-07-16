import { Server } from "./server";

export class App {
	server?: Server;

	async start(): Promise<void> {
		const port = process.env.PORT ?? "8000";
        const dburi = 'mysql://root:1234@localhost:3306/dados'
		this.server = new Server(port, dburi);

		await this.server.listen();
	}
}