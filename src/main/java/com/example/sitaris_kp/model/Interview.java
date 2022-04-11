package com.example.sitaris_kp.model;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "interview")
public class Interview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "type")
    private String type;

    @Column(name = "status_resolve")
    private String resolve;

    @Column(nullable = false)
    private String descriptions;

    @Column(name = "date")
    private LocalDate createAt;

    @ManyToOne
    @JoinColumn(name = "user_ID")
    @JsonIgnore
    private User userInterview;

    @ManyToOne
    @JoinColumn(name = "vacancy_ID")
    @JsonIgnore
    private Vacancy vacancyInterview;

    @ManyToOne
    @JoinColumn(name = "employer_id")
    @JsonIgnore
    private User employerInterview;
}
