import axios from "axios";

const BASE_URL = "http://localhost:8000/api";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ FIXED: use correct token key
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // 🔥 FIX HERE

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export const AddBook = async (bookData) => {
  const response = await api.post("/books/add/", bookData);
  return response.data;
};

export const getAllBooks = async () => {
  const response = await api.get("books/");
  return response.data;
};


export const updateBookById = async(bookId, data)=> {
    const response = await api.put(`books/${bookId}/update/`, data)
    return response.data;
}

export const issueBook = async(data)=> {
    const response = await api.post("books/issue/", data)
    return response.data;
}

// returnedTheBook  single value (issueId)   must wrap into object
export const returnedTheBook = async(issueId)=> {
    const response  = await api.post("books/return/",{
        issue_id:issueId
    })
 
    return response.data;
} 

export const getBookById = async(bookId)=>{
    const response = await api.get(`books/${bookId}/`)
    return response.data;
}


export const StudentBorrowedBook = async()=>{
    const response = await api.get("student/books/")
    return response.data;
}