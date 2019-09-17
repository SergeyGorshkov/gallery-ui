export default class GalleryService {

    _apiBase = 'https://www.reddit.com/r';
    
    async getResource(url) {
        
        
		const res = await fetch(`${this._apiBase}${url}`);
		if (!res.ok) {
			throw new Error(`Could not fetch: ${url} received: ${res.status}`);
		}
		return await res.json();
    };
    
    getImages = async (count = 100) => {
        const res = await this.getResource(`/reactjs.json?limit=${count}`);
        return Object.values(res.data.children).map(this._transformImages);
    };

    _transformImages = images => {
      
      
      const { id, thumbnail, title, num_comments, permalink } = images.data;
      return {
        id,
        thumbnail, 
        title, 
        num_comments, 
        permalink                    
      }
    };
}
