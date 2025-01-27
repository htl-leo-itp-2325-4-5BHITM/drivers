import { Component } from '@angular/core';
import {Driver} from '../service/hardcode.service';
import {NavbarComponent} from '../navbar/navbar.component';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';
import {UserService} from '../service/user.service';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    NavbarComponent,
    FormsModule,
    NgIf
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {
  driver!: Driver | undefined;

  protected readonly localStorage = localStorage;
  protected readonly sessionStorage = sessionStorage;
  private selectedFile: File | undefined;

  constructor(private router: Router, private userService :UserService) {
  }

  LogUserOut() {
    sessionStorage.setItem('isloged','false');
    sessionStorage.removeItem("username")
    this.router.navigate(['/']);
  }


  //profile picture


  /*selectedFile: File = {} as File;
  profileImage: string | ArrayBuffer;
  userId = 1; // Beispiel-ID des Benutzers


  onFileSelected(event :Event): void {
    //this.selectedFile = event.target.files[0];
  }

  changePicture(): void {
    const reader = new FileReader();
    reader.readAsArrayBuffer(this.selectedFile);
    reader.onload = () => {
      // @ts-ignore
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
  }*/
/*
  selectedFile: File | null = null;
  profileImage: string | ArrayBuffer | null = null;
  userId = 1; // Beispiel-ID des Benutzers


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0]; // Optional Chaining, um Null- und Undefined-Werte zu vermeiden


    if (input?.files && input.files.length > 0) {
      this.selectedFile = input?.files[0]; // Zugriff auf die erste Datei

      // Vorschau anzeigen
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      console.warn('No file selected or input is null');
    }

    if (file && file[0]) {
      this.selectedFile = file[0];

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result;
        };
        reader.readAsDataURL(this.selectedFile); // Sicher, weil geprüft wurde
      } else {
        console.error('No file selected');
      }
    }
  }

  uploadImage() {
    if (!this.selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http
      .post(`http://localhost:8080/users/${this.userId}/upload-image`, formData, { responseType: 'text' })
      .subscribe(
        (response) => {
          alert('Image uploaded successfully');
        },
        (error) => {
          console.error('Error uploading image', error);
          alert('Error uploading image');
        }
      );
  }

  fetchImage() {
    this.http
      .get(`http://localhost:8080/users/${this.userId}/profile-image`, { responseType: 'blob' })
      .subscribe((blob) => {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result;
        };
        reader.readAsDataURL(blob);
      });
  }

  ngOnInit() {
    this.fetchImage(); // Lade das Bild beim Initialisieren
  }*/
  profileImage: any;
  uploadImage() {
    if (!this.selectedFile) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.userService.changeProfilePicture(formData)
    /*this.http
      .post(`http://localhost:8080/users/${this.userId}/upload-image`, formData, { responseType: 'text' })
      .subscribe(
        (response) => {
          alert('Image uploaded successfully');
        },
        (error) => {
          console.error('Error uploading image', error);
          alert('Error uploading image');
        }
      );*/
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.item(0); // Optional Chaining, um Null- und Undefined-Werte zu vermeiden


    if (input?.files && input.files.length > 0) {
      this.selectedFile = input?.files[0]; // Zugriff auf die erste Datei

      // Vorschau anzeigen
      const reader = new FileReader();
      reader.onload = () => {
        this.profileImage = reader.result;
      };
      if(file != null) {
        reader.readAsDataURL(file);
      }
    } else {
      console.warn('No file selected or input is null');
    }

    if (file) {
      this.selectedFile = file;

      if (this.selectedFile) {
        const reader = new FileReader();
        reader.onload = () => {
          this.profileImage = reader.result;
        };
        reader.readAsDataURL(this.selectedFile); // Sicher, weil geprüft wurde
      } else {
        console.error('No file selected');
      }
    }
  }
}
