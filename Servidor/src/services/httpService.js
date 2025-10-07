export const fetchExternalAPI = async (url) => {
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
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