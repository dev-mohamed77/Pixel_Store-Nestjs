import { Injectable } from '@nestjs/common';
import { CloudinaryResponse } from './cloudinary.response';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  uploadImage(
    file: Express.Multer.File,
    fileName: string,
  ): Promise<CloudinaryResponse> {
    return this.uploadFile(file, fileName);
  }

  uploadVideo(file: Express.Multer.File, fileName: string) {
    return this.uploadFile(file, fileName, false);
  }

  private uploadFile(
    file: Express.Multer.File,
    fileName: string,
    isImage = true,
  ): Promise<CloudinaryResponse> {
    return new Promise<CloudinaryResponse>((resolve, reject) => {
      cloudinary.uploader.upload(
        file.path,
        {
          resource_type: isImage ? 'image' : 'video',
          public_id: `${Date.now()}__${fileName}`,
          folder: fileName,
        },

        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        },
      );
    });
  }
}
