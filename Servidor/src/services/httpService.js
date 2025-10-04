export const fetchExternalAPI = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'Express-API-Consumer/1.0.0'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data,
      status: response.status
    };
  } catch (error) {
    console.error('Error fetching external API:', error.message);
    return {
      success: false,
      error: error.message,
      status: 500
    };
  }
};