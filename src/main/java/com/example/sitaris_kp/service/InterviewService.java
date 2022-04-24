package com.example.sitaris_kp.service;

import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.Interview;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.model.Utils.StatusOnResolve;
import com.example.sitaris_kp.model.Vacancy;
import com.example.sitaris_kp.repository.InterviewRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class InterviewService {
    private final InterviewRepository interviewRepository;
    private final UserService userService;
    private final com.interview.service.VacancyService vacancyService;

    public Page<Interview> findAllInterviewByUserId(Pageable pageable, Long id){
        return interviewRepository.findInterviewsByUserInterviewId(pageable, id);
    }

    public Page<Interview> findAllInterviewByVacancyId(Pageable pageable, Long id){
        return interviewRepository.findInterviewsByVacancyInterviewId(pageable, id);
    }
    public Page<Interview> findAllInterviewByVacancyIdAccept(Pageable pageable, Long id){
        return interviewRepository.findInterviewsByVacancyInterviewIdAndResolve(pageable, id, StatusOnResolve.ACCEPT.getName());
    }
    public Page<Interview> findAllInterviewByVacancyIdRefuse(Pageable pageable, Long id){
        return interviewRepository.findInterviewsByVacancyInterviewIdAndResolve(pageable, id, StatusOnResolve.REFUSE.getName());
    }
    public Page<Interview> findAllInterviewByVacancyIdOnWaiting(Pageable pageable, Long id){
        return interviewRepository.findInterviewsByVacancyInterviewIdAndResolve(pageable, id, StatusOnResolve.ON_WAITING.getName());
    }

    public ResponseEntity<Interview> findById(Long id) {
        Interview interview = interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not exist with id:" + id));
        return ResponseEntity.ok(interview);
    }
    public Interview findByInterviewId(Long id) {
        return interviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not exist with id:" + id));
    }

    public Interview saveInterview( Long idUser, Long idVacancy, Long idEmployer, Interview interview) {
        User user = userService.findByIdUser(idUser);
        Vacancy vacancy = vacancyService.findByIdVacancy(idVacancy);
        User employer = userService.findByIdUser(idEmployer);

        interview.setEmployerInterview(employer);
        interview.setUserInterview(user);
        interview.setVacancyInterview(vacancy);
        interview.setCreateAt(LocalDate.now());
        interview.setResolve(StatusOnResolve.ON_WAITING.getName());
        return interviewRepository.save(interview);
    }
    public Interview acceptInterview(Long idInterview) {
        Interview interview = findByInterviewId(idInterview);
        interview.setResolve(StatusOnResolve.ACCEPT.getName());
        return interviewRepository.save(interview);
    }
    public Interview refuseInterview(Long idInterview) {
        Interview interview = findByInterviewId(idInterview);
        interview.setResolve(StatusOnResolve.REFUSE.getName());
        return interviewRepository.save(interview);
    }
}
