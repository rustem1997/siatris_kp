package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.model.Vacancy;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VacancyRepository extends CrudRepository<Vacancy, Long> {
    @Query("FROM Vacancy v WHERE v.name LIKE %:searchText% OR v.conditions LIKE %:searchText% OR v.expectation LIKE %:searchText%")
    Page<Vacancy> findAll(Pageable pageable, @Param("searchText") String searchText);

    List<Vacancy> findAllByCompanyVacancy(Company company);



    Vacancy findByCompanyVacancy(Company company);



    Page<Vacancy> findVacancyByUsersId(Long userId, Pageable pageable);

    Page<Vacancy> findVacancyByUsersPassedId(Long userId, Pageable pageable);

    Page<Vacancy> findVacancyByUsersFailedId(Long userId, Pageable pageable);

    Vacancy findByInterviewVacancyId(Long idInterview);
}
