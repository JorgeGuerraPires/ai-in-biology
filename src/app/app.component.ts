import { Component } from '@angular/core';

import * as tmImage from '@teachablemachine/image';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  selectedImage!: string;

  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImage = e.target.result;
        this.processImage(this.selectedImage); // Chamada da função com a imagem selecionada

      };
      reader.readAsDataURL(file);
    }
  }


  prediction: any;

  async processImage(imageData: string) {

    // the link to your model provided by Teachable Machine export panel
    // https://teachablemachine.withgoogle.com/models/Sc8mKQsS0/
    const URL = 'https://teachablemachine.withgoogle.com/models/Sc8mKQsS0/';
    let model;

    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    model = await tmImage.load(modelURL, metadataURL);

    var image: any = document.getElementById("img");

    this.prediction = await model.predict(image);

    console.log(this.prediction);




  }



}
