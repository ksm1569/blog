package com.smsoft.blog.service;

import com.smsoft.blog.dto.ResponseDto;
import com.smsoft.blog.entity.BoardEntity;
import com.smsoft.blog.entity.PopularSearchEntity;
import com.smsoft.blog.repository.BoardRepository;
import com.smsoft.blog.repository.PopularSearchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BoardService {

    private final BoardRepository boardRepository;
    private final PopularSearchRepository popularSearchRepository;
    public BoardService(BoardRepository boardRepository, PopularSearchRepository popularSearchRepository) {
        this.boardRepository = boardRepository;
        this.popularSearchRepository = popularSearchRepository;
    }

    //주간 게시물 탑3
    public ResponseDto<List<BoardEntity>> getTop3(){
        List<BoardEntity> boardEntityList = new ArrayList<BoardEntity>();
        Date date = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));

        try {
            boardEntityList = boardRepository.findTop3ByBoardWriteDateAfterOrderByBoardLoveCountDesc(date);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("getTop3 실패!");
        }

        return ResponseDto.setSuccess("getTop3 성공!", boardEntityList);
    }

    //전체 게시물 리스트
    public ResponseDto<List<BoardEntity>> getList(){
        List<BoardEntity> boardEntityList = new ArrayList<BoardEntity>();

        try {
            boardEntityList = boardRepository.findByOrderByBoardWriteDateDesc();
        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("getList 실패!");
        }

        return ResponseDto.setSuccess("getList 성공!", boardEntityList);
    }

    //인기검색어 TOP10
    public ResponseDto<List<PopularSearchEntity>> getPopularSearchList(){
        List<PopularSearchEntity> popularSearchEntityList = new ArrayList<PopularSearchEntity>();

        try {
            popularSearchEntityList = popularSearchRepository.findTop10ByOrderByPopularSearchCountDesc();
        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("getPopularSearchList 실패!");
        }

        return ResponseDto.setSuccess("getPopularSearchList 성공!", popularSearchEntityList);
    }
}
