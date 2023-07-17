package com.smsoft.blog.service;

import com.smsoft.blog.dto.request.board.PostBoardDto;
import com.smsoft.blog.dto.respose.ResponseDto;
import com.smsoft.blog.dto.respose.board.PostBoardResponseDto;
import com.smsoft.blog.entity.BoardEntity;
import com.smsoft.blog.entity.PopularSearchEntity;
import com.smsoft.blog.entity.UserEntity;
import com.smsoft.blog.repository.BoardRepository;
import com.smsoft.blog.repository.PopularSearchRepository;
import com.smsoft.blog.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BoardService {

    private final UserRepository userRepository;
    private final BoardRepository boardRepository;
    private final PopularSearchRepository popularSearchRepository;

    public BoardService(UserRepository userRepository, BoardRepository boardRepository, PopularSearchRepository popularSearchRepository) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.popularSearchRepository = popularSearchRepository;
    }

    //게시글 작성
    public ResponseDto<PostBoardResponseDto> postBoard(String email, PostBoardDto postBoardDto){
        PostBoardResponseDto postBoardResponseDto = null;

        try {
            UserEntity userEntity = userRepository.findByUserEmail(email);

            if (userEntity == null){
                return ResponseDto.setFailed("유저를 찾을 수 없음!");
            }

            BoardEntity boardEntity = new BoardEntity(userEntity, postBoardDto);
            boardRepository.save(boardEntity);

            postBoardResponseDto = new PostBoardResponseDto(boardEntity);

        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("postBoard 실패!");
        }

        return ResponseDto.setSuccess("글 작성이 완료되었습니다", postBoardResponseDto);
    }

    //주간 게시물 탑4
    public ResponseDto<List<BoardEntity>> getTop4(){
        List<BoardEntity> boardEntityList = new ArrayList<BoardEntity>();
        Date date = Date.from(Instant.now().minus(7, ChronoUnit.DAYS));
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String WeekAgo = simpleDateFormat.format(date);

        try {
            boardEntityList = boardRepository.findTop4ByBoardWriteDateGreaterThanOrderByBoardLoveCountDesc(WeekAgo);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("getTop4 실패!");
        }

        return ResponseDto.setSuccess("getTop4 성공!", boardEntityList);
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

    //상단 nav바 게시물제목 검색
    public ResponseDto<List<BoardEntity>> getSearchList(String boardTitle){
        List<BoardEntity> boardEntityList = new ArrayList<BoardEntity>();

        try {
            boardEntityList = boardRepository.findByBoardTitleContains(boardTitle);
        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("getSearchList 실패!");
        }

        return ResponseDto.setSuccess("getSearchList 성공!", boardEntityList);
    }
}
