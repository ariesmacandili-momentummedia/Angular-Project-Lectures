import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';
import { Server } from '../server.model';

@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
    server: Server;

    constructor(
        private serversService: ServersService,
        private activatedRoute: ActivatedRoute
    ) {
        this.server = this.serversService.getServer(+this.activatedRoute.snapshot.params['id']);
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.server = this.serversService.getServer(+params['id']);
        });
    }

}
