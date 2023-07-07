package com.smsoft.blog.repository;

import com.smsoft.blog.entity.PopularSearchEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PopularRepository extends JpaRepository<PopularSearchEntity, String> {
}
