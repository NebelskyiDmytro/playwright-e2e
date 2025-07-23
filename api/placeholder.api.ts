// api/placeholder.api.ts
import { Post } from '../types/interfaces/post';

export class PlaceholderAPI {
  baseUrl = 'BASE_URL';

  async getSomething(id: number): Promise<Post> {
    const res = await fetch(`${this.baseUrl}/something/${id}`);
    return await res.json();
  }
}
