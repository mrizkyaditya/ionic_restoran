import { Injectable } from '@angular/core';
import { ApiService } from './api-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransaksiService extends ApiService {
    protected override apiTable: string = "transaksis";

    whereUserId(user_id:any) : Observable<any>
    {
      return this.http.get(this.singleton.apiUrl+"/api/transaksis/user/"+user_id, {
        headers:this.singleton.get_header()
      })
    }

    uploadBukti(transaksi_id:any, params:any):Observable<any>
    {
      let headers = this.singleton.get_header();
      headers.append('enctype', 'multipart/form-data');
      headers.append('Accept', 'application/json');
      return this.http.post(this.singleton.apiUrl+"/api/transaksis/"+transaksi_id, params, 
        {
          headers : headers
        });
    }

    whereKodeTransaksi(kode: string): Observable<any> {
    return this.http.get(`${this.singleton.apiUrl}/api/transaksis/kode_transaksi/${kode}`, {
      headers: this.singleton.get_header()
    });
}

}
