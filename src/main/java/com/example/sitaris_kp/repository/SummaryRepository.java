package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Summary;
import com.example.sitaris_kp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface SummaryRepository extends CrudRepository<Summary, Long> {
    Page<Summary> findAllByUserSummary(Pageable pageable, User user);

}
