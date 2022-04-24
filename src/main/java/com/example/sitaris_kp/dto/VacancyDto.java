package com.example.sitaris_kp.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VacancyDto {
    private Long id;
    private String name;
    private String expectation;// ожидание
    private String conditions;//условия
    private Float experience;//опыт
    private String description; //описание
    private String roleName;
}
