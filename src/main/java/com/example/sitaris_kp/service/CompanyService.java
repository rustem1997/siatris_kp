package com.example.sitaris_kp.service;

import com.example.sitaris_kp.exception.ResourceNotFoundException;
import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.model.Utils.RoleUtils;
import com.example.sitaris_kp.model.Vacancy;
import com.example.sitaris_kp.repository.CompanyRepository;
import com.example.sitaris_kp.repository.RoleRepository;
import com.example.sitaris_kp.repository.UserRepository;
import com.example.sitaris_kp.repository.VacancyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Set;
@Service
@RequiredArgsConstructor
public class CompanyService {
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

    public Company save(Company company) {  // сахранение компаны
        return companyRepository.save(company);
    }

    public ResponseEntity<Company> findById(Long id) { //специальный класс, который представляет http-ответспециальный класс, который представляет http-ответ
        Company company = companyRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Company not exist with id:" + id));
        return ResponseEntity.ok(company);
    }
    public ResponseEntity<Company> findByVacancyId(Long id) {
        Company company = companyRepository.findByVacancyListId(id);

        return ResponseEntity.ok(company);
    }
    public Company addEmployer(User user, Long idCompany) { //добавить работодателя
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        user.setRole(roleRepository.findByName(RoleUtils.ROLE_EMPLOYER.toString()));
        user.setCreateAt(LocalDate.now()); //LocalDate now() : возвращает объект, который представляет текущую дату
        User savedUser = userRepository.saveAndFlush(user);
        Company company1 = findByCompanyId(idCompany);
        Set<User> userList = company1.getUserSet();
        userList.add(savedUser);
        company1.setUserSet(userList);
        return companyRepository.save(company1);
    }
    public void dismissEmployer(Long idEmployer,Long idCompany) {
        Company company1 = findByCompanyId(idCompany);
        User user = userService.findByIdUser(idEmployer);
        Set<User> userList = company1.getUserSet();
        userList.removeIf(s->s.getId().equals(user.getId()));
        company1.setUserSet(userList);
        companyRepository.save(company1);
    }

    public Page<Company> findAll(Pageable pageable) {
        return companyRepository.findAll(pageable);
    }

    public Page<Company> findAll(Pageable pageable, String searchText) {
        return companyRepository.findAllCompany(pageable, searchText);
    }

    public Company updateCompany(Company company) {
        Company company1 = findByCompanyId(company.getId());
        company.setImage(company1.getImage());
        return companyRepository.save(company);
    }

    public Page<User> findAllEmployerByCompany(Pageable pageable, Long id){
        return userRepository.findUsersByCompanySetId(id, pageable);
    }
    public Company findCompanyByEmployerId(Long id){
        Set<Company> companies = companyRepository.findCompanyByUserSetId(id);
        Company company = new Company();
        for(Company company1 :companies){
            company = company1;
            break;
        }
        return company;
    }

    public Company findCompanyByInterviewId(Long id){
        Vacancy vacancy= vacancyRepository.findByInterviewVacancyId(id);
        return vacancy.getCompanyVacancy();
    }
}
