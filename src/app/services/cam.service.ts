import { Injectable } from '@angular/core';
import { Camera, PermissionStatus, Photo } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class CamService {

  private readonly photos: Photo[] = [];
  private readonly storageKey = 'photos';
  private photoURIs: string[];
  private permissionGranted: PermissionStatus = {camera: 'granted', photos: 'granted'};

  constructor() { }

  getPhotos(): Photo[] {
    return this.photos;
  }

  private async retrievePhotoURIs(): Promise<void>{
    const uris = await Storage.get({key: this.storageKey});
    // als niets wordt bewaard onder "storageKey" return null
    this.photoURIs = JSON.parse(uris.value) || [];
  }

  private async persistPhotoURIs(): Promise<void>{
    await Storage.set({
      key: this.storageKey,
      value: JSON.stringify(this.photoURIs)
    });
  }

  private async requestPermissions(): Promise<void> {
    try {
      this.permissionGranted =
        await Camera.requestPermissions({permissions: ['photos', 'camera']});
    } catch (error) {
      console.error(
       `Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`
      );
    }
  }

  private async retrievePermissions(): Promise<void> {
    try {
      this.permissionGranted = await Camera.checkPermissions();
    } catch (error) {
      console.error(
        `Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`
      );
    }
  }
}
