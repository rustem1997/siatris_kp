package com.example.sitaris_kp.model;


import com.example.sitaris_kp.model.Utils.VacancyStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "vacancy")
public class Vacancy {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String name;
    @Column(nullable = false, name = "EXPECTATION_FROM_THE_EMPLOYER")
    private String expectation;
    @Column(nullable = false, name = "WORKING_CONDITIONS")
    private String conditions;
    @Column(nullable = false)
    private Float experience;
    @Column(nullable = false)
    private String description;
    @Enumerated(EnumType.STRING)
    @Column(name = "vacancy_status")
    private VacancyStatus vacancyStatus;


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "vacancy_user_on_waite",
            joinColumns = {@JoinColumn(name = "vacancy_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private Set<User> users = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "vacancy_user_passed",
            joinColumns = {@JoinColumn(name = "vacancy_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private Set<User> usersPassed = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            })
    @JoinTable(name = "vacancy_user_failed",
            joinColumns = {@JoinColumn(name = "vacancy_id")},
            inverseJoinColumns = {@JoinColumn(name = "user_id")})
    private Set<User> usersFailed = new HashSet<>();

    @OneToMany(mappedBy = "vacancyInterview")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Interview> interviewVacancy;

    @ManyToOne
    @JoinColumn(name = "COMPANY_ID")
    @JsonIgnore
    private Company companyVacancy;
}
