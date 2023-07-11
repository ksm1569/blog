package com.smsoft.blog.repository;

import com.smsoft.blog.entity.BoardEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface BoardRepository extends JpaRepository<BoardEntity, Integer> {
    public List<BoardEntity> findTop3ByBoardWriteDateAfterOrderByBoardLoveCountDesc(Date boardWriteDate);
    public List<BoardEntity> findByOrderByBoardWriteDateDesc();
}
