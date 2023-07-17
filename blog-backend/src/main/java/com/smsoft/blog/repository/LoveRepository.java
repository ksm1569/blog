package com.smsoft.blog.repository;

import com.smsoft.blog.entity.LoveEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LoveRepository extends JpaRepository<LoveEntity, Integer> {
    public List<LoveEntity> findByBoardNumber(int boardNumber);
}
