import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { Server } from '../server.model';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
    server: Server;

    constructor(private serversService: ServersService) {
        this.server = this.serversService.getServer(1);
    }

    ngOnInit() {
        this.server = this.serversService.getServer(1);
    }

}
