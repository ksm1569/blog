package com.smsoft.blog.repository;

import com.smsoft.blog.entity.LoveEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoveRepository extends JpaRepository<LoveEntity, Integer> {
}
