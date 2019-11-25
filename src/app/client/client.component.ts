import { Component, OnInit } from '@angular/core';
import { Observable, from } from 'rxjs';
import { ClientService } from '../service/client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  clientResponse: any;
  modalIndex: number;
  clientId: string;
  errorResponse: any;

  constructor(private route: ActivatedRoute, private clientService: ClientService, private router: Router) { }

  ngOnInit() {
    
    this.route.paramMap.subscribe(params => {
        this.clientId = params.get('id');
        if(this.clientId) {
          this.clientService.getClientDetails(this.clientId)
          .pipe()
          .subscribe(
            result => {
              this.clientResponse = result;
            },
            err => {
              this.clientResponse = null;
              this.errorResponse = err.error;
                // Re-route to login if token is expired.
                if(err.status == 401) { this.router.navigate(['login']); }    
            });
        }
    });
  }
}