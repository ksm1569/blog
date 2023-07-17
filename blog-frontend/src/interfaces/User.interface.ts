interface User {
    userEmail: string;
    userNickname: string;
    userPhoneNumber: string;
    userAddress: string;
    userProfile?: string | null;
}

export default User;