package com.smsoft.blog.controller;

import com.smsoft.blog.dto.request.board.PatchBoardDto;
import com.smsoft.blog.dto.request.board.PostBoardDto;
import com.smsoft.blog.dto.request.board.PostCommentDto;
import com.smsoft.blog.dto.respose.ResponseDto;
import com.smsoft.blog.dto.respose.board.*;
import com.smsoft.blog.entity.BoardEntity;
import com.smsoft.blog.entity.PopularSearchEntity;
import com.smsoft.blog.service.BoardService;
import org.hibernate.sql.Delete;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }
    @PostMapping("")
    public ResponseDto<PostBoardResponseDto> postBoard(@AuthenticationPrincipal String email, @RequestBody PostBoardDto postBoardDto){
        ResponseDto<PostBoardResponseDto> response = boardService.postBoard(email, postBoardDto);

        return response;
    }

    @PatchMapping
    public ResponseDto<PatchBoardResponseDto> patchBoard(@AuthenticationPrincipal String email, @RequestBody PatchBoardDto patchBoardDto){
        ResponseDto<PatchBoardResponseDto> patchBoardResponseDto = boardService.patchBoard(email, patchBoardDto);

        return patchBoardResponseDto;
    }
    
    @DeleteMapping("{boardNumber}")
    public ResponseDto<DeleteBoardResponseDto> deleteBoard(@PathVariable("boardNumber") int boardNumber){
        ResponseDto<DeleteBoardResponseDto> deleteBoardResponseDto = boardService.deleteBoard(boardNumber);

        return deleteBoardResponseDto;
    }

    @PostMapping("/comment")
    public ResponseDto<PostCommentResponseDto> postComment(@AuthenticationPrincipal String userEmail, @RequestBody PostCommentDto postCommentDto){
        ResponseDto<PostCommentResponseDto> response = boardService.postComment(userEmail, postCommentDto);

        return response;
    }

    @GetMapping("/top4")
    public ResponseDto<List<BoardEntity>> getTop4(){
        return boardService.getTop4();
    }

    @GetMapping("/list")
    public ResponseDto<List<BoardEntity>> getList(){
        return boardService.getList();
    }

    @GetMapping("/detail/{boardNumber}")
    public ResponseDto<GetBoardResponseDto> getBoard(@PathVariable("boardNumber") int boardNumber){
        ResponseDto<GetBoardResponseDto> getBoardResponseDto = boardService.getBoard(boardNumber);
        return getBoardResponseDto;
    }

    @GetMapping("/love/{boardNumber}")
    public ResponseDto<GetLoveResponseDto> getLove(@AuthenticationPrincipal String userEmail, @PathVariable("boardNumber") int boardNumber){
        ResponseDto<GetLoveResponseDto> getLoveResponseDto = boardService.getLove(userEmail, boardNumber);
        return getLoveResponseDto;
    }

    @GetMapping("/popularsearchList")
    public ResponseDto<List<PopularSearchEntity>> getPopularSearchList(){
        return boardService.getPopularSearchList();
    }

    @GetMapping("/search/{title}")
    public ResponseDto<List<BoardEntity>> getSearchList(@PathVariable("boardTitle") String title){
        return null;
    }
}
