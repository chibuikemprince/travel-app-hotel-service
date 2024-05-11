import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleAuthService {
  private oauth2Client: OAuth2Client;
  private clientId: string = process.env.GOOGLE_AUTH_CLIENT_ID;
  private clientSecret: string = process.env.GOOGLE_AUTH_CLIENT_SECRET;
  private clientRedirectUri: string = process.env.GOOGLE_AUTH_REDIRECT_URI;
  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.clientRedirectUri,
    );
  }

  async verifyToken(token: string, tokenId): Promise<boolean> {
    try {
      const ticket = await this.oauth2Client.verifyIdToken({
        idToken: tokenId,
        audience: this.clientId,
      });

      const payload = ticket.getPayload();

      return !!payload;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async refreshToken(refreshToken: string): Promise<string | null> {
    try {
      const { tokens } = await this.oauth2Client.getToken(refreshToken);
      return tokens.access_token || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
