
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as dummy from "../shared/dummy.json";
import { diffFromToday } from "../shared/utils";

@Component({
  selector: 'app-track',
  templateUrl: './track.component.html',
  styleUrls: ['./track.component.scss']
})
export class TrackComponent implements OnInit {

  private foundShipmentID: boolean = false;

  // Getting mock data from dummy.json. This can be replaced by a service in the actual app.
  private shipmentData: Object = dummy['default'];
  private filteredData: Array<Object> = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.extractUrlData();
  }

  getDateDiff(timestamp: string): string {
    return diffFromToday(new Date(timestamp));
  }

  extractUrlData(): void {
    const shipmentID: string = this.activatedRoute.snapshot.paramMap.get('shipmentID');  
    if (shipmentID) {
      this.getShipmentDetails(shipmentID);
    } else {
      this.router.navigate(['/']);
    }
  }

  getShipmentDetails(shipmentID: string): void {
    if (this.shipmentData && this.shipmentData['sea_shipments'][0].id === +shipmentID) {
      this.foundShipmentID = true;
      this.computeFilteredData(this.shipmentData);
    }
  }

  computeFilteredData(shipmentData: Object): void {
    const departures = [];
    const arrivals = [];
    for (let item of shipmentData['sea_shipments'][0].sea_movements) {
      departures.push({readings: item.vessel_telo_loading.readings[0], location: item.vessel_telo_loading.location});
      arrivals.push({readings: item.vessel_telo_discharge.readings[0], location: item.vessel_telo_discharge.location});
    }

    // since departures will always be greater than arrivals
    for (let i = 0; i < departures.length; i++) {
      this.filteredData.push(departures[i]);
      this.filteredData.push(arrivals[i]);
    }
  }

}
