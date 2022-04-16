package com.example.sitaris_kp.service;

import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.Summary;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.repository.SummaryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.HashMap;
import java.util.Map;

public class SummaryService {
    @Autowired
    private SummaryRepository summaryRepository;

    @Autowired
    private UserService userService;


    public Summary saveSummary(Summary summary, Long id) {
        User user = userService.findByIdUser(id);

        summary.setUserSummary(user);
        System.out.println(summary);
        return summaryRepository.save(summary);
    }

    public Page<Summary> findSummaryByUserId(Pageable pageable, Long id) {
        return summaryRepository.findAllByUserSummary(pageable, userService.findByIdUser(id));
    }

    public ResponseEntity<Summary> findSummaryBySummaryId(Long id) {
        Summary summary = summaryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Summary not exist with id:" + id));
        return ResponseEntity.ok(summary);
    }

    public Summary findByIdSummary(Long id) {

        return summaryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Summary not exist with id:" + id));
    }

    public Summary updateSummary(Summary summary) {
        Summary summary1 = findByIdSummary(summary.getId());
        summary.setId(summary1.getId());
        summary.setUserSummary(summary1.getUserSummary());
        return summaryRepository.save(summary);
    }

    // delete just by resume  id
    public ResponseEntity<Map<String, Boolean>> deleteSummary(Long id) {
        Summary summary = findByIdSummary(id);

        Map<String, Boolean> response = new HashMap<>();

        if (summary == null) {
            response.put("not deleted", Boolean.TRUE);
            return ResponseEntity.ok(response);
        }
        summaryRepository.delete(summary);

        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
