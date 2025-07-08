// api/placeholder.api.ts
import { Post } from '../types/types/post.d';

export class PlaceholderAPI {
  baseUrl = 'BASE_URL';

  async getPost(id: number): Promise<Post> {
    const res = await fetch(`${this.baseUrl}/posts/${id}`);
    return await res.json();
  }
}
