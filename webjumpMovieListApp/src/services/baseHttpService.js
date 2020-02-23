import axios from 'axios';
export default class BaseHttpService {
  constructor() {}
  get = url => axios.get(url);
}
