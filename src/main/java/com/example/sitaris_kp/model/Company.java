package com.example.sitaris_kp.model;

import lombok.*;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


@Entity
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "company")
//класс сущности Company
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, name = "areaofwork")
    private String areaOfWork;

    @Lob
    @Column(columnDefinition = "BLOB", name = "IMAGE")
    private byte[] image;

    @Column(nullable = false)
    private String phoneNumber;

    @Column(nullable = false)
    private Short year;

    @Column(nullable = false, name = "count_of_employee")
    private Short countOfEmployee;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "company_employer",
            joinColumns = { @JoinColumn(name = "company_id") },
            inverseJoinColumns = { @JoinColumn(name = "employer_id") })
    private Set<User> userSet = new HashSet<>();

    @OneToMany(mappedBy = "companyVacancy")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Vacancy> vacancyList;

    @OneToMany(targetEntity = Recommendations.class, mappedBy = "companyUser", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private Set<Recommendations> recommendationsCompany;
}

