import { Server } from "./server.model";

export class ServersService {
    private servers: Server[] = [
        {
            id: 1,
            name: 'Production Server',
            status: 'online'
        },
        {
            id: 2,
            name: 'Test Server',
            status: 'offline'
        },
        {
            id: 3,
            name: 'Dev Server',
            status: 'offline'
        }
    ];

    getServers() {
        return this.servers;
    }

    getServer(id: number): Server {
        return <Server> this.servers.find(server =>  server.id === id);
    }

    updateServer(id: number, serverInfo: { name: string, status: string }) {
        const server = this.getServer(id);
        if (server) {
            server.name = serverInfo.name;
            server.status = serverInfo.status;
        }
    }
}
