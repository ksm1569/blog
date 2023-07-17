interface commentEntityList {
    commentId: number;
    boardNumber: number;
    userEmail: string;
    commentProfile: string | null;
    commentNickname: string;
    commentWriteDate: string;
    commentContent: string;
}

export default commentEntityList;