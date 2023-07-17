interface GetTop4ResponseDto {
    boardContent: string;
    boardImage: string | null;
    boardNumber: number;
    boardTitle: string;
    boardWriteDate: string;
    boardCommentCount: number;
    boardLoveCount: number;
    boardClickCount: number;
    boardWriterNickname: string;
    boardWriterProfile: string | null;
}



export default GetTop4ResponseDto;