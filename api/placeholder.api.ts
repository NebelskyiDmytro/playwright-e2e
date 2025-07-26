// api/placeholder.api.ts
import { IPost } from '../types/types/post';

export class PlaceholderAPI {
  baseUrl = 'BASE_URL';

  async getSomething(id: number): Promise<IPost> {
    const res = await fetch(`${this.baseUrl}/something/${id}`);
    const data = await res.json();
    return data as IPost;
  }
}
