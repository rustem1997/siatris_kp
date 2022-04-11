package com.example.sitaris_kp.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.jackson.annotate.JsonIgnore;

import javax.persistence.*;
@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "summary")
public class Summary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String objective;

    @Column(nullable = false)
    private String education;

    @Column(nullable = false)
    private String workExperience;

    @Column(nullable = false)
    private String skills;

    @Column(nullable = false)
    private String descriptions;

    @Column(nullable = false)
    private String reasonForApplying;

    @Column(nullable = false)
    private String linkedin;

    @Column(nullable = false)
    private String github;
    @ManyToOne
    @JoinColumn(name = "user_ID")
    @JsonIgnore
    private User userSummary;
}
