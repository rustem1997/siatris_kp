package com.example.sitaris_kp.model.Utils;

import lombok.Getter;

@Getter
public enum TypeOfInterview {
    TEST("Тест"),
    CALL("Созвон"),
    IN_OFFICE("В офисе");

    private final String name;

    TypeOfInterview(String name) {
        this.name = name;
    }

}
