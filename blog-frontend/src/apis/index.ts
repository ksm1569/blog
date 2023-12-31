import axios from "axios";

export const authorizationHeader = (accessToken: string) => {
    return { headers: { Authorization: `Bearer ${accessToken}` } };
}

export const mutipartHeader = () => {
    return { headers: { 'Content-Type': 'multipart/form-data' } };
}

export const signInApi = async (data: any) => {

    const response = await axios.post("http://localhost:4000/api/auth/signIn", data).catch((error) => alert('로그인에 실패했습니다'));

    if (!response) return null;

    const result = response.data;
    return result;
}

export const signUpApi = async (data: any) => {
    const response = await axios.post("http://localhost:4000/api/auth/signUp", data).catch((error) => alert('로그인에 실패했습니다'));

    if (!response) return null;

    const result = response.data;
    return result;
}

