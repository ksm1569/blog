interface GetBoardResponseDtd {
    board: {
        boardContent: string;
        boardImgUrl: string | null;
        boardNumber: number;
        boardTitle: string;
        boardWriteDatetime: string;
        commentCount: number;
        likeCount: number;
        viewCount: number;
        writerEmail: string;
        writerNickname: string;
        writerProfileUrl: string | null;
    };
    commentList: [
        {
            boardNumber: number;
            commentContent: string;
            commentNumber: number;
            writeDatetime: string;
            writerEmail: string;
            writerNickname: string;
            writerProfileUrl: string | null;
        }
    ];
    loveList: [
        {
            boardNumber: number;
            userEmail: string;
            userNickname: string;
            userProfileUrl: string | null;
        }
    ];
}

export default GetBoardResponseDtd;
