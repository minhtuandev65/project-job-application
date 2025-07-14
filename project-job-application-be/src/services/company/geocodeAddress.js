import axios from 'axios'

export const geocodeAddress = async (address) => {
    const url = 'https://nominatim.openstreetmap.org/search'
    const response = await axios.get(url, {
        params: {
            q: address,
            format: 'json'
        },
        headers: {
            'User-Agent':
                'JobApplicationApp/1.0 (huynhminhtuan13032003@gmail.com)'
        }
    })

    if (!response.data || response.data.length === 0) {
        throw new Error('Không tìm thấy tọa độ cho địa chỉ này')
    }

    const { lat, lon } = response.data[0]
    return {
        lat: parseFloat(lat),
        lng: parseFloat(lon)
    }
}

export const reverseGeocode = async (lat, lon) => {
    const url = 'https://nominatim.openstreetmap.org/reverse'

    const response = await axios.get(url, {
        params: {
            lat,
            lon,
            format: 'json'
        },
        headers: {
            'User-Agent': 'DineSpotApp/1.0 (huynhminhtuan13032003@gmail.com)'
        }
    })

    if (!response.data || !response.data.display_name) {
        throw new Error('Không tìm thấy địa chỉ cho tọa độ này')
    }

    return response.data.display_name // hoặc bạn có thể lấy chi tiết hơn từ `address`
}
