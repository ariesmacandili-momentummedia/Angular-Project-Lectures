import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { ServersService } from '../servers.service';
import { Server } from '../server.model';
import { CanComponentDeactivate } from './can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-edit-server',
    templateUrl: './edit-server.component.html',
    styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {
    server: Server;
    serverName = '';
    serverStatus = '';
    allowEdit = false;
    changesSaved = false;

    constructor(
        private serversService: ServersService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.server = this.serversService.getServer(+this.activatedRoute.snapshot.params['id']);
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
        this.changesSaved = true;
        this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }

    canDeactivate() : Observable<boolean> | Promise<boolean> | boolean {
        if (!this.allowEdit) {
            return true;
        }

        if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
            return confirm('Do you want to discard the changes?');
        }

        return true;
    }
}
