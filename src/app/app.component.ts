import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestComponent } from './test/test.component';
import { CommonModule } from '@angular/common';
import { WeatherDisplayComponent } from './weather-display/weather-display.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TestComponent, WeatherDisplayComponent, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit{
  headers: HttpHeaders;
  hourlyData;
  dailyData;
  searchTerm= '';
  place_name= 'Exeter';
  constructor(public httpClient: HttpClient) {
    let headers = new HttpHeaders();
    this.headers = headers.set('apikey', 'eyJ4NXQiOiJOak16WWpreVlUZGlZVGM0TUdSalpEaGtaV1psWWpjME5UTXhORFV4TlRZM1ptRTRZV1JrWWc9PSIsImtpZCI6ImdhdGV3YXlfY2VydGlmaWNhdGVfYWxpYXMiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJhbmRyZXcucG95bnR6QG1ldG9mZmljZS5nb3YudWtAY2FyYm9uLnN1cGVyIiwiYXBwbGljYXRpb24iOnsib3duZXIiOiJhbmRyZXcucG95bnR6QG1ldG9mZmljZS5nb3YudWsiLCJ0aWVyUXVvdGFUeXBlIjpudWxsLCJ0aWVyIjoiVW5saW1pdGVkIiwibmFtZSI6InNpdGVfc3BlY2lmaWMtZDllNGQwZDktNTQ2YS00YTg5LWFmOGQtZWJiMzU3OTRmZmFiIiwiaWQiOjYxMzIsInV1aWQiOiJiMGQ0MDAwOC0wNzFkLTRjZmUtYWVmNS05NzE4ZjdlZDBlNjcifSwiaXNzIjoiaHR0cHM6XC9cL2FwaS1tYW5hZ2VyLmFwaS1tYW5hZ2VtZW50Lm1ldG9mZmljZS5jbG91ZDo0NDNcL29hdXRoMlwvdG9rZW4iLCJ0aWVySW5mbyI6eyJ3ZGhfc2l0ZV9zcGVjaWZpY19mcmVlIjp7InRpZXJRdW90YVR5cGUiOiJyZXF1ZXN0Q291bnQiLCJncmFwaFFMTWF4Q29tcGxleGl0eSI6MCwiZ3JhcGhRTE1heERlcHRoIjowLCJzdG9wT25RdW90YVJlYWNoIjp0cnVlLCJzcGlrZUFycmVzdExpbWl0IjowLCJzcGlrZUFycmVzdFVuaXQiOiJzZWMifX0sImtleXR5cGUiOiJQUk9EVUNUSU9OIiwic3Vic2NyaWJlZEFQSXMiOlt7InN1YnNjcmliZXJUZW5hbnREb21haW4iOiJjYXJib24uc3VwZXIiLCJuYW1lIjoiU2l0ZVNwZWNpZmljRm9yZWNhc3QiLCJjb250ZXh0IjoiXC9zaXRlc3BlY2lmaWNcL3YwIiwicHVibGlzaGVyIjoiSmFndWFyX0NJIiwidmVyc2lvbiI6InYwIiwic3Vic2NyaXB0aW9uVGllciI6IndkaF9zaXRlX3NwZWNpZmljX2ZyZWUifV0sInRva2VuX3R5cGUiOiJhcGlLZXkiLCJpYXQiOjE3MjU0NTU2NzEsImp0aSI6ImIwZTY5YmIzLTk0MmYtNGNjOC1hZWMzLTkyNWY5NmIyNmIwZiJ9.NvmvnqIcqN4DOj0xODz6ShDHNbH-cXyNFOnm0bdicw_-Hd2GwLAnNWjhsx1ij31AY1OFwRfkU-FtTaXRKFD2aDAWQMAXdIt58qzsDnDn2OqGKV4UhWajUMU3wYDTcAgiyD-miE19SjYVYtYcUSMlDn07o8ObVGb29YGpNa-zjPgcav8M8te7l1yDz8U1ZwEnk-8aCd4aG434ergj25v5jLV4yDXJqKPgJytMzbN0mTGWYs0J1p3UIVXfFUCQb3OFvz2AvfkxMMHNqAYvoVCKjXCqDlsC5GYTJA9zK03YSaakoeEhKXSoyU_pjLZR_Q3_TwcTPUshl2M7Jgsa5ado8g==');
  }

  
  getData = (lat, lon) =>{
    
    this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/hourly?latitude=${lat}&longitude=${lon}`, {headers:this.headers}).subscribe((data:any) => {
      //this.httpClient.get(`./hourlyData.json`, {headers:this.headers}).subscribe((data:any) => {
      console.log(data);
      this.hourlyData = data.features[0].properties.timeSeries[2];
      console.log(this.hourlyData);
    })    
    
    this.httpClient.get(`https://data.hub.api.metoffice.gov.uk/sitespecific/v0/point/daily?latitude=${lat}&longitude=${lon}`, {headers:this.headers}).subscribe((data:any) => {
      //this.httpClient.get(`./hourlyData.json`, {headers:this.headers}).subscribe((data:any) => {
      console.log(data);
      this.dailyData = data.features[0].properties.timeSeries;
      this.dailyData.shift();
      console.log(this.dailyData);
    })
  }

  getLocation () {
    console.log('get location data', this.searchTerm);
    this.httpClient.get(`https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?f=json&searchExtent=-8,49,2,61&SingleLine=${this.searchTerm}`).subscribe((location_result:any) => {
      console.log(location_result);
      //obtain place name
      const place_name_response = (location_result).candidates[1].address;
      this.place_name = place_name_response.split(',')[0];
      //obtain co-ordinates
      const location = location_result.candidates[0].location;
      const lat = (location).y;
      const lon = (location).x;
      this.getData(lat, lon);
    })
  }
  ngOnInit() {
    this.getData(50.7271, -3.4751);
  }

  clearSearchInput () {
    this.searchTerm = '';
  }
}
