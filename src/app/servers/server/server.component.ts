import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';

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
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.server = this.serversService.getServer(+this.activatedRoute.snapshot.params['id']);
    }

    ngOnInit() {
        // this.activatedRoute.params.subscribe((params: Params) => {
        //     this.server = this.serversService.getServer(+params['id']);
        // });

        this.activatedRoute.data.subscribe((data: Data) => {
            this.server = data['server'];
        });
    }

    onEditServer() {
        // Since this component is a child of the parent route (/servers) and the /servers/:id route,
        //    we can just simply add the "edit" string literal and it will automatically append it to the existing route
        //    (which in this case, the /servers/:id route).
        // The resulting route would be "/servers/:id/edit".
        this.router.navigate(['edit'], { relativeTo: this.activatedRoute, queryParamsHandling: 'preserve' });
    }
}
