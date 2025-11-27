import axios from 'axios';

export async function getImagesByQuery(query, page) {
  try {
    const fetchData = await axios.get('https://pixabay.com/api/', {
      params: {
        key: '53385798-f9f5c437f9a7cc006b35ba392',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true',
        page: page,
        per_page: '15',
      },
    });
    return fetchData.data;
  } catch (err) {
    console.log(err);
  }
}
