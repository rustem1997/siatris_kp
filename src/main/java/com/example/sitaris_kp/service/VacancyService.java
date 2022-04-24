package com.interview.service;

import com.example.sitaris_kp.dto.VacancyDto;
import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.model.Utils.VacancyStatus;
import com.example.sitaris_kp.model.Vacancy;
import com.example.sitaris_kp.repository.UserRepository;
import com.example.sitaris_kp.repository.VacancyRepository;
import com.example.sitaris_kp.service.CompanyService;
import com.example.sitaris_kp.service.UserService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class VacancyService {

    private final VacancyRepository vacancyRepository;

    private final CompanyService companyService;

    private final UserRepository userRepository;

    private final UserService userService;

    public List<Vacancy> getVacancyByCompanyId(Long id) {

        return vacancyRepository.findAllByCompanyVacancy(companyService.findByCompanyId(id));
    }

    public Vacancy saveVacancy(Vacancy vacancy, Long id) {
        Company company = companyService.findByCompanyId(id);

        vacancy.setVacancyStatus(VacancyStatus.ACTIVE);
        vacancy.setCompanyVacancy(company);
        return vacancyRepository.save(vacancy);
    }

    public ResponseEntity<Vacancy> findVacancyByCompanyId(Long id) {
        Vacancy vacancy = vacancyRepository.findByCompanyVacancy(companyService.findByCompanyId(id));
        return ResponseEntity.ok(vacancy);
    }

    public ResponseEntity<Vacancy> findVacancyByVacancyId(Long id) {
        Vacancy vacancy = vacancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy not exist with id:" + id));
        return ResponseEntity.ok(vacancy);
    }
    public ResponseEntity<VacancyDto> findVacancyByVacancyIdAndUseId(Long id, Long userId) {
        Vacancy vacancy = vacancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy not exist with id:" + id));
        VacancyDto vacancyDto = new VacancyDto();
        vacancyDto.setDescription(vacancy.getDescription());
        vacancyDto.setConditions(vacancy.getConditions());
        vacancyDto.setExpectation(vacancy.getExpectation());
        vacancyDto.setName(vacancy.getName());
        vacancyDto.setId(vacancy.getId());
        vacancyDto.setExperience(vacancy.getExperience());
        User user  = userService.findByIdUser(userId);
        vacancyDto.setRoleName(user.getRole().getName());
        return ResponseEntity.ok(vacancyDto);
    }

    public Page<Vacancy> findAll(Pageable pageable) {
        return vacancyRepository.findAllByVacancyStatus(pageable, VacancyStatus.ACTIVE);
    }
    public Page<Vacancy> findAll(Pageable pageable, Long id) {
        return vacancyRepository.findAllByCompanyVacancyAndVacancyStatus(pageable, companyService.findByCompanyId(id), VacancyStatus.ACTIVE);
    }

    public Page<Vacancy> findAllArchive(Pageable pageable, Long id) {
        return vacancyRepository.findAllByCompanyVacancyAndVacancyStatus(pageable, companyService.findByCompanyId(id), VacancyStatus.ARCHIVE);
    }

    public Page<Vacancy> findAll(Pageable pageable, String searchText) {
        return vacancyRepository.findAll(pageable, searchText);
    }

    public Vacancy findByIdVacancy(Long id) {
        return vacancyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Vacancy not exist with id:" + id));
    }

    public Vacancy updateVacancy(Vacancy vacancy) {
        Vacancy vacancy1 = findByIdVacancy(vacancy.getId());
        vacancy.setVacancyStatus(vacancy1.getVacancyStatus());
        vacancy.setCompanyVacancy(vacancy1.getCompanyVacancy());
        return vacancyRepository.save(vacancy);
    }

    public Vacancy changeStatus(Long id) {
        Vacancy vacancy = findByIdVacancy(id);

        if (vacancy == null) {
            return null;
        }
        if(vacancy.getVacancyStatus() == VacancyStatus.ACTIVE){
            vacancy.setVacancyStatus(VacancyStatus.ARCHIVE);
        }else vacancy.setVacancyStatus(VacancyStatus.ACTIVE);

        return vacancyRepository.save(vacancy);
    }

    public Vacancy saveVacancyUserOnWait( Long idUser, Long idVacancy) {
        Vacancy vacancy = findByIdVacancy(idVacancy);
        User user = userService.findByIdUser(idUser);
        if (vacancy == null || user == null) {
            return null;
        }

        Set<User> users = vacancy.getUsers();
        users.add(user);
        vacancy.setUsers(users);
        return vacancyRepository.save(vacancy);
    }
    public Vacancy saveVacancyUserOnPassed( Long idUser, Long idVacancy) {
        Vacancy vacancy = findByIdVacancy(idVacancy);
        User user = userService.findByIdUser(idUser);
        if (vacancy == null || user == null) {
            return null;
        }
        takeUserFromVacancyUserOnWait( user.getId(), vacancy.getId());

        Set<User> users = vacancy.getUsersPassed();
        users.add(user);
        vacancy.setUsersPassed(users);
        return vacancyRepository.save(vacancy);
    }
    public Vacancy saveVacancyUserOnFailed( Long idUser, Long idVacancy) {
        User user = userService.findByIdUser(idUser);
        Vacancy vacancy = findByIdVacancy(idVacancy);
        if (vacancy == null || user == null) {
            return null;
        }
        takeUserFromVacancyUserOnWait( user.getId(), vacancy.getId());
        Set<User> users = vacancy.getUsersFailed();
        users.add(user);
        vacancy.setUsersFailed(users);
        return vacancyRepository.save(vacancy);
    }
    public void takeUserFromVacancyUserOnWait(Long idUser, Long idVacancy) {
        User user = userService.findByIdUser(idUser);
        Vacancy vacancy = findByIdVacancy(idVacancy);

        if (vacancy == null || user == null) {
            return;
        }

        Set<User> users = vacancy.getUsers();
        users.removeIf(e -> e.getId().equals(user.getId()));
        vacancy.setUsers(users);
        vacancyRepository.save(vacancy);
    }

    public Page<User> findAllUsersByVacancyId(Pageable pageable, Long id){
        return userRepository.findUserByVacanciesId(id, pageable);
    }
    public Page<User> findAllUsersFailedByVacancyId(Pageable pageable, Long id){
        return userRepository.findUserByVacanciesFailedId(id, pageable);
    }
    public Page<User> findAllUsersPassedByVacancyId(Pageable pageable, Long id){
        return userRepository.findUserByVacanciesPassedId(id, pageable);
    }

    public Page<Vacancy> findAllVacancyByUserId(Pageable pageable, Long id){
        return vacancyRepository.findVacancyByUsersId(id, pageable);
    }
    public Page<Vacancy> findAllVacancyFailedByUserId(Pageable pageable, Long id){
        return vacancyRepository.findVacancyByUsersFailedId(id, pageable);
    }
    public Page<Vacancy> findAllVacancyPassedByUserId(Pageable pageable, Long id){
        return vacancyRepository.findVacancyByUsersPassedId(id, pageable);
    }

    public Vacancy findVacancyByInterviewId(Long id){
        return vacancyRepository.findByInterviewVacancyId(id);
    }
}
