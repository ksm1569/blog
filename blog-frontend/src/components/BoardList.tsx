import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from 'axios';
import { authorizationHeader } from "../apis";
import { useCookies } from "react-cookie";
import ResponseDto from "../interfaces/response/ResponseDto";
import GetListResponseDto from "../interfaces/response/GetListResponseDto";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

interface Column {
    id: 'boardNumber' | 'boardTitle' | 'boardWriterNickname' | 'boardWriteDate'
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    { id: 'boardNumber', label: 'No', minWidth: 50 },
    { id: 'boardTitle', label: '제목', minWidth: 170 },
    { id: 'boardWriterNickname', label: '글쓴이', minWidth: 100 },
    { id: 'boardWriteDate', label: '날짜', minWidth: 150 },
    // {
    //   id: 'density',
    //   label: 'Density',
    //   minWidth: 170,
    //   align: 'right',
    //   format: (value: number) => value.toFixed(2),
    // },
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        fontSize: 20,
        fontWeight: 700
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));



export default function BoardList() {
    const [cookies] = useCookies();
    const token = cookies.token;
    const [boardList, setBoardList] = useState<GetListResponseDto[]>([]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(15);


    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const getList = () => {
        axios.get('http://localhost:4000/api/board/list', authorizationHeader(token))
            .then((response) => {
                getListResponseHandler(response);
            })
            .catch((error) => { console.log(error.message) })
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
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ minHeight: 900 }}>
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}

                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {boardList
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.boardNumber}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell
                                                        onClick={() => navigator(`/board/detail/${row.boardNumber}`)}
                                                        key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </StyledTableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[15, 40, 100]}
                    component="div"
                    count={boardList.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

        </>
    )
}
