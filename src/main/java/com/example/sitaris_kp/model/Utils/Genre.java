package com.example.sitaris_kp.model.Utils;

import lombok.Getter;

@Getter
public enum Genre {
    MALE("Мужчина"),
    FEMALE("Женщина");
    private final String name;

    Genre(String name) {
        this.name = name;
    }
}

