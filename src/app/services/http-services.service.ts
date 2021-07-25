import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
// import {Md5} from 'ts-md5/dist/md5';

@Injectable({
  providedIn: 'root'
})
export class HttpServicesService {
    url:any="https://gateway.marvel.com/v1/public/";
    timeStamp:any="1";
    publicKey="83f0c13c5feb83cf5f1da4ec40ab9de1";
    privateKey="004700182ce5d2fcdefd3cd68d04bba3f00bc1e3";
    // md5=new Md5();
    // hash:any=this.md5.appendStr(this.timeStamp+this.privateKey+this.publicKey).end();
    hash:any="1fcb4c29c005e0491255c5136cbfaf9d"

    params:any={
      "ts":this.timeStamp,
      "apikey":this.publicKey,
      "hash":this.hash,
    }

  constructor(private http:HttpClient) { 

  }

  //getComicDetails
  getComics(offset:number,limit?:number){
    this.params.offset=offset.toString();
    this.params.limit=limit?.toString();
    return new Promise((resolve,reject)=>{
      this.http.get(`${this.url}comics`,{params:this.params})
      .subscribe(resolve,reject);
    })
  }

  //get Individual comic details
  getSingleComic(comicId:string){
    return new Promise((resolve,reject)=>{
      this.http.get(`${this.url}comics/${comicId}`,{params:this.params})
      .subscribe(resolve,reject);
    })
  }
}

