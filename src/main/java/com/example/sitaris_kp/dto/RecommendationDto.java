package com.example.sitaris_kp.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecommendationDto {
    private Long id;
    private String description;
    private Long idUser;
}
