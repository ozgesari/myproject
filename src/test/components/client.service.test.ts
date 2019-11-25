import { Injectable } from '@angular/core';
import { ClientService } from '../../app/service/client.service';

@Injectable()
export class ClientServiceTest {
    constructor(private clientService: ClientService) { }
}