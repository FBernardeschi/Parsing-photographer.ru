import axios from 'axios';
import { Axios } from 'axios';

export class GetPhotoService {
    private http;
    private baseUrl = 'https://photographer.ru/static/upload/portfolio/pics/big/' as const;

    constructor() {
        this.http = axios.create({
            baseURL: this.baseUrl,
            responseType: 'arraybuffer',
            validateStatus: (status) => status < 500
        });
    }

    async get(photoId: string = '381690') {

        const result = await this.http.get(photoId.slice(0, 3) + '/' + photoId + '.jpg',  {responseType: 'arraybuffer'});
        return result;
    }
}