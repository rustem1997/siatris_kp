package com.example.sitaris_kp.service;

import com.example.sitaris_kp.dto.RecommendationDto;
import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.model.Recommendations;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.repository.RecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

public class RecommendationService {
    @Autowired
    private RecommendationRepository recommendationRepository;

    @Autowired
    private UserService userService;

    public Recommendations saveRecommendations(Recommendations recommendations, Long idUser, Long idEmployer) {
        User user = userService.findByIdUser(idUser);
        User employer = userService.findByIdUser(idEmployer);
        Optional<Company> company = employer.getCompanySet().stream().findFirst();
        recommendations.setCompanyUser(company
                .orElseThrow(() -> new ResourceNotFoundException("Company not exist with id:" )));
        recommendations.setEmployer(employer);
        recommendations.setUserRecommendation(user);
        return recommendationRepository.save(recommendations);
    }

    public Page<Recommendations> findRecommendationsByUserId(Pageable pageable, Long id) {
        return recommendationRepository.findAllByUserRecommendation(pageable, userService.findByIdUser(id));
    }

    public Page<Recommendations> findRecommendationsByEmployerId(Pageable pageable, Long id) {
        return recommendationRepository.findAllByEmployer(pageable, userService.findByIdUser(id));
    }

    public ResponseEntity<RecommendationDto> findRecommendationsByRecommendationsId(Long id) {
        Recommendations recommendations = recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendations not exist with id:" + id));
        RecommendationDto recommendationDto = new RecommendationDto();
        recommendationDto.setId(recommendations.getId());
        recommendationDto.setDescription(recommendations.getDescriptions());
        recommendationDto.setIdUser(recommendations.getUserRecommendation().getId());
        return ResponseEntity.ok(recommendationDto);
    }

    public Recommendations findByIdRecommendations(Long id) {

        return recommendationRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Recommendations not exist with id:" + id));
    }

    public Recommendations updateRecommendations(Recommendations recommendations) {
        Recommendations recommendations1 = findByIdRecommendations(recommendations.getId());
        recommendations.setUserRecommendation(recommendations1.getUserRecommendation());
        recommendations.setEmployer(recommendations1.getEmployer());
        recommendations.setCompanyUser(recommendations1.getCompanyUser());
        return recommendationRepository.save(recommendations);
    }

    // delete just by Recommendations  id
    public ResponseEntity<Map<String, Boolean>> deleteRecommendations(Long id) {
        Recommendations recommendations = findByIdRecommendations(id);
        Map<String, Boolean> response = new HashMap<>();
        if (recommendations == null) {
            response.put("not deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        }
        recommendationRepository.delete(recommendations);

        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
