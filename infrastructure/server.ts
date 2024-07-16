import express from 'express'
import { DbConnection } from './dbConnection';
import { router } from './router';

export class Server {
	private readonly express: express.Express;
	private readonly port: string;
    private readonly db: DbConnection

    constructor(port:string, dburi:string){
        this.port = port
        this.express = express()
        this.db = new DbConnection(dburi)
        this.express.set('db',this.db)
        this.express.use(express.json())
        this.express.use(express.urlencoded({ extended: true }))
        this.express.use('/', router)
    }

	async listen(): Promise<void> {
		await new Promise<void>((resolve) => {
			this.express.listen(this.port, () => {
				// eslint-disable-next-line no-console
				console.log(
					`✅ Backend App is running at http://localhost:${this.port} in ${this.express.get(
						"env"
					)} mode`
				);
				// eslint-disable-next-line no-console
				console.log("✋ Press CTRL-C to stop\n");

				resolve();
			});
		});
	}
}