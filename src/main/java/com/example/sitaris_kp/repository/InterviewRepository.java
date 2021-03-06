package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Interview;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

//репозиторий. Это несколько интерфейсов которые используют JPA Entity для взаимодействия с ней. Так например интерфейс

//Наследоваться от одного из интерфейсов Spring Data, от CrudRepository
public interface InterviewRepository extends CrudRepository<Interview, Long> { // запрос Interview по Id
    Page<Interview> findInterviewsByUserInterviewId(Pageable Pageable, Long idUser);
    Page<Interview> findInterviewsByVacancyInterviewId(Pageable pageable, Long idvacancy);
    Page<Interview> findInterviewsByVacancyInterviewIdAndResolve(Pageable pageable, Long idvacancy, String statusOnResolve);
}
