import fs from "fs";
import { google } from "googleapis";
import { drive_v3 } from "googleapis/build/src/apis/drive/v3";
import { GoogleAuth } from "google-auth-library";
import { v4 as uuidv4 } from 'uuid';

interface IUpload {
  FILE_INFO: {
    fieldname: string;
    originalname: string;
    mimetype: string;
    filename: string;
    path: string;
    size: number;
  };
}

export class GoogleDrive {
  private readonly GOOGLE_API_FOLDER_ID: string;
  private readonly GOOGLE_SCOPES: string[];
  private readonly GOOGLE_SERVICES: drive_v3.Drive;
  private readonly GOOOGLE_AUTH: GoogleAuth;


  constructor() {
    this.GOOGLE_API_FOLDER_ID = "17ppcLCGGl9a4Dia2lElrO9y-XH5uzD7Q";
    this.GOOGLE_SCOPES = ["https://www.googleapis.com/auth/drive"];
    this.GOOOGLE_AUTH = new google.auth.GoogleAuth({
      keyFile: "google_drive_key.json",
      scopes: this.GOOGLE_SCOPES,
    });
    this.GOOGLE_SERVICES = google.drive({
      version: "v3",
      auth: this.GOOOGLE_AUTH,
    });
  }

  async upload({FILE_INFO}:IUpload) {
    try {
      const fileMetadata = {
        name: uuidv4(),
        parents: [this.GOOGLE_API_FOLDER_ID],
      };

      const media = {
        mimeType: FILE_INFO.mimetype,
        body: fs.createReadStream(FILE_INFO.path),
      };

      const response = await this.GOOGLE_SERVICES.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: "id",
      });

      return response.data.id;
    } catch (error) {
      return error;
    }
  }
}
