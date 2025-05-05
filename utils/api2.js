import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const API_URL = 'https://random-data-api.com/api/v2/users';

// Hàm test API với log chi tiết
const testAPI = async () => {
  console.log('Bắt đầu gọi API test...');
  try {
    // Thêm timeout dài hơn
    const response = await axios.get('https://random-data-api.com/api/v2/users?size=5', {
      timeout: 10000, // 10 giây
    });
    
    console.log('Kết quả API test:', JSON.stringify(response.data));
    console.log('Trạng thái:', response.status);
    console.log('Headers:', response.headers);
    
    return response.data;
  } catch (error) {
    console.error('Chi tiết lỗi test API:');
    if (error.response) {
      // Server trả về lỗi
      console.error('Trạng thái:', error.response.status);
      console.error('Data:', error.response.data);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // Request đã được gửi nhưng không nhận được response
      console.error('Request đã gửi nhưng không có phản hồi:', error.request);
    } else {
      // Có lỗi xảy ra khi thiết lập request
      console.error('Lỗi:', error.message);
    }
    console.error('Config:', error.config);
    return null;
  }
};

const mapContact = (user) => {
  try {
    return {
      id: uuidv4(),
      name: `${user.first_name} ${user.last_name}`,
      avatar: user.avatar ? user.avatar.replace('\\u0026', '&') : 'https://via.placeholder.com/150',
      phone: user.phone_number || '',
      cell: user.phone_number || '',
      email: user.email || '',
      favorite: Math.random() >= 0.5,
    };
  } catch (error) {
    console.error('Lỗi khi map contact:', error);
    return null;
  }
};

const fetchContacts = async () => {
  console.log('Starting to fetch contacts...');
  try {
    // Thêm các options và timeout
    const response = await axios.get(`${API_URL}?size=50`, {
      timeout: 15000, // 15 giây
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    console.log('Fetch contacts response received:', response.status);
    console.log('Response headers:', response.headers);
    
    // Kiểm tra dữ liệu trả về
    if (!response.data || !Array.isArray(response.data)) {
      console.error('Dữ liệu không hợp lệ:', response.data);
      return [];
    }
    
    console.log('Contacts data received, length:', response.data.length);
    
    // Map dữ liệu, loại bỏ các phần tử null
    const mappedContacts = response.data
      .map(mapContact)
      .filter(contact => contact !== null);
      
    console.log(`Successfully mapped ${mappedContacts.length} contacts`);
    
    return mappedContacts;
  } catch (error) {
    console.error('Lỗi fetch contacts:', error);
    if (error.response) {
      console.error('Response error data:', error.response.data);
      console.error('Response error status:', error.response.status);
    } else if (error.request) {
      console.error('No response received', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    console.log('Returning empty array as fallback');
    return [];
  }
};

const fetchUserContact = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data) {
      console.error('Không có dữ liệu user');
      return null;
    }
    
    return mapContact(response.data);
  } catch (error) {
    console.error('Lỗi fetch user contact:', error);
    return null;
  }
};

const fetchRandomContact = async () => {
  try {
    const response = await axios.get(API_URL, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.data) {
      console.error('Không có dữ liệu random contact');
      return null;
    }
    
    return mapContact(response.data);
  } catch (error) {
    console.error('Lỗi fetch random contact:', error);
    return null;
  }
};

export { fetchContacts, fetchUserContact, fetchRandomContact, testAPI };