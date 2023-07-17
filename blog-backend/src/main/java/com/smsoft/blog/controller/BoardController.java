package com.smsoft.blog.controller;

import com.smsoft.blog.dto.request.board.PostBoardDto;
import com.smsoft.blog.dto.respose.ResponseDto;
import com.smsoft.blog.dto.respose.board.PostBoardResponseDto;
import com.smsoft.blog.entity.BoardEntity;
import com.smsoft.blog.entity.PopularSearchEntity;
import com.smsoft.blog.service.BoardService;
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

    @GetMapping("/top4")
    public ResponseDto<List<BoardEntity>> getTop4(){
        return boardService.getTop4();
    }

    @GetMapping("/list")
    public ResponseDto<List<BoardEntity>> getList(){
        return boardService.getList();
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
