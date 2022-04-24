package com.example.sitaris_kp.controller;

import com.example.sitaris_kp.model.Summary;
import com.example.sitaris_kp.service.SummaryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/user/summary")
public class SummaryController {
    @Autowired
    private SummaryService summaryService;

    @GetMapping("/{id}")
    public ResponseEntity<Summary> getSummaryBySummaryId(@PathVariable Long id) {
        return summaryService.findSummaryBySummaryId(id);
    }
    @GetMapping("/findBySummaryIdUser/")
    public ResponseEntity<Page<Summary>> findAllBySummaryId(Pageable pageable, Long id) {
        System.out.println(id);
        return new ResponseEntity<>(summaryService.findSummaryByUserId(pageable, id), HttpStatus.OK);
    }

    @PostMapping("/addSummary/{id}")
    public Summary createSummary(@RequestBody Summary summary, @PathVariable Long id){
        return summaryService.saveSummary(summary,id);
    }
    @PutMapping("/updateSummary")
    public ResponseEntity<Summary> updateSummary(@RequestBody Summary summary) {
        return ResponseEntity.ok(summaryService.updateSummary(summary));
    }
    @DeleteMapping("/deleteSummary/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteRecommendations(@PathVariable Long id) {
        return summaryService.deleteSummary(id);
    }
}
