import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { RESTService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgIconOverrides } from '@ngbmodule/material-carousel';
import { data } from 'jquery';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})

export class HotelComponent implements OnInit {

  form: FormGroup;

  sortOrders = [
    "BEST_SELLER",
    "PRICE",
    "PRICE_HIGHEST_FIRST",
    "STAR_RATING_HIGHEST_FIRST",
    "STAR_RATING_LOWEST_FIRST",
    "GUEST_RATING"
  ];

  icons: SvgIconOverrides = {
    arrowBack: 'arrow_back',
    arrowForward: 'arrow_forward'
  };

  is_loading = false;
  show_info =false;
  is_welcome = true;
  is_hotels = false;

  province = "";
  city: any;
  provinces: any;
  cities: any;
  city_desc = "";
  city_img ="";
  city_imgs: any;
  hotels: any;

  constructor(public rest: RESTService, private route: ActivatedRoute, 
    private router: Router, private cdRef: ChangeDetectorRef,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, fb: FormBuilder) { 
      
      this.form = fb.group({
        checkIn: new FormControl(),
        checkOut: new FormControl(),
        rooms: new FormControl(1, [Validators.max(5), Validators.min(1)]),
        sortOrder: new FormControl()
      });

      this.getProvinces();
      iconRegistry.addSvgIcon(
        'arrow_back',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/left_arrow.svg')
      );
  
      iconRegistry.addSvgIcon(
        'arrow_forward',
        sanitizer.bypassSecurityTrustResourceUrl('assets/img/right_arrow.svg')
      );
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }


  /* ----------======== Obtiene todas las provincias del Ecuador ========---------- */
  getProvinces(){
    this.rest.getProvinces().subscribe((data: any[]) => {
      this.provinces = data['data'];
    });
  }

  /* ----------========== Obtiene las ciudades de una provincia ==========---------- */
  getCities(){
    this.rest.getCities(this.province).subscribe((data: any[]) => {
      this.cities = data["data"];
    });
  }

  /* ----------======= Obtiene una pequeña descripción de la ciudad =======---------- */
  getCityInfo(){
    this.hotels = [];
    this.is_loading = true;
    this.is_welcome = false;
    this.show_info = false;
    this.rest.getCityInfo(this.city.city).subscribe((data: any[]) => {
      this.city_desc = data["data"]["wiki"];
      this.city_img = data["data"]["imgs"][0];
      this.city_imgs = data["data"]["imgs"];
      this.is_loading = false;
      this.show_info =true;
    });
  }

  /* ----------======= Obtiene informacion de los hoteles de una ciudad =======---------- */
  getHotels(){
    this.is_hotels = true;
    this.rest.getHotels(
      this.city.lat,
      this.city.lng,
      new Date(this.form.get("checkIn").value).toISOString().slice(0,10),
      new Date(this.form.get("checkOut").value).toISOString().slice(0,10),
      this.form.get("rooms").value,
      this.form.get("sortOrder").value).subscribe((data: any[]) => {
      this.hotels = data["data"];
      this.is_hotels = false;
    });
  }

}
