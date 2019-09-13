
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dummy from "../shared/dummy.json";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  private foundShipmentID: boolean = false;

  // Getting mock data from dummy.json. This can be replaced by a service in the actual app.
  private shipmentData: Object = dummy['default'];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.extractUrlData();
  }

  extractUrlData(): void {
    const shipmentID: string = this.activatedRoute.snapshot.paramMap.get('shipmentID');    
    if (shipmentID) {
      this.getShipmentDetails(shipmentID);
    } else {
      this.router.navigate(['/']);
    }
  }

  getShipmentDetails(shipmentID): void {
    if (this.shipmentData && this.shipmentData['sea_shipments'][0]['id'] === +shipmentID) {
      this.foundShipmentID = true;
    }
  }
  
}
