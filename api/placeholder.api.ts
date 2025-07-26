// api/placeholder.api.ts
import { Post } from '../types/types/post';

export class PlaceholderAPI {
  baseUrl = 'BASE_URL';

  async getSomething(id: number): Promise<Post> {
    const res = await fetch(`${this.baseUrl}/something/${id}`);
    const data = await res.json();
    return data as Post;
  }
}
