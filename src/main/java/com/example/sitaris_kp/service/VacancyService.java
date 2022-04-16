package com.example.sitaris_kp.service;

import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.model.Vacancy;
import com.example.sitaris_kp.repository.UserRepository;
import com.example.sitaris_kp.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Setter
@RequiredArgsConstructor
public class VacancyService {
    private final CompanyService companyService;
    private final UserService userService;
    private final UserRepository userRepository;
    private final VacancyRepository vacancyRepository;

    public List<Vacancy> getVacancyByCompanyId(Long id) {

        return vacancyRepository.findAllByCompanyVacancy(companyService.findByCompanyId(id));
    }



    public Company findByCompanyId(Long id) {

        return companyRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Company not exist with id:" + id));
                }
public void saveCompanyImage(MultipartFile file, Long id) throws IOException { //Загрузка файлов
        Company company = findByCompanyId(id);
        company.setImage(file.getBytes());
        companyRepository.save(company);
        }
        }
