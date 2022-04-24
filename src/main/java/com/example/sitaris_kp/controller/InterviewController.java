package com.example.sitaris_kp.controller;

import com.example.sitaris_kp.model.Interview;
import com.example.sitaris_kp.model.Utils.TypeOfInterview;
import com.example.sitaris_kp.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/company/vacancy/interview")
@RequiredArgsConstructor
public class InterviewController {
    private final InterviewService interviewService;

    @GetMapping("/findAllUserByInterview/")
    public ResponseEntity<Page<Interview>> findAllUserByInterview(Pageable pageable, Long id) {
        return new ResponseEntity<>(interviewService.findAllInterviewByUserId(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findAllVacancyByInterview/")
    public ResponseEntity<Page<Interview>> findAllVacancyByInterview(Pageable pageable, Long id) {
        return new ResponseEntity<>(interviewService.findAllInterviewByVacancyId(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findAllInterviewByVacancyIdAccept/")
    public ResponseEntity<Page<Interview>> findAllInterviewByVacancyIdAccept(Pageable pageable, Long id) {
        return new ResponseEntity<>(interviewService.findAllInterviewByVacancyIdAccept(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findAllInterviewByVacancyIdRefuse/")
    public ResponseEntity<Page<Interview>> findAllInterviewByVacancyIdRefuse(Pageable pageable, Long id) {
        return new ResponseEntity<>(interviewService.findAllInterviewByVacancyIdRefuse(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findAllInterviewByVacancyIdOnWaiting/")
    public ResponseEntity<Page<Interview>> findAllInterviewByVacancyIdOnWaiting(Pageable pageable, Long id) {
        return new ResponseEntity<>(interviewService.findAllInterviewByVacancyIdOnWaiting(pageable, id), HttpStatus.OK);
    }

    @PostMapping("/saveInterview/{idUser}/{idVacancy}/{idEmployer}")
    public Interview addInterview(@PathVariable Long idUser, @PathVariable Long idVacancy,@PathVariable Long idEmployer, @RequestBody Interview interview) {
        return interviewService.saveInterview(idUser,idVacancy,idEmployer, interview);
    }

    @GetMapping("/status")
    public  ResponseEntity<Set<String>> findAllStatus() {
        return new ResponseEntity<>(new TreeSet<>(
                Arrays.asList(TypeOfInterview.CALL.getName(), TypeOfInterview.TEST.getName(), TypeOfInterview.IN_OFFICE.getName())), HttpStatus.OK);
    }

    @GetMapping("/getInterviewById/{id}")
    public ResponseEntity<Interview> getInterviewById(@PathVariable Long id) {
        return interviewService.findById(id);
    }

    @PutMapping("/updateInterviewToRefuse/{id}")
    public ResponseEntity<Interview> updateInterviewToRefuse(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.refuseInterview(id));
    }

    @PutMapping("/updateInterviewToAccept/{id}")
    public ResponseEntity<Interview> updateInterviewToAccept(@PathVariable Long id) {
        return ResponseEntity.ok(interviewService.acceptInterview(id));
    }


}
