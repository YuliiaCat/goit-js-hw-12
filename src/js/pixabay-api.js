import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';

export async function getImages(value, page) {
  const res = await axios.get('/api/', {
    params: {
      key: "44352919-dbe9ef0ac86097ad22a8e9457",
      q: value,
      image_type: "photo",
      orientation: "horizontal",
      safesearch: true,
      per_page: 15,
      page: page
    }
  });

  return res.data;
}

