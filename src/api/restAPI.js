import * as axios from 'axios';

let instanse = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "API-KEY": "9b42ea7b-c962-47f6-9ffc-ad0f52e6a56f"
    }
});

export let AuthApi = {
    async logIn(body) {
        return await instanse.post(`/auth/login`, body);
    },
    async logOut() {
        return await instanse.delete(`/auth/login`);
    },
    async getAuthStatus() {
        return await instanse.get(`/auth/me`);
    },
    async getCaptcha() {
        return await instanse.get(`/security/get-captcha-url`);
    }
}
export let ProfileApi = {
    async getProfileInfo(userId) {
        return await instanse.get(`/profile/${userId}`);
    },
    async getProfileStatus(userId) {
        return await instanse.get(`/profile/status/${userId}`);
    },
    async updateStatus(data) {
        return await instanse.put(`/profile/status`, data);
    },
    async updatePhoto(data) {
        return await instanse.put(`/profile/photo/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    async updateProfileInfo(data) {
        return await instanse.put(`/profile`, data);
    },
}
export let UserApi = {
    getAllUsers(page, userCount, term = '') {
        return instanse.get(`/users?page=${page}&count=${userCount}&term=${term}`);
    },
    followUser(userId) {
        return instanse.post(`/follow/${userId}`);
    },
    unFollowUser(userId) {
        return instanse.delete(`/follow/${userId}`);
    },
    isFollowedUser(userId) {
        return instanse.get(`/follow/${userId}`);
    },
    getFollowedUsers(page, userCount, term = '') {
        return instanse.get(`/users?friend=true&page=${page}&count=${userCount}&term=${term}`);
    },
}