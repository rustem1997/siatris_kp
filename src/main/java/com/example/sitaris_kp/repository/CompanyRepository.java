package com.example.sitaris_kp.repository;


import com.example.sitaris_kp.model.Company;
import lombok.Setter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface CompanyRepository extends CrudRepository<Company, Long> { // запрос Company по Id

    Page<Company> findAll(Pageable pageable);

    @Query("FROM Company c WHERE c.name LIKE %:searchText% OR c.areaOfWork LIKE %:searchText%")
    Page<Company> findAllCompany(Pageable pageable, @Param("searchText") String searchText);

    Set<Company> findAll(); //запросить все объекты в базе данных

    Set<Company> findCompanyByUserSetId(Long Id);

    Company findByVacancyListId(Long id);

}
