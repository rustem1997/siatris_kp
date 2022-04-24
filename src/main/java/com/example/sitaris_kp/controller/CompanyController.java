package com.example.sitaris_kp.controller;

import com.example.sitaris_kp.model.Company;
import com.example.sitaris_kp.model.User;
import com.example.sitaris_kp.service.CompanyService;
import com.sun.istack.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = "http://localhost:3000" )
@RestController
@RequestMapping("/company")
@RequiredArgsConstructor
public class CompanyController {
    private final CompanyService companyService;


    @PostMapping("/{id}/image")
    public void uploadCarImage(@NotNull @RequestParam("file") MultipartFile multipartFile, @PathVariable Long id) throws IOException {
        companyService.saveCompanyImage(multipartFile, id);
    }

    @GetMapping("/getAllCompany")
    public ResponseEntity<Page<Company>> getAll(int pageNumber, int pageSize) {
        return new ResponseEntity<>(companyService.findAll(
                PageRequest.of(
                        pageNumber, pageSize)
        ), HttpStatus.OK);
    }

    @GetMapping("/search/{searchText}")
    public ResponseEntity<Page<Company>> findAll(Pageable pageable, @PathVariable String searchText) {
        return new ResponseEntity<>(companyService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @PostMapping("/addCompany")
    public Company createCompany(@RequestBody Company company) {
        return companyService.save(company);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        return companyService.findById(id);
    }

    @GetMapping("/vacancy/{id}")
    public ResponseEntity<Company> getCompanyByVacancyId(@PathVariable Long id) {
        return companyService.findByVacancyId(id);
    }

    @PutMapping("/updateCompany")
    public ResponseEntity<Company> updateCompany(@RequestBody Company company) {
        return ResponseEntity.ok(companyService.updateCompany(company));
    }

    @PostMapping("/addEmployerToCompany/{idCompany}")
    public ResponseEntity<Company> addEmployerToCompany(@RequestBody User user, @PathVariable Long idCompany ){
        return ResponseEntity.ok(companyService.addEmployer(user, idCompany));
    }
    @PutMapping("/dismissEmployerToCompany/")
    public void dismissEmployerToCompany(Long idUser, Long idCompany ){
        companyService.dismissEmployer(idUser, idCompany);
    }

    @GetMapping("/findAllEmployersByCompanyId/")
    public ResponseEntity<Page<User>> findAllEmployersByCompanyId(Pageable pageable, Long id) {
        return new ResponseEntity<>(companyService.findAllEmployerByCompany(pageable,id), HttpStatus.OK);
    }
    @GetMapping("/findCompanyByEmployerId/{id}")
    public ResponseEntity<Company> findCompanyByEmployerId(@PathVariable Long id) {
        return new ResponseEntity<>(companyService.findCompanyByEmployerId(id), HttpStatus.OK);
    }
    @GetMapping("/findByInterview/{id}")
    public ResponseEntity<Company> findByInterview(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.findCompanyByInterviewId(id));
    }
}
