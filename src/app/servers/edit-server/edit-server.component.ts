import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { ServersService } from '../servers.service';
import { Server } from '../server.model';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html',
    styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
    server: Server;
    serverName = '';
    serverStatus = '';
    allowEdit = false;

    constructor(
        private serversService: ServersService,
        private activatedRoute: ActivatedRoute
    ) {
        this.server = this.serversService.getServer(1);
    }

    ngOnInit() {
        this.serverName = this.server.name;
        this.serverStatus = this.server.status;

        // non-reactive approach
        // console.log(this.activatedRoute.snapshot.queryParams);
        // console.log(this.activatedRoute.snapshot.fragment);

        // reactive approach (recommended)
        this.activatedRoute.queryParams.subscribe((params: Params) => {
            console.log(params);
            this.allowEdit = params['allowEdit'] === '1'
        });
        this.activatedRoute.fragment.subscribe((fragment) => {
            console.log(fragment);
        });
    }

    onUpdateServer() {
        this.serversService.updateServer(this.server.id, { name: this.serverName, status: this.serverStatus });
    }
}
