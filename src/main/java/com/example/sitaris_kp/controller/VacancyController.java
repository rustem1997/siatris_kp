package com.example.sitaris_kp.controller;


import com.example.sitaris_kp.dto.VacancyDto;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.model.Utils.VacancyStatus;
import com.example.sitaris_kp.model.Vacancy;

import org.springframework.beans.factory.annotation.Autowired;
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
@RequestMapping("/company/vacancy")
public class VacancyController {
    @Autowired
    private com.interview.service.VacancyService vacancyService;

    @GetMapping("/findAll/")
    public ResponseEntity<Page<Vacancy>> findAll(Pageable pageable) {
        return new ResponseEntity<>(vacancyService.findAll(pageable), HttpStatus.OK);
    }

    @GetMapping("/search/{searchText}")
    public ResponseEntity<Page<Vacancy>> findAll(Pageable pageable, @PathVariable String searchText) {
        return new ResponseEntity<>(vacancyService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @GetMapping("/findByCompanyId/")
    public ResponseEntity<Page<Vacancy>> findAll(Pageable pageable, Long id) {
        return new ResponseEntity<>(vacancyService.findAll(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findByCompanyIdArchive/")
    public ResponseEntity<Page<Vacancy>> findAllArchive(Pageable pageable, Long id) {
        return new ResponseEntity<>(vacancyService.findAllArchive(pageable, id), HttpStatus.OK);
    }
    @PostMapping("/addVacancy/{id}")
    public Vacancy createVacancy(@RequestBody Vacancy vacancy, @PathVariable Long id) {
        return vacancyService.saveVacancy(vacancy,id);
    }
    @GetMapping("getVacancyById/{id}")
    public ResponseEntity<Vacancy> getVacancyById(@PathVariable Long id) {
        return vacancyService.findVacancyByVacancyId(id);
    }
    @GetMapping("/vacancy/{id}/{userId}")
    public ResponseEntity<VacancyDto> getVacancyByVacancyIdAndUserId(@PathVariable Long id, @PathVariable Long userId) {
        return vacancyService.findVacancyByVacancyIdAndUseId(id, userId);
    }
    @PutMapping("/updateVacancy")
    public ResponseEntity<Vacancy> updateVacancy(@RequestBody Vacancy vacancy) {
        return ResponseEntity.ok(vacancyService.updateVacancy(vacancy));
    }
    @PutMapping("/updateVacancyStatus/{id}")
    public ResponseEntity<Vacancy> updateVacancyStatus(@PathVariable Long id) {
        return ResponseEntity.ok(vacancyService.changeStatus(id));
    }
    @GetMapping("/status")
    public  ResponseEntity<Set<String>> findAllStatus() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList(VacancyStatus.ACTIVE.toString(), VacancyStatus.ARCHIVE.toString())), HttpStatus.OK);
    }



    @GetMapping("/findUserPassedByVacancyId/")
    public ResponseEntity<Page<User>> findAllUsersPassed(Pageable pageable, Long id) {
        return new ResponseEntity<>(vacancyService.findAllUsersPassedByVacancyId(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findUserFailedByVacancyId/")
    public ResponseEntity<Page<User>> findAllUsersFailed(Pageable pageable, Long id) {
        return new ResponseEntity<>(vacancyService.findAllUsersFailedByVacancyId(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findUserOnWaitByVacancyId/")
    public ResponseEntity<Page<User>> findAllUsersOnWait(Pageable pageable, Long  id) {
        return new ResponseEntity<>(vacancyService.findAllUsersByVacancyId(pageable,id), HttpStatus.OK);
    }
    @PostMapping("/saveUserOnWaitByVacancyId/")
    public Vacancy addUserOnWaitVacancy(Long idUser, Long idVacancy) {
        return vacancyService.saveVacancyUserOnWait(idUser,idVacancy);
    }
    @PostMapping("/saveUserOnPassedByVacancyId/")
    public Vacancy addUserToPassedVacancy(Long idUser, Long idVacancy) {
        return vacancyService.saveVacancyUserOnPassed(idUser,idVacancy);
    }
    @PostMapping("/saveUserOnFailedByVacancyId/{idUser}/{idVacancy}")
    public Vacancy addUserToFailedVacancy(@PathVariable Long idUser,@PathVariable  Long idVacancy) {
        return vacancyService.saveVacancyUserOnFailed(idUser,idVacancy);
    }


    @GetMapping("/findVacancyPassedByUserId/")
    public ResponseEntity<Page<Vacancy>> findVacancyPassedByUserId(Pageable pageable, Long id) {
        return new ResponseEntity<>(vacancyService.findAllVacancyPassedByUserId(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findVacancyFailedByUseryId/")
    public ResponseEntity<Page<Vacancy>> findVacancyFailedByUseryId(Pageable pageable, Long id) {
        return new ResponseEntity<>(vacancyService.findAllVacancyFailedByUserId(pageable, id), HttpStatus.OK);
    }
    @GetMapping("/findVacancyOnWaitByUserId/")
    public ResponseEntity<Page<Vacancy>> findVacancyOnWaitByUserId(Pageable pageable, Long  id) {
        return new ResponseEntity<>(vacancyService.findAllVacancyByUserId(pageable,id), HttpStatus.OK);
    }

    @GetMapping("/findByInterview/{id}")
    public ResponseEntity<Vacancy> findByInterview(@PathVariable Long id) {
        return ResponseEntity.ok(vacancyService.findVacancyByInterviewId(id));
    }
}
