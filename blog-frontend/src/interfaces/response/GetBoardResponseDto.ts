interface GetBoardResponseDto {
    boardEntity: {
        boardNumber: number;
        boardTitle: string;
        boardContent: string;
        boardImage: string | null;
        boardVideo: string | null;
        boardFile: string | null;
        boardWriterEmail: string;
        boardWriterProfile: string | null;
        boardWriterNickname: string;
        boardWriteDate: string;
        boardClickCount: number;
        boardLoveCount: number;
        boardCommentCount: number;
    };
    commentEntityList: [
        {
            commentId: number;
            boardNumber: number;
            userEmail: string;
            commentProfile: string | null;
            commentNickname: string;
            commentWriteDate: string;
            commentContent: string;
        }
    ];
    loveEntityList: [
        {
            loveId: number;
            boardNumber: number;
            userEmail: string;
            loveUserProfile: string | null;
            loveUserNickname: string;
        }
    ];
}

export default GetBoardResponseDto;
