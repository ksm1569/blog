package com.smsoft.blog.service;

import com.smsoft.blog.dto.request.board.PostBoardDto;
import com.smsoft.blog.dto.respose.ResponseDto;
import com.smsoft.blog.dto.respose.board.GetBoardResponseDto;
import com.smsoft.blog.dto.respose.board.GetLoveResponseDto;
import com.smsoft.blog.dto.respose.board.PostBoardResponseDto;
import com.smsoft.blog.entity.*;
import com.smsoft.blog.repository.*;
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

    private final LoveRepository loveRepository;
    private final CommentRepository commentRepository;

    public BoardService(UserRepository userRepository, BoardRepository boardRepository, PopularSearchRepository popularSearchRepository, LoveRepository loveRepository, CommentRepository commentRepository) {
        this.userRepository = userRepository;
        this.boardRepository = boardRepository;
        this.popularSearchRepository = popularSearchRepository;
        this.loveRepository = loveRepository;
        this.commentRepository = commentRepository;
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

    //게시물번호의 게시물 가져오기
    public ResponseDto<GetBoardResponseDto> getBoard(int boardNumber){
        GetBoardResponseDto getBoardResponseDto = null;

        try {
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);

            if (boardEntity == null){
                return ResponseDto.setFailed("존재하지 않는 게시물입니다!");
            }

            List<CommentEntity> commentEntityList = commentRepository.findByBoardNumberOrderByCommentWriteDateDesc(boardNumber);
            List<LoveEntity> loveEntityList = loveRepository.findByBoardNumber(boardNumber);

            getBoardResponseDto = new GetBoardResponseDto(boardEntity, commentEntityList, loveEntityList);

        } catch (Exception e){
            e.printStackTrace();
            return ResponseDto.setFailed("getBoard 실패!");
        }

        return ResponseDto.setSuccess("getBoard 성공!", getBoardResponseDto);
    }

    public ResponseDto<GetLoveResponseDto> getLove(String userEmail, int boardNumber){
        GetLoveResponseDto getLoveResponseDto = null;

        try {
            UserEntity userEntity = userRepository.findByUserEmail(userEmail);
            BoardEntity boardEntity = boardRepository.findByBoardNumber(boardNumber);
            LoveEntity loveEntity = loveRepository.findByUserEmailAndBoardNumber(userEmail, boardNumber);

            if (loveEntity == null) {
                // 첫번째 좋아요일 경우 생성
                loveEntity = new LoveEntity(userEntity, boardNumber);
                loveRepository.save(loveEntity);
                boardEntity.increaseLoveCount();
            } else {
                loveRepository.delete(loveEntity);
                boardEntity.decreaseLoveCount();
            }

            boardRepository.save(boardEntity);

            List<CommentEntity> commentEntityList = commentRepository.findByBoardNumberOrderByCommentWriteDateDesc(boardNumber);
            List<LoveEntity> loveEntityList = loveRepository.findByBoardNumber(boardNumber);

            getLoveResponseDto = new GetLoveResponseDto(boardEntity, commentEntityList, loveEntityList);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseDto.setFailed("getLove 실패!");
        }

        return ResponseDto.setSuccess("getLove 성공!", getLoveResponseDto);
    }
}
