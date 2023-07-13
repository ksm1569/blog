
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { authorizationHeader } from "../apis";
import { useCookies } from "react-cookie";
import ResponseDto from "../interfaces/response/ResponseDto";
import GetListResponseDto from "../interfaces/response/GetListResponseDto";
import styled from "styled-components";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    Paper
} from "@material-ui/core";



export default function BoardList() {
    const [cookies] = useCookies();
    const token = cookies.token;
    const [boardList, setBoardList] = useState<GetListResponseDto[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const StyledTableCell = styled(TableCell)`
        font-size: 1.2rem; 
        margin-bottom: 50px;
    `;

    const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getList = () => {
        axios.get('http://localhost:4000/api/board/list', authorizationHeader(token))
            .then((response) => {
                getListResponseHandler(response);
            })
            .catch((error) => { console.log(error) })
    }

    const getListResponseHandler = (response: AxiosResponse<any, any>) => {
        const { result, message, data } = response.data as ResponseDto<GetListResponseDto[]>;
        if (!result || data === null) return;
        setBoardList(data);
    }


    const navigator = useNavigate();


    useEffect(() => {
        getList();
    }, [])

    return (
        <>
            <TableContainer component={Paper}>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">No</StyledTableCell>
                            <StyledTableCell align="center">제목</StyledTableCell>
                            <StyledTableCell align="center">글쓴이</StyledTableCell>
                            <StyledTableCell align="center">날짜</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {boardList
                            .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                            .map(({ boardNumber, boardTitle, boardWriterNickname, boardWriteDate }, i) => (
                                <TableRow key={boardNumber}>
                                    <StyledTableCell align="center" component="th" scope="row">
                                        {page * rowsPerPage + i + 1}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{boardTitle}</StyledTableCell>
                                    <StyledTableCell align="center">{boardWriterNickname}</StyledTableCell>
                                    <StyledTableCell align="center">{boardWriteDate}</StyledTableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                count={boardList.length}
                                page={page}
                                rowsPerPage={rowsPerPage}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>


        </>
    )
}
