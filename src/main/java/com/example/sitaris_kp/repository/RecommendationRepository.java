package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Recommendations;
import com.example.sitaris_kp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface RecommendationRepository extends Recommendations<Recommendations, Long> {



    Page<Recommendations> findAllByUserRecommendation(Pageable pageable, User user);
    Page<Recommendations> findAllByEmployer(Pageable pageable, User user);

}
