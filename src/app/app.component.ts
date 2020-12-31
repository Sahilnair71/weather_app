import { Component, OnInit } from '@angular/core';

import { RecordService } from './record.service';

import { from } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weatherapp';
  latitude: number;
  longitude: number;
  lat: number;
  lon: number;
  value: string = '';
  dvalue: string = '';
  date: any;
  icon_type: string = 'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png';
  icon_type_currentday: string = 'https://cdn3.iconfinder.com/data/icons/logos-and-brands-adobe/512/21_Angular-512.png';
  svalue: any[] = [];
  iconvalue_array: any[] = [];
  combinedarray: { icon_path_obtained: any, api_data: any }[] = [];
  loading_main = true;
  loading_forcast = true;






  weathervalue = {
    city: '',
    decrip: '',
    icon: '',
    temp: 0,
    sunrise: 0,
    sunset: 0
  }

  forcastvalue = {
    decrip: '',
    icon: '',
    temp: 0,
    sunrise: 0,
    sunset: 0,
    date: 0,

  }

  constructor(private rservice: RecordService) { }



  ngOnInit() {
    this.getPosition();
    this.fetchdata();
    this.nextdata();




  }

  getPosition() {

    if (navigator.geolocation) {
      return new Promise(result => {
        navigator.geolocation.getCurrentPosition(position => {
          //console.log(position);
          this.lat = position.coords.latitude;
          this.lon = position.coords.longitude;
          //console.log(this.lat);
          //console.log(this.lon);
          result();
        })
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }


  }
  async fetchdata() {
    await this.getPosition();

    this.rservice.getcomments(this.lat, this.lon).subscribe(val => {
      this.value = val
      console.log(this.value);
      this.weathervalue = {
        city: this.value['data'][0]['city_name'],
        decrip: this.value['data'][0]['weather']['description'],
        icon: this.value['data'][0]['weather']['icon'],
        temp: this.value['data'][0]['temp'],
        sunrise: this.value['data'][0]['sunrise'],
        sunset: this.value['data'][0]['sunset']

      }
      console.log('current', this.geticon_for_currentday(this.weathervalue.icon))

      this.loading_main = false;





    }
    );

  }


  async nextdata() {
    let sitem: any[] = [];

    await this.getPosition();
    this.rservice.getvalue(this.lat, this.lon).subscribe(res => {
      this.dvalue = res
      sitem = this.dvalue['data'];
      this.svalue = sitem.splice(1, 4);
      //console.log(this.svalue)
      /** this.forcastvalue={
        decrip:this.svalue[0]['weather']['description'],
        icon:this.svalue[0]['weather']['icon'],
        temp:this.svalue[0]['temp'],
        sunrise:this.svalue[0]['sunrise_ts'],
        sunset:this.svalue[0]['sunset_ts'],
        date:this.svalue[0]['datetime']

      }*/

      // selecting each element of api array     
      this.svalue.forEach(value => {
        //console.log("ICON", value['weather']['icon'])
        //console.log(this.geticon(value['weather']['icon']));
        this.geticon(value['weather']['icon']);
      })

      // creating a combined array consisting of api data and the icon path for each data obtained 
      this.iconvalue_array.forEach((icon, index) => { this.combinedarray.push({ icon_path_obtained: icon, api_data: this.svalue[index] }) }
      )
      //console.log(this.combinedarray)
      this.loading_forcast = false;

    })
  }


  //getting icon path for current day
  geticon_for_currentday(icon: string) {
    let path: string = 'assets/'
    console.log(icon, 'getting')
    switch (icon) {
      case 't01d':
      case 't01n':
      case 't02d':
      case 't02n':
      case 't03d':
      case 't03n':
      case 't04d':
      case 't04n':
      case 't05d':
      case 't05n':
        this.icon_type_currentday = `${path}lightning.png`;
        break;
      case 'd01d':
      case 'd01n':
      case 'd02d':
      case 'd02n':
      case 'd03d':
      case 'd03n':
      case 'r01d':
      case 'r01n':
      case 'r02d':
      case 'r02n':
      case 'r03d':
      case 'r03d':
      case 'f01d':
      case 'f01n':
      case 'r04d':
      case 'r04n':
      case 'r05d':
      case 'r05n':
      case 'r06d':
      case 'r06n':
        this.icon_type_currentday = `${path}rain.png`;
        break;
      case 's01d':
      case 's01n':
      case 's02d':
      case 's02n':
      case 's03d':
      case 's03n':
      case 's04d':
      case 's04n':
      case 's06d':
      case 's06n':
        this.icon_type_currentday = `${path}snowflake.png`;
        break;
      case 's05d':
      case 's05n':
        this.icon_type_currentday = `${path}wind.png`;
        break;
      case 'a01d':
      case 'a01n':
      case 'a02d':
      case 'a02n':
      case 'a03d':
      case 'a03n':
      case 'a04d':
      case 'a04n':
      case 'a05d':
      case 'a05n':
      case 'a06d':
      case 'a06n':
        this.icon_type_currentday = `${path}sea.png`;
        break;
      case 'c01d':
      case 'c01n':
        this.icon_type_currentday = `${path}clowdy.png`;
        break;
      case 'c02d':
      case 'c02n':
        this.icon_type_currentday = `${path}cloudy.png`;
        break;
      case 'c03d':
      case 'c03n':
      case 'c04d':
      case 'c04n':
        this.icon_type_currentday = `${path}clouds.png`;
        break;
      case 'u00d':
      case 'u00n':
        this.icon_type_currentday = `${path}stress.png`;
        break;
      default:
        console.log('SWITCH Default');
    }
    return this.icon_type_currentday

  }


  //getting icon path for next 4 days

  geticon(icon_value: string) {
    let path: string = 'assets/'
    //console.log(icon_value)



    switch (icon_value) {
      case 't01d':
      case 't01n':
      case 't02d':
      case 't02n':
      case 't03d':
      case 't03n':
      case 't04d':
      case 't04n':
      case 't05d':
      case 't05n':
        this.icon_type = `${path}lightning.png`;
        this.iconvalue_array.push(this.icon_type)//creating a new array of icon paths
        break;

      case 'd01d':
      case 'd01n':
      case 'd02d':
      case 'd02n':
      case 'd03d':
      case 'd03n':
      case 'r01d':
      case 'r01n':
      case 'r02d':
      case 'r02n':
      case 'r03d':
      case 'r03d':
      case 'f01d':
      case 'f01n':
      case 'r04d':
      case 'r04n':
      case 'r05d':
      case 'r05n':
      case 'r06d':
      case 'r06n':
        this.icon_type = `${path}rain.png`;
        this.iconvalue_array.push(this.icon_type)
        break;
      case 's01d':
      case 's01n':
      case 's02d':
      case 's02n':
      case 's03d':
      case 's03n':
      case 's04d':
      case 's04n':
      case 's06d':
      case 's06n':
        this.icon_type = `${path}snowflake.png`;
        this.iconvalue_array.push(this.icon_type)
        break;
      case 's05d':
      case 's05n':
        this.icon_type = `${path}wind.png`;
        this.iconvalue_array.push(this.icon_type)
        break;
      case 'a01d':
      case 'a01n':
      case 'a02d':
      case 'a02n':
      case 'a03d':
      case 'a03n':
      case 'a04d':
      case 'a04n':
      case 'a05d':
      case 'a05n':
      case 'a06d':
      case 'a06n':
        this.icon_type = `${path}sea.png`;
        this.iconvalue_array.push(this.icon_type)
        break;
      case 'c01d':
      case 'c01n':
        this.icon_type = `${path}clowdy.png`;
        this.iconvalue_array.push(this.icon_type)
        break;
      case 'c02d':
      case 'c02n':
        this.icon_type = `${path}cloudy.png`;
        this.iconvalue_array.push(this.icon_type)
        break;
      case 'c03d':
      case 'c03n':
      case 'c04d':
      case 'c04n':
        this.icon_type = `${path}clouds.png`;
        this.iconvalue_array.push(this.icon_type)
        break;


      case 'u00d':
      case 'u00n':
        this.icon_type = `${path}stress.png`;
        this.iconvalue_array.push(this.icon_type)
        break;
      default:
        console.log('SWITCH Default');

      //return this.icon_type;

    }

    //console.log(this.svalue)



  }











}
