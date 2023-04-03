import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ServersService } from './servers.service';
import { Server } from './server.model';

@Component({
    selector: 'app-servers',
    templateUrl: './servers.component.html',
    styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
    public servers: Server[] = [];

    constructor(
        private serversService: ServersService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.servers = this.serversService.getServers();
    }

    onReloadPage() {
        // this.router.navigate(['servers'], { relativeTo: this.route });
    }
}
