interface boardEntity {
    boardNumber: number;
    boardTitle: string;
    boardContent: string;
    boardImage: string | null;
    boardVideo: string | null;
    boardFile: string | null;
    boardWriterEmail: string | null;
    boardWriterProfile: string | null;
    boardWriterNickname: string | null;
    boardWriteDate: string | null;
    boardClickCount: number;
    boardLoveCount: number;
    boardCommentCount: number;
}

export default boardEntity;