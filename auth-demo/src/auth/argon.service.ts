import { Injectable } from '@nestjs/common';
import * as argon from 'argon2';

@Injectable()
export class ArgonService {
  async hash(data: string): Promise<string> {
    return await argon.hash(data);
  }

  async verify(data: string, hash: string): Promise<boolean> {
    return argon.verify(hash, data);
  }
}
