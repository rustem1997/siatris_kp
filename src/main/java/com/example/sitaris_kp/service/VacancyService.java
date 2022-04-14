package com.example.sitaris_kp.service;

import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.repository.CompanyRepository;
import com.example.sitaris_kp.repository.RoleRepository;
import com.example.sitaris_kp.repository.UserRepository;
import com.example.sitaris_kp.repository.VacancyRepository;

import java.io.IOException;

public class VacancyService {
    private final RoleRepository roleRepository;
    private final CompanyRepository companyRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final VacancyRepository vacancyRepository;
    public Company findByCompanyId(Long id) {

        return companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company not exist with id:" + id));
    }
    public void saveCompanyImage(MultipartFile file, Long id) throws IOException { //Загрузка файлов
        Company company = findByCompanyId(id);
        company.setImage(file.getBytes());
        companyRepository.save(company);
    }
}
