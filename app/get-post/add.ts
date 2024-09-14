import { url_endpoint } from "./_config";
import { uploadFile } from "./fileuploading";

// functie pt login la users
export async function getUsers() {
    const url = url_endpoint+'/api/login?username&password';
    const response = await fetch(url);
    const users = await response.json();
    return users;
}

// functie pt creare de user:
export async function createUser(username, password, gender, first_name, last_name, email) {
    const url = url_endpoint+'/api/register';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([username, password, gender, first_name, last_name, email]),
    });
    const newUser = await response.json();
    return newUser;
}

export async function eventGet(number) {
    const url = url_endpoint+'/api/get_events?page';
    const response = await fetch(url);
    const event = await response.json();
    return event;
}

export async function eventAdd(name, description, link_to_pfp, link_to_cover_image, edition, location, time) {
    const url = url_endpoint+'/api/add_event';
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify([name, description, link_to_pfp, link_to_cover_image, edition, location, time]),
    });
    const newEvent = await response.json();
    return newEvent;   
}

export async function addExperiences(name, description, location, time, file:Blob){
    const asset_hash = await uploadFile(file);
    const url = url_endpoint+'/api/add_experience';
    const token="";
    const response = await fetch(url, {
        method: 'GET', 
        headers: {
            authorization: token
        }
    });
    const result = await response.json();
    if (!result.success)return [];
    return result.result;
}