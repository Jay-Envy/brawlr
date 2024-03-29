import {Injectable} from '@angular/core';
import {Camera, CameraResultType, CameraSource, PermissionStatus, Photo} from '@capacitor/camera';
import {Directory, Filesystem, ReaddirResult} from '@capacitor/filesystem';
import {Preferences} from '@capacitor/preferences';
import {Capacitor} from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  private readonly photos: Photo[] = [];

  private readonly storageKey = 'photos';

  private photoURIs: string[];

  private permissionGranted: PermissionStatus = {camera: 'granted', photos: 'granted'};

  constructor() {
    this.loadData();
  }

  getPhotos(): Photo[] {
    return [...this.photos];
  }

  async takePhoto(): Promise<void> {
    if (!this.haveCameraPermission() || !this.havePhotosPermission()) {
      await this.requestPermissions();
    }

    if (Capacitor.isNativePlatform()) {
      await this.takePhotoNative();
    } else {
      await this.takePhotoPWA();
    }
    await this.persistPhotoURIs();
  }

  private async takePhotoNative(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      saveToGallery: this.havePhotosPermission(),
      source: this.determinePhotoSource()
    });

    this.photoURIs.push(image.path);
    this.photos.push(image);
  }

  private async takePhotoPWA(): Promise<void> {
    const image = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera
    });

    const uri = await this.saveImageToFileSystem(image);
    this.photoURIs.push(uri);
    image.path = uri;

    image.dataUrl = `data:image/${image.format};base64,${image.base64String}`;
    this.photos.push(image);
  }

  private determinePhotoSource(): CameraSource {
    if (this.havePhotosPermission() && this.haveCameraPermission()) {
      return CameraSource.Prompt;
    } else {
      return this.havePhotosPermission() ? CameraSource.Photos : CameraSource.Camera;
    }
  }

  private async loadPhotos(): Promise<void> {
    if (Capacitor.isNativePlatform()) {
      await this.loadPhotosNative();
    } else {
      await this.loadPhotosPWA();
    }
  }

  private async loadPhotosPWA(): Promise<void> {
    for (const uri of this.photoURIs) {

      const data = await Filesystem.readFile({
        path: uri
      });

      const format = this.getPhotoFormat(uri);
      this.photos.push({
        dataUrl: `data:image/${format};base64,${data.data}`,
        format,
        saved: false
      });
    }
  }

  private async loadPhotosNative(): Promise<void> {
    for (const uri of this.photoURIs) {
      this.photos.push({
          path: uri,
          format: this.getPhotoFormat(uri),
          webPath: Capacitor.convertFileSrc(uri),
          saved: this.havePhotosPermission()
      });
    }
  }

  private getPhotoFormat(uri: string): string {
    const splitUri = uri.split('.');
    return splitUri[splitUri.length - 1];
  }

  private async saveImageToFileSystem(photo: Photo): Promise<string> {
    const fileName = `${new Date().getTime()}.${photo.format}`;
    const savedFile = await Filesystem.writeFile({
      path: fileName,
      data: photo.base64String,
      directory: Directory.Data
    });
    return savedFile.uri;
  }

  private haveCameraPermission(): boolean {
    return this.permissionGranted.camera === 'granted';
  }

  private havePhotosPermission(): boolean {
    return this.permissionGranted.photos === 'granted';
  }

  private async requestPermissions(): Promise<void> {
    try {
      this.permissionGranted = await Camera.requestPermissions({permissions: ['photos', 'camera']});
    } catch (error) {
      console.error(`Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`);
    }
  }

  private async retrievePermissions(): Promise<void> {
    try {
      this.permissionGranted = await Camera.checkPermissions();
    } catch (error) {
      console.error(`Permissions aren't available on this device: ${Capacitor.getPlatform()} platform.`);
    }
  }

  private async retrievePhotoURIs(): Promise<void> {
    const uris = await Preferences.get({key: this.storageKey});
    this.photoURIs = JSON.parse(uris.value) || [];
  }

  private async persistPhotoURIs(): Promise<void> {
    await Preferences.set({
      key: this.storageKey,
      value: JSON.stringify(this.photoURIs)
    });
  }

  private async loadData(): Promise<void> {
    await this.retrievePhotoURIs();
    await this.retrievePermissions();
    await this.loadPhotos();
  }
}
