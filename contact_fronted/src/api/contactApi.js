import axios from "axios";

const API_URI = "http://localhost:8080/contact";

export async function createContact(contact) {
  return await axios.post(API_URI, contact);
}

export async function getContacts(page = 0,size = 10){
    return await axios.get(`${API_URI}?page=${page}&size=${size}`)
}

export async function getContact(id){
    return await axios.get(`${API_URI}/${id}`)
}

export async function udpateContact(contact) {
    return await axios.post(API_URI, contact);
}

export async function udpatePhoto(formData) {
    return await axios.put(`${API_URI}/photo`, formData);
}

export async function deleteContact(id) {
    return await axios.delete(`${API_URI}/${id}`);
}