package com.example.sitaris_kp.repository;

import com.example.sitaris_kp.model.Role;
import com.example.sitaris_kp.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByRole(Role role);

    @Query("FROM User u WHERE u.name LIKE %:searchText% OR u.surname LIKE %:searchText% OR u.email LIKE %:searchText%")
    Page<User> findAllUserPageable(Pageable pageable, @Param("searchText") String searchText);

    @Query("FROM User WHERE email=:email")
    User findByEmail(@Param("email") String email);

    Page<User> findUsersByCompanySetId(Long companyId, Pageable pageable);

    Page<User> findUserByVacanciesId(Long vacancyId, Pageable pageable);

    Page<User> findUserByVacanciesFailedId(Long vacancyId, Pageable pageable);

    Page<User> findUserByVacanciesPassedId(Long vacancyId, Pageable pageable);
}
