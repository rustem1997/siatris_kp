package com.example.sitaris_kp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.hibernate.annotations.LazyCollection;
import org.hibernate.annotations.LazyCollectionOption;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, name = "username")
    private String email;

    @Column(nullable = false)
    private String surname;

    @Column(nullable = false)
    private String password;

    @Column(name = "create_at")
    private LocalDate createAt;

    @ManyToOne
    @JoinColumn(name = "role")
    private Role role;

    @OneToOne(mappedBy = "userId")
    private UserInformation userInformation;

    @OneToMany(mappedBy = "userSummary")
    @LazyCollection(LazyCollectionOption.FALSE)
    private List<Summary> summaryList;

    @OneToMany(mappedBy = "userRecommendation")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Recommendations<R, Number>> recommendationsUser;

    @OneToMany(mappedBy = "employer")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Recommendations<R, Number>> employerRecommendation;

    @OneToMany(mappedBy = "userInterview")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Interview> userInterview;

    @OneToMany(mappedBy = "employerInterview")
    @LazyCollection(LazyCollectionOption.FALSE)
    private Set<Interview> employerInterview;

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "userSet")
    @JsonIgnore
    private Set<Company> companySet = new HashSet<>();


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "users")
    @JsonIgnore
    private Set<Vacancy> vacancies = new HashSet<>();


    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "usersPassed")
    @JsonIgnore
    private Set<Vacancy> vacanciesPassed = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,
            cascade = {
                    CascadeType.PERSIST,
                    CascadeType.MERGE
            },
            mappedBy = "usersFailed")
    @JsonIgnore
    private Set<Vacancy> vacanciesFailed = new HashSet<>();
}
