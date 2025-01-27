import { Component } from '@angular/core';
import {Driver} from '../service/hardcode.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NavbarComponent
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  driver!: Driver | undefined;

  protected readonly localStorage = localStorage;
  protected readonly sessionStorage = sessionStorage;

  constructor(private router: Router, private http: HttpClient) {
  }

  LogUserOut() {
    sessionStorage.setItem('isloged','false');
    sessionStorage.removeItem("username")
    this.router.navigate(['/']);
  }


  //profile picture

  selectedFile: File = {} as File;


  onFileSelected(event :Event): void {
    //this.selectedFile = event.target.files[0];
  }

  changePicture(): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.selectedFile);
    reader.onload = () => {
      const blob = new Blob([reader.result], { type: this.selectedFile.type });
      this.uploadImage(blob);
    };
  }

  uploadImage(blob: Blob): void {
    const formData = new FormData();
    formData.append('image', blob, this.selectedFile.name);
    this.http.post('/api/upload', formData).subscribe(
      (response) => console.log(response),
      (error) => console.log(error)
    );
  }
}
