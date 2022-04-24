package com.example.sitaris_kp.controller;


import com.example.sitaris_kp.dto.RecommendationDto;
import com.example.sitaris_kp.model.Recommendations;
import com.example.sitaris_kp.service.RecommendationService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user/recommendation")
@RequiredArgsConstructor
public class RecommendationController {
    @Autowired
    private RecommendationService recommendationService;

    @GetMapping("/{id}")
    public ResponseEntity<RecommendationDto> getRecommendationsByRecommendationsId(@PathVariable Long id) {
        return recommendationService.findRecommendationsByRecommendationsId(id);
    }
    @GetMapping("/findByRecommendationsId/")
    public ResponseEntity<Page<Recommendations>> findAllByRecommendationsId(Pageable pageable, Long id) {
        return new ResponseEntity<>(recommendationService.findRecommendationsByUserId(pageable, id), HttpStatus.OK);
    }

    @GetMapping("/findByEmployerId/")
    public ResponseEntity<Page<Recommendations>> findAllByEmployerId(Pageable pageable, Long id) {
        return new ResponseEntity<>(recommendationService.findRecommendationsByEmployerId(pageable, id), HttpStatus.OK);
    }
    @PostMapping("/addRecommendations/{idUser}/{idEmployer}")
    public Recommendations createRecommendations(@RequestBody Recommendations recommendations, @PathVariable Long idUser, @PathVariable Long idEmployer){
        System.out.println("da");
        return recommendationService.saveRecommendations(recommendations,idUser,idEmployer);
    }
    @PutMapping("/updateRecommendations")
    public ResponseEntity<Recommendations> updateRecommendations(@RequestBody Recommendations recommendations) {
        return ResponseEntity.ok(recommendationService.updateRecommendations(recommendations));
    }
    @DeleteMapping("/deleteRecommendations/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteRecommendations(@PathVariable Long id) {
        return recommendationService.deleteRecommendations(id);
    }
}
