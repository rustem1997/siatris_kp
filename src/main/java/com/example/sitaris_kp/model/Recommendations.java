package com.example.sitaris_kp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "recommendations")
public class Recommendations {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(nullable = false)
    private String descriptions;
    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User userRecommendation;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "company_id")
    private Company companyUser;
    @ManyToOne
    @JsonIgnore
    @JoinColumn(name = "employer_id")
    private User employer;
}
